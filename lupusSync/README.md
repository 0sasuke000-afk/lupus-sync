# 🦋 LupusSync - Ecosistema Avanzado para la Prevención del Abandono Terapéutico e Integración con el Sistema Hospitalario TASY

**Evaluación Anual de Capacidades Profesionales (E.A.C.P. 2026 - Etapa 2)**  
*Departamento de Informática — E.E.S.T. N° 2 "República Argentina" (San Miguel, Bs As)*  
**Equipo de Proyecto:** Gonzalo Verdini, Hugo Villalba y Nilton Ramírez  
**Asesoramiento Médico Especializado:** Dra. Leila Romina Ferreira (Médica Reumatóloga — Hospital Posadas)  
**Retroalimentación de Experiencia de Usuario:** Miriam Villalba  
**Institución Hospitalaria de Referencia:** Hospital Nacional Profesor Alejandro Posadas (Sistema TASY)

---

## 📋 Descripción del Proyecto (Etapa 2)

**LupusSync** es una plataforma eHealth integral y multiplataforma diseñada específicamente para el acompañamiento de pacientes con **Lupus Eritematoso Sistémico (LES)**, mitigando el impacto del compromiso cognitivo (**Lupus Fog**) y optimizando los flujos administrativos hospitalarios mediante la interoperabilidad con la plataforma **TASY (Philips Healthcare)** utilizada en el **Hospital Posadas**.

---

## 🏗️ Arquitectura y Módulos Operativos

```
[ FRONT END / BACK END ]
       │
       ▼
┌──────────────────────────────────────────────┐
│  1. LOGIN / REGISTRO                         │
│     - Nombre, DNI, Dirección, Teléfono       │
│     - Tipo de Lupus y Grupo Sanguíneo        │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│  2. HISTORIA CLÍNICA (Ficha Central)         │
│     - Criterios EULAR/ACR 2019 & Serología   │
│     - Compromiso Orgánico & Laboratorios     │
│     - Dra. Leila Romina Ferreira (Hosp. Posadas)
└──────────────────────┬───────────────────────┘
                       │
       ┌───────────────┼───────────────┬───────────────┬───────────────┐
       ▼               ▼               ▼               ▼               ▼
┌──────────────┐┌──────────────┐┌──────────────┐┌──────────────┐┌──────────────┐
│ 3. Plan      ││ 4. Agenda    ││ 5. Guía de   ││ 6. Historial ││ 7. Guardia   │
│    Farmaco-  ││    de Turnos ││    Fármacos  ││    & Brotes  ││    de        │
│    lógico    ││    Multidis- ││    (Vademé-  ││    (OCR TASY ││    Emergen-  │
│    (Alertas) ││    ciplinaria││    cum LES)  ││    & IA Fog) ││    cias SOS  │
└──────────────┘└──────────────┘└──────────────┘└──────────────┘└──────────────┘
```

---

## 📱 Funcionalidades Específicas de la Etapa 2

### 1. 💊 Plan Farmacológico y Motor de Farmacovigilancia
- **Checklist Diario de Tomas Interactivo:** Filtros por horario (`Todas`, `🌅 Mañana`, `☀️ Almuerzo`, `🌙 Noche`) con botones interactivos `✓ TOMADA` / `⏳ PENDIENTE`.
- **Cálculo de Adherencia en Tiempo Real:** Porcentaje de adherencia actualizado instantáneamente con feedback visual y registro persistente.
- **Gestión de Fármacos:** Alta de medicamentos con dosis, horarios, frecuencia y fechas de control médico obligatorio (ej. fondo de ojo anual por antipalúdicos).
- **Motor de Validación Cruzada en Tiempo Real (Farmacovigilancia):**
  - Validación entre prescripciones de Reumatología (Hidroxicloroquina, Meprednisona, Micofenolato, Metotrexato, Azatioprina, Belimumab) y Psiquiatría u otros especialistas (Escitalopram, Sertralina, Clonazepam, Fluoxetina, Litio, Sulfamidas, AINEs, Alopurinol).
  - Alertas visuales con código semafórico:
    - 🔴 **Contraindicación Crítica / Riesgo Vital:** Sulfas (Cotrimoxazol/Bactrim - brote masivo), AINEs en altas dosis (falla renal aguda / nefritis lúpica), Azatioprina + Alopurinol (aplasia medular fulminante).
    - 🟡 **Precaución y Monitoreo:** Hidroxicloroquina + Escitalopram (prolongación de intervalo QT en ECG), Corticoides + Sertralina (riesgo de hemorragia digestiva alta / gastroprotección necesaria), Metotrexato + AINEs (toxicidad medular).
    - 🟢 **Compatible y Seguro:** Clonazepam con esquema basal, combinaciones compatibles según vademécum.
