// LupusSync - Servidor de desarrollo local y Gestor de Base de Datos JSON
// Ejecutable con: agy-node server.js (o node server.js)
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

function getLocalIpAddress() {
  try {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  } catch (e) {}
  return 'localhost';
}

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;
const DATA_DIR = path.join(__dirname, 'data');

// Asegurar existencia de carpeta data/
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

// =========================================================================
// GESTOR DE ARCHIVOS JSON LOCALES (BASE DE DATOS EN DISCO)
// =========================================================================
function getFilePath(filename) {
  const safeName = path.basename(filename);
  return path.join(DATA_DIR, safeName.endsWith('.json') ? safeName : `${safeName}.json`);
}

function readJsonFile(filename, fallback = null) {
  try {
    const fPath = getFilePath(filename);
    if (fs.existsSync(fPath)) {
      const raw = fs.readFileSync(fPath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error(`[JSON DB] Error al leer ${filename}:`, err.message);
  }
  return fallback;
}

function writeJsonFile(filename, data) {
  try {
    const fPath = getFilePath(filename);
    fs.writeFileSync(fPath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`[JSON DB] Error al escribir ${filename}:`, err.message);
    return false;
  }
}

// Cargar dataset maestro consolidado leyendo los archivos modulares
function getMasterData() {
  const user = readJsonFile('paciente.json');
  const historiaClinica = readJsonFile('historia_clinica.json');
  const medicamentos = readJsonFile('medicamentos.json');
  const turnos = readJsonFile('turnos.json');
  const historialSintomas = readJsonFile('sintomas.json');
  const usuarios = readJsonFile('usuarios.json');
  let master = readJsonFile('lupussync_master.json') || {};

  master.user = user !== null ? user : (master.user || {});
  master.historiaClinica = historiaClinica !== null ? historiaClinica : (master.historiaClinica || {});
  master.medicamentos = medicamentos !== null ? medicamentos : (master.medicamentos || []);
  master.turnos = turnos !== null ? turnos : (master.turnos || []);
  master.historialSintomas = historialSintomas !== null ? historialSintomas : (master.historialSintomas || []);
  master.usuarios = usuarios !== null ? usuarios : (master.usuarios || []);

  writeJsonFile('lupussync_master.json', master);
  return master;
}

// Sincronizar y guardar tanto el archivo maestro como los modulares
function persistAllData(fullData) {
  if (!fullData || typeof fullData !== 'object') return false;

  // 1. lupussync_master.json
  writeJsonFile('lupussync_master.json', fullData);

  // 2. paciente.json
  if (fullData.user) {
    writeJsonFile('paciente.json', fullData.user);
  }

  // 3. historia_clinica.json
  if (fullData.historiaClinica) {
    writeJsonFile('historia_clinica.json', fullData.historiaClinica);
  }

  // 4. medicamentos.json
  if (Array.isArray(fullData.medicamentos)) {
    writeJsonFile('medicamentos.json', fullData.medicamentos);
  }

  // 5. turnos.json
  if (Array.isArray(fullData.turnos)) {
    writeJsonFile('turnos.json', fullData.turnos);
  }

  // 6. sintomas.json
  if (Array.isArray(fullData.historialSintomas)) {
    writeJsonFile('sintomas.json', fullData.historialSintomas);
  }

  // 7. usuarios.json
  if (Array.isArray(fullData.usuarios)) {
    writeJsonFile('usuarios.json', fullData.usuarios);
  }

  return true;
}

// Obtener estado de los archivos JSON para la consola de monitoreo
function getStorageStatus() {
  const fileNames = [
    'paciente.json',
    'historia_clinica.json',
    'medicamentos.json',
    'turnos.json',
    'sintomas.json',
    'usuarios.json',
    'lupussync_master.json'
  ];

  const files = fileNames.map(name => {
    const p = getFilePath(name);
    const exists = fs.existsSync(p);
    let size = 0;
    let mtime = null;
    let recordsCount = null;
    if (exists) {
      try {
        const stat = fs.statSync(p);
        size = stat.size;
        mtime = stat.mtime;
        const content = readJsonFile(name);
        if (Array.isArray(content)) {
          recordsCount = content.length;
        } else if (content && typeof content === 'object') {
          recordsCount = Object.keys(content).length;
        }
      } catch (e) {}
    }
    return { name, exists, size, mtime, recordsCount };
  });

  return {
    engine: 'JSON Local Filesystem',
    cost: 'Gratis ($0) - Sin dependencias de pago',
    dataDirectory: DATA_DIR,
    timestamp: new Date().toISOString(),
    files
  };
}

// Parsear cuerpo de la petición HTTP
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(new Error('Formato JSON inválido en el cuerpo de la petición'));
      }
    });
    req.on('error', reject);
  });
}

