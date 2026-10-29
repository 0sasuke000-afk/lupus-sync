# 🌐 Guía para Subir LupusSync a Internet y Abrir desde Cualquier Dispositivo

Esta guía te explica paso a paso cómo subir **LupusSync** a internet de manera 100% gratuita y cómo abrirlo desde cualquier teléfono celular, tablet o computadora.

---

## 📱 Opción 1: Abrir en tu Celular AHORA MISMO (En tu red Wi-Fi)
*Sin subir nada a internet, ideal para probar en casa, escuela u hospital.*

1. Abre el archivo `iniciar.bat` (o escribe `node server.js` en la consola).
2. Verás en pantalla un mensaje como este:
   ```text
   🌐 URL Local (esta PC): http://localhost:3000
   📱 URL para Celular/Tablet (misma Wi-Fi): http://192.168.1.XX:3000
   ```
3. Toma tu teléfono celular o tablet conectado a la misma red Wi-Fi de tu casa o escuela.
4. Abre **Google Chrome** o **Safari** en el celular y escribe exactamente esa dirección:
   `http://192.168.1.XX:3000` *(reemplaza con la IP que muestra tu consola)*.
5. ¡Listo! La aplicación se abre en tu teléfono con diseño adaptativo responsive.

---

## ☁️ Opción 2: Subir a Internet con Netlify Drop (La más fácil: 30 segundos sin instalar nada)
*Te da un enlace público real HTTPS para abrir desde cualquier dispositivo del mundo.*

1. Entra desde tu computadora a: **[app.netlify.com/drop](https://app.netlify.com/drop)**
2. Si no tienes cuenta, regístrate gratis con tu correo o cuenta de Google.
3. Verás un círculo punteado grande que dice *"Drag and drop your site folder here"*.
4. **Arrastra la carpeta `lupusSync`** directamente dentro de ese círculo.
5. Netlify subirá los archivos en 10 segundos y te dará una URL pública oficial como:
   `https://lupussync-hospitalposadas.netlify.app`
6. ¡Listo! Comparte ese enlace por WhatsApp o ábrelo desde cualquier celular, tablet o computadora del mundo.

---

## 🚀 Opción 3: Subir con Vercel
*Ideal para proyectos con Node.js y control de versiones.*

LupusSync ya incluye el archivo `vercel.json` preconfigurado en la raíz del proyecto.

### Pasos:
1. Instala Vercel CLI (opcional):
   ```bash
   npm install -g vercel
   vercel
   ```
2. O entra en **[vercel.com](https://vercel.com)**:
   - Regístrate gratis.
   - Crea un nuevo proyecto y selecciona tu repositorio o sube la carpeta.
   - Presiona **Deploy**.
3. Vercel te otorgará un dominio gratuito con certificado SSL permanente (ejemplo: `https://lupussync.vercel.app`).

---

## 🐙 Opción 4: GitHub Pages
*100% gratuito alojado en tu cuenta de GitHub.*

1. Crea un repositorio en tu cuenta de GitHub (ej. `lupussync`).
2. Sube todos los archivos del proyecto a la rama `main`.
3. Ve a **Settings (Configuración) -> Pages**.
4. En **Build and deployment -> Source**, selecciona **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/ (root)`.
6. Haz clic en **Save**. En 1 minuto tendrás tu enlace activo:
   `https://tu-usuario.github.io/lupussync/`

---

## 🛠️ Novedades y Funciones Incorporadas en LupusSync

1. **Corrección ortográfica y tipográfica completa**: Se verificaron todos los textos, tildes, signos de puntuación y reemplazo de símbolos (`&` por `y`/`e`, temperaturas limpias, caracteres UTF-8).
2. **Cruce de fármacos y farmacovigilancia**: Sistema bidireccional en tiempo real que previene interacciones peligrosas (Azatioprina + Alopurinol, Sulfamidas en LES, AINEs en Nefritis, ISRS + Corticoides, prolongación de QT con Hidroxicloroquina).
3. **Registro médico personalizado**: Al registrar un nuevo paciente, este carga sus propios signos vitales (peso corporal, presión arterial, pulso, temperatura, alergias y médico tratante), quedando guardado en su historia clínica en disco.
4. **Seguimiento diario de tomas y mini menú empático**:
   - Botón **✓ Tomada** para registrar adherencia inmediata.
   - Botón **✕ No tomada** que abre el menú con las 3 razones específicas requeridas:
     - 💰 *Falta de dinero* (con información de programas de medicamentos y Banco de Drogas).
     - 🌿 *Por querer probar opciones naturales* (con advertencia médica sobre fitoterapia que activa brotes).
     - 🧠 *Por fatiga u olvido* (con apoyo empático y recomendaciones para Lupus Fog).
5. **Sección "Zonas Especiales a Cuidar"**:
   - Protocolo clínico estructurado por órgano diana: Riñones (Nefritis), Piel y Rostro (Fotosensibilidad), Articulaciones, Ojos y Retina, Corazón y Vasos, Boca y Cabello, y Sistema Nervioso / Cognitivo.
   - Selector interactivo de zona prioritaria y diario de notas clínicas del paciente.
6. **Módulo de Publicación y Red Wi-Fi**: Detección automática de IP local y accesos directos para abrir en dispositivos móviles.