- **Monitoreo Ambiental (San Miguel - E.E.S.T. N° 2 / Hospital Posadas):** Índice UV, humedad relativa ambiente y recomendaciones para evitar brotes por fotosensibilidad.

### 2. 📅 Agenda Multidisciplinaria de Turnos
- **Citas organizadas con especialistas de referencia:**
  - **Reumatología:** Dra. Leila Romina Ferreira (Médica Reumatóloga colaboradora) y Dr. Gastón Silva (Hospital Posadas).
  - **Oftalmología:** Dra. Inés Martínez (Fondo de ojos y campo visual 10-2 por antipalúdicos).
  - **Nefrología:** Dr. Alejandro Méndez (Control de función renal, proteinuria de 24hs y Nefritis Lúpica).
  - **Psiquiatría / Salud Mental:** Dr. Martín Echeverría (Soporte psicoemocional y control cognitivo ante Lupus Fog).
  - **Laboratorio Central:** Bioq. Gabriela Torres (Marcadores ANA, Anti-dsDNA, Complemento C3/C4).
- **Banner de Control Prioritario:** Alerta destacada superior con la cita médica más próxima.
- **Filtros Dinámicos:** `Todos los turnos`, `⏳ Próximos`, `🏥 Hospital Posadas`, `✅ Confirmados`.
- **Interacción Completa de Botones:**
  - Botón de cambio de estado en un clic (`Confirmado` ➔ `Recordatorio` ➔ `Pendiente`).
  - Botón `ℹ️ Indicaciones / Preparación` con modal informativo (ayuno de 12 hs, muestra de orina de 24hs, dilatación pupilar con acompañante).
  - Botón `🗑️ Cancelar / Eliminar Turno` con confirmación.
  - Formulario rápido con guardado persistente.

### 3. 📖 Guía de Fármacos (Vademécum Especializado en LES)
- Catálogo completo de 8 medicamentos clave:
  1. **Hidroxicloroquina (Plaquinol):** Inmunomodulador - Pilar fundamental.
  2. **Prednisona / Meprednisona:** Corticosteroide antiinflamatorio rápido.
  3. **Micofenolato Mofetilo (CellCept):** Inmunosupresor renal de primera línea.
  4. **Azatioprina (Imuran):** Inmunosupresor de mantenimiento.
  5. **Metotrexato (MTX):** Inmunosupresor de administración semanal.
  6. **Belimumab (Benlysta):** Terapia biológica monoclonal.
  7. **Anifrolumab (Saphnelo):** Terapia biológica anti-interferón.
  8. **Calcio + Vitamina D3:** Suplemento osteoprotector ante corticoides y fotoprotección.
- **Buscador en Vivo y Filtros de Categoría:** Filtrado instantáneo por nombre genérico, comercial, síntoma o categoría.
- **Botón `💬 Preguntar a la IA sobre este fármaco`:** Vinculación directa con el Asistente IA.
- **Banner de Protocolo de Urgencias:** Códigos visuales para médicos de guardia (Permitido: Hidrocortisona IV; Contraindicado: Sulfas y AINEs).