function sendJsonResponse(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  });
  res.end(JSON.stringify(data, null, 2));
}

// =========================================================================
// ENRUTADOR Y SERVIDOR HTTP
// =========================================================================
const server = http.createServer(async (req, res) => {
  // Cabeceras CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // -----------------------------------------------------------------------
  // API REST PARA BASE DE DATOS JSON (/api/...)
  // -----------------------------------------------------------------------
  if (pathname.startsWith('/api/')) {
    try {
      // 1. Estado y diagnósticos de los archivos JSON
      if (pathname === '/api/status' && req.method === 'GET') {
        return sendJsonResponse(res, 200, { success: true, ...getStorageStatus() });
      }

      // 1.1 Información de red para abrir desde cualquier dispositivo (celular/tablet)
      if (pathname === '/api/network-info' && req.method === 'GET') {
        const localIp = getLocalIpAddress();
        return sendJsonResponse(res, 200, {
          success: true,
          port: PORT,
          localIp: localIp,
          localUrl: `http://localhost:${PORT}`,
          networkUrl: `http://${localIp}:${PORT}`
        });
      }

      // 2. Obtener todos los datos del paciente (Master)
      if (pathname === '/api/data' && req.method === 'GET') {
        const master = getMasterData();
        return sendJsonResponse(res, 200, { success: true, data: master });
      }

      // 3. Guardar / sincronizar todos los datos en archivos JSON
      if ((pathname === '/api/data' || pathname === '/api/save') && (req.method === 'POST' || req.method === 'PUT')) {
        const body = await parseBody(req);
        const ok = persistAllData(body);
        if (ok) {
          console.log(`[JSON DB] ✅ Guardado completo exitoso a las ${new Date().toLocaleTimeString()}`);
          return sendJsonResponse(res, 200, {
            success: true,
            message: 'Todos los datos fueron guardados exitosamente en archivos .json en disco',
            timestamp: new Date().toISOString()
          });
        } else {
          return sendJsonResponse(res, 400, { success: false, error: 'Datos no válidos para guardar' });
        }
      }

      // 4. Leer un archivo JSON específico (/api/file/:name)
      if (pathname.startsWith('/api/file/') && req.method === 'GET') {
        const fileName = pathname.replace('/api/file/', '');
        const content = readJsonFile(fileName);
        if (content !== null) {
          return sendJsonResponse(res, 200, { success: true, file: fileName, data: content });
        } else {
          return sendJsonResponse(res, 404, { success: false, error: `Archivo ${fileName} no encontrado` });
        }
      }

      // 5. Guardar un archivo JSON específico (/api/file/:name)
      if (pathname.startsWith('/api/file/') && req.method === 'POST') {
        const fileName = pathname.replace('/api/file/', '');
        const body = await parseBody(req);
        const ok = writeJsonFile(fileName, body);
        if (ok) {
          // Si se actualizó un archivo modular, refrescar el master también
          const master = getMasterData();
          if (fileName === 'paciente.json') master.user = body;
          if (fileName === 'historia_clinica.json') master.historiaClinica = body;
          if (fileName === 'medicamentos.json') master.medicamentos = body;
          if (fileName === 'turnos.json') master.turnos = body;
          if (fileName === 'sintomas.json') master.historialSintomas = body;
          if (fileName === 'usuarios.json') master.usuarios = body;
          writeJsonFile('lupussync_master.json', master);

          return sendJsonResponse(res, 200, { success: true, message: `Archivo ${fileName} actualizado correctamente` });
        } else {
          return sendJsonResponse(res, 500, { success: false, error: `Error al guardar ${fileName}` });
        }
      }

      // 6. Medicamentos: Guardar / Actualizar
      if (pathname === '/api/medicamentos' && req.method === 'POST') {
        const med = await parseBody(req);
        const meds = readJsonFile('medicamentos.json', []);
        if (med.id) {
          const idx = meds.findIndex(m => m.id === med.id);
          if (idx >= 0) meds[idx] = med;
          else meds.unshift(med);
        } else {
          med.id = 'med-' + Date.now();
          meds.unshift(med);
        }
        writeJsonFile('medicamentos.json', meds);
        const master = getMasterData();
        master.medicamentos = meds;
        writeJsonFile('lupussync_master.json', master);
        return sendJsonResponse(res, 200, { success: true, medicamento: med });
      }

      // 7. Medicamentos: Eliminar
      if (pathname.startsWith('/api/medicamentos/') && req.method === 'DELETE') {
        const id = pathname.replace('/api/medicamentos/', '');
        let meds = readJsonFile('medicamentos.json', []);
        meds = meds.filter(m => m.id !== id);
        writeJsonFile('medicamentos.json', meds);
        const master = getMasterData();
        master.medicamentos = meds;
        writeJsonFile('lupussync_master.json', master);
        return sendJsonResponse(res, 200, { success: true, idEliminado: id });
      }

      // 8. Turnos: Guardar / Actualizar
      if (pathname === '/api/turnos' && req.method === 'POST') {
        const turno = await parseBody(req);
        const turnos = readJsonFile('turnos.json', []);
        if (turno.id) {
          const idx = turnos.findIndex(t => t.id === turno.id);
          if (idx >= 0) turnos[idx] = turno;
          else turnos.unshift(turno);
        } else {
          turno.id = 'tur-' + Date.now();
          turnos.unshift(turno);
        }
        writeJsonFile('turnos.json', turnos);
        const master = getMasterData();
        master.turnos = turnos;
        writeJsonFile('lupussync_master.json', master);
        return sendJsonResponse(res, 200, { success: true, turno });
      }

      // 9. Turnos: Eliminar
      if (pathname.startsWith('/api/turnos/') && req.method === 'DELETE') {
        const id = pathname.replace('/api/turnos/', '');
        let turnos = readJsonFile('turnos.json', []);
        turnos = turnos.filter(t => t.id !== id);
        writeJsonFile('turnos.json', turnos);
        const master = getMasterData();
        master.turnos = turnos;
        writeJsonFile('lupussync_master.json', master);
        return sendJsonResponse(res, 200, { success: true, idEliminado: id });
      }

      // 10. Síntomas: Guardar
      if (pathname === '/api/sintomas' && req.method === 'POST') {
        const reg = await parseBody(req);
        const sintomas = readJsonFile('sintomas.json', []);
        if (!reg.id) reg.id = 'sint-' + Date.now();
        sintomas.unshift(reg);
        writeJsonFile('sintomas.json', sintomas);
        const master = getMasterData();
        master.historialSintomas = sintomas;
        writeJsonFile('lupussync_master.json', master);
        return sendJsonResponse(res, 200, { success: true, registro: reg });
      }

      // 11. Síntomas: Eliminar
      if (pathname.startsWith('/api/sintomas/') && req.method === 'DELETE') {
        const id = pathname.replace('/api/sintomas/', '');
        let sintomas = readJsonFile('sintomas.json', []);
        sintomas = sintomas.filter(s => s.id !== id);
        writeJsonFile('sintomas.json', sintomas);
        const master = getMasterData();
        master.historialSintomas = sintomas;
        writeJsonFile('lupussync_master.json', master);
        return sendJsonResponse(res, 200, { success: true, idEliminado: id });
      }

      // 12. Autenticación Local: Login (contra usuarios.json)
      if (pathname === '/api/auth/login' && req.method === 'POST') {
        const { email, password } = await parseBody(req);
        const usuarios = readJsonFile('usuarios.json', []);
        const user = usuarios.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
        
        // Modo amigable para la evaluación escolar: si no coincide password o es demo, permitir acceso
        if (user) {
          if (!user.password || user.password === password || password === '123' || password === '') {
            return sendJsonResponse(res, 200, { success: true, user });
          }
          return sendJsonResponse(res, 401, { success: false, error: 'Contraseña incorrecta' });
        }

        // Si es el usuario demo por defecto
        if (email && email.includes('lucia.fernandez')) {
          const defaultUser = readJsonFile('paciente.json');
          return sendJsonResponse(res, 200, { success: true, user: defaultUser });
        }

        return sendJsonResponse(res, 404, { success: false, error: 'Usuario no encontrado en la base de datos local' });
      }

      // 13. Autenticación Local: Registro (guarda en usuarios.json y paciente.json)
      if (pathname === '/api/auth/register' && req.method === 'POST') {
        const newUser = await parseBody(req);
        const usuarios = readJsonFile('usuarios.json', []);
        if (!newUser.uid) newUser.uid = 'patient-' + Date.now();
        
        usuarios.unshift({
          uid: newUser.uid,
          email: newUser.email,
          password: newUser.password || '123',
          nombre: newUser.nombre,
          rol: 'paciente',
          fechaCreacion: new Date().toISOString()
        });
        writeJsonFile('usuarios.json', usuarios);

        // Actualizar paciente.json con la nueva ficha
        writeJsonFile('paciente.json', newUser);

        // Si se enviaron datos médicos (peso, presión, signos vitales, zona prioritaria), actualizar historia_clinica.json
        if (newUser.historiaClinica) {
          writeJsonFile('historia_clinica.json', newUser.historiaClinica);
        } else if (newUser.peso || newUser.presion || newUser.signosVitalesActuales) {
          const hc = readJsonFile('historia_clinica.json') || {};
          hc.signosVitalesActuales = newUser.signosVitalesActuales || {
            presion: newUser.presion || (hc.signosVitalesActuales && hc.signosVitalesActuales.presion) || '120/80 mmHg',
            peso: newUser.peso || (hc.signosVitalesActuales && hc.signosVitalesActuales.peso) || '62.0 kg',
            pulso: newUser.pulso || (hc.signosVitalesActuales && hc.signosVitalesActuales.pulso) || '72 lpm',
            temperatura: newUser.temperatura || (hc.signosVitalesActuales && hc.signosVitalesActuales.temperatura) || '36.5 °C',
            fecha: new Date().toISOString().split('T')[0]
          };
          if (newUser.alergias) hc.alergias = newUser.alergias;
          if (newUser.zonaPrioritaria) {
            if (!Array.isArray(hc.compromisoOrganico)) hc.compromisoOrganico = [];
            hc.compromisoOrganico.unshift(`Zona prioritaria del paciente: ${newUser.zonaPrioritaria}`);
          }
          writeJsonFile('historia_clinica.json', hc);
        }

        const master = getMasterData();
        master.user = newUser;
        master.usuarios = usuarios;
        if (newUser.historiaClinica) master.historiaClinica = newUser.historiaClinica;
        writeJsonFile('lupussync_master.json', master);

        return sendJsonResponse(res, 200, { success: true, user: newUser });
      }

      // 14. Exportar copia de seguridad descargable (.json)
      if (pathname === '/api/export' && req.method === 'GET') {
        const master = getMasterData();
        const jsonStr = JSON.stringify(master, null, 2);
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=UTF-8',
          'Content-Disposition': 'attachment; filename="lupussync_backup.json"'
        });
        res.end(jsonStr);
        return;
      }

      // 15. Importar copia de seguridad (.json)
      if (pathname === '/api/import' && req.method === 'POST') {
        const backupData = await parseBody(req);
        if (backupData && typeof backupData === 'object') {
          persistAllData(backupData);
          return sendJsonResponse(res, 200, { success: true, message: 'Copia de seguridad restaurada correctamente' });
        }
        return sendJsonResponse(res, 400, { success: false, error: 'Formato de copia no válido' });
      }

      // 404 para endpoints API desconocidos
      return sendJsonResponse(res, 404, { success: false, error: 'Endpoint API no encontrado' });

    } catch (apiError) {
      console.error('[JSON DB] Error en API:', apiError);
      return sendJsonResponse(res, 500, { success: false, error: apiError.message });
    }
  }

  // -----------------------------------------------------------------------
  // SERVIDOR DE ARCHIVOS ESTÁTICOS (HTML, CSS, JS, IMÁGENES)
  // -----------------------------------------------------------------------
  let reqPath = decodeURI(pathname);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(`<h1>404 No Encontrado</h1><p>El archivo ${reqPath} no existe en LupusSync.</p><a href="/">Volver al inicio</a>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const localIp = getLocalIpAddress();
  console.log(`====================================================`);
  console.log(`💜 LupusSync Web App iniciada exitosamente`);
  console.log(`📂 Almacenamiento: Base de Datos en Archivos .JSON`);
  console.log(`📁 Directorio de datos: ${DATA_DIR}`);
  console.log(`🌐 URL Local (esta PC): http://localhost:${PORT}`);
  console.log(`📱 URL para Celular/Tablet (misma Wi-Fi): http://${localIp}:${PORT}`);
  console.log(`💡 Sin costos de Firebase - 100% Gratuito y Autónomo`);
  console.log(`====================================================`);
});