### 4. 📈 Historial & Registro de Brotes, OCR y TASY
- **Diario de Síntomas con Validación Inmunológica:**
  - Slider interactivo de dolor articular (0 a 10 con semáforo dinámico).
  - Selector de fatiga adaptado a fatiga física y niebla cognitiva (**Lupus Fog**).
  - Termometría precisa en °C.
  - Checkboxes de síntomas cardinales de Lupus: Eritema Malar (rash mariposa), Fotosensibilidad, Rigidez matutina / Artritis, Úlceras bucales indoloras, Alopecia, Dolor torácico pleurítico.
  - Minutos de exposición solar y articulaciones afectadas.
  - Botón `💾 Guardar Registro de Síntomas` con guardado persistente en la línea de tiempo.
- **Consultor Asistido por Inteligencia Artificial (Soporte Lupus Fog):**
  - **Selector de Modo Cognitivo:**
    - 🧠 *Modo Lupus Fog:* Lenguaje simple, cálido, oraciones cortas en viñetas sin tecnicismos, pensado para momentos de confusión mental.
    - 🔬 *Modo Clínico Detallado:* Respuestas extensas fundamentadas en las guías EULAR/ACR 2019 y pautas reumatológicas.
  - **Filtros Antifabulación y Seguridad:** Alertas inmediatas ante banderas rojas (fiebre > 38°C, disnea, orina espumosa con edema) y prohibición de automedicación con AINEs.
  - **Chips de Consultas Frecuentes:** 1-clic para niebla mental, eritema, olvido de dosis, febrícula y protector solar.
- **Motor de Exportación TASY e Interoperabilidad (Hospital Posadas):**
  - Botón `📄 Exportar Informe Completo para TASY / PDF`: Genera el documento médico consolidado con diseño imprimible profesional.
  - Botón `📋 Copiar Texto para TASY`: Genera y copia al portapapeles el bloque estandarizado de texto plano para pegado directo en la HCE del Hospital Posadas.
  - Botón `👁️ Ver Formato Texto Plano`: Modal con visor de código y selección total.
- **Módulo OCR / Escáner Clínico Digital:**
  - Captura directa con cámara móvil o carga de fotos/documentos de informes médicos.
  - Presets oficiales del Hospital Posadas para pruebas rápidas (Laboratorio Inmunológico ANA/dsDNA/C3, Orina 24hs / Proteinuria, Receta Reumatología Dra. Ferreira).
  - Escaneo con animación láser y medidor de confianza (98.7%).
  - Texto reconocido editable por el usuario.
  - Botón `✨ Formatear para TASY`: Convierte el informe extraído en el bloque estándar para TASY.
  - Botón `📥 Importar Valores a mi Historia Clínica`: Actualiza automáticamente los parámetros de laboratorio en la ficha del paciente.

### 5. 🚨 Guardia de Emergencias
- **Botón SOS Directo (107 / Emergencias Médicas).**
- **Ficha Rápida para Médicos de Guardia de Alto Contraste:** DNI, Grupo sanguíneo, Alerta crítica de dosis de estrés de corticoides y fármacos contraindicados.
- **Banderas Rojas Clínicas:** Fiebre en paciente inmunosuprimido, pleuritis, reactivación renal, alarma neurológica.
- **Centros de Referencia 24 Horas:** **Hospital Nacional Profesor Alejandro Posadas** (Hospital de Referencia del proyecto), Hospital de Clínicas, Ramos Mejía, Hospital Italiano con botones de llamada y enlace directo a Google Maps.

### 6. 🛡️ Zonas Especiales a Cuidar
- Protocolos preventivos por órgano diana: Riñones (Nefritis lúpica), Piel y Rostro (Fotosensibilidad 365 días), Articulaciones, Ojos y Retina (Vigilancia de antipalúdicos), Corazón y Vasos, Boca y Cabello (Alopecia), y Sistema Nervioso / Cognitivo (Lupus Fog).
- Selector personalizado de zona prioritaria y diario de notas del paciente.

### 7. 💊 Plan Farmacológico y Mini Menú de Razones de No Toma
- Botón **✓ Tomada** para registrar adherencia inmediata.
- Botón **✕ No tomada** con mini menú que permite al paciente registrar la razón exacta:
  - 💰 **Falta de dinero** (con orientación del Banco de Drogas y programas públicos).
  - 🌿 **Por querer probar opciones naturales** (con alerta médica sobre riesgos de fitoterapia inmunoestimulante).
  - 🧠 **Por fatiga u olvido** (con soporte empático y tips para niebla mental / Lupus Fog).

### 8. 🌐 Despliegue y Acceso desde Cualquier Dispositivo
- Consulta la guía `SUBIR_A_INTERNET.md` para publicar gratis en Netlify Drop, Vercel o GitHub Pages en menos de 1 minuto, o para abrir desde cualquier celular o tablet conectado a la misma red Wi-Fi.

---

## 💻 Instrucciones para Ejecutar la Aplicación

### Opción 1 (Recomendada - 1 Clic):
Haz doble clic sobre el archivo ejecutable:
👉 **`iniciar.bat`** (o `start.bat`)

Esto iniciará automáticamente el servidor local de base de datos JSON y abrirá la aplicación en tu navegador web en **`http://localhost:3000`**.

### Opción 2: Desde la Terminal
Abre PowerShell o CMD en la carpeta del proyecto y ejecuta:
```bash
node server.js
```
Luego abre en tu navegador:
👉 **`http://localhost:3000`**

### Opción 3: Modo Navegador Local
Doble clic directamente sobre el archivo:
👉 **`index.html`**

---

## 📁 Base de Datos en Archivos JSON Locales (100% Gratuito y Autónomo)

Para evitar costos de suscripción y límites de pago en plataformas cloud como Google Firebase, **LupusSync** almacena toda la información clínica de manera autónoma y segura en **archivos `.json` legibles en disco** dentro del directorio `data/`:

- 👤 **`data/paciente.json`**: Perfil filiatorio, DNI, diagnóstico de LES, médico tratante y contacto de urgencia SOS.
- 📋 **`data/historia_clinica.json`**: Criterios EULAR/ACR 2019, analíticas serológicas (ANA, Anti-dsDNA, Complemento C3/C4, Proteinuria) y notas de evolución del Hospital Posadas (Dra. Leila Ferreira).
- 💊 **`data/medicamentos.json`**: Plan farmacológico basal y dosis (Hidroxicloroquina, Meprednisona, Micofenolato, etc.) y registro de tomas diarias.
- 📅 **`data/turnos.json`**: Agenda multidisciplinaria (Reumatología, Oftalmología, Nefrología, Salud Mental, Laboratorio).
- 📈 **`data/sintomas.json`**: Historial y diario de brotes (dolor articular 0-10, fatiga, fotosensibilidad y eritema malar).
- 👥 **`data/usuarios.json`**: Cuentas de acceso y credenciales locales sin necesidad de Firebase Auth.
- 📦 **`data/lupussync_master.json`**: Copia unificada de la base de datos completa para copias de seguridad inmediatas.

### 🚀 Ventajas del Almacenamiento JSON:
1. **Cero Costo ($0):** Sin necesidad de tarjetas de crédito ni suscripciones a Google Cloud.
2. **Totalmente Local y Privado:** La información de salud del paciente reside en su propio equipo.
3. **Respaldo y Restauración en 1 Clic:** Desde la pestaña *Base de Datos JSON* puedes descargar o restaurar copias completas en cualquier momento.
4. **Interoperabilidad Hospitalaria:** Formato estándar directamente compatible con integraciones para sistemas hospitalarios como **TASY (Philips Healthcare)**.

---
*LupusSync — E.E.S.T. N° 2 "República Argentina" — Departamento de Informática (2026)*
