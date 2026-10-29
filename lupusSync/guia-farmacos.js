/**
 * LupusSync - Base de conocimiento farmacológico interactivo
 * Guía completa de medicamentos específicos para Lupus Eritematoso Sistémico (LES)
 */

const GUIA_FARMACOS = [
  {
    id: 'hidroxicloroquina',
    nombre: 'Hidroxicloroquina (Plaquinol)',
    categoria: 'Inmunomodulador',
    etiquetaTipo: 'Pilar Fundamental',
    descripcionCorta: 'Medicamento basal imprescindible para todos los pacientes con Lupus, salvo contraindicación oftalmológica estricta.',
    indicacion: 'Previene brotes lúpicos, reduce el daño orgánico acumulado a largo plazo, disminuye el riesgo de trombosis y mejora el perfil lipídico y la sobrevida.',
    posologia: 'Habitualmente 200 mg a 400 mg diarios (máximo 5 mg/kg de peso corporal real por día). Tomar preferentemente durante la cena con abundante agua o alimentos.',
    efectosSecundarios: [
      'Molestias gastrointestinales leves iniciales (náuseas, dispepsia)',
      'Hiperpigmentación cutánea o grisácea en piernas tras años de uso',
      'Riesgo de toxicidad retiniana (maculopatía) extremadamente infrecuente a dosis ajustadas por peso'
    ],
    monitoreo: 'Examen oftalmológico basal con Fondo de Ojos y Campo Visual Computarizado (10-2) o Tomografía OCT, repetido anualmente.',
    consejos: 'No suspender la medicación sin indicación médica, ya que el efecto protector acumulativo tarda varias semanas en establecerse.',
    colorTag: 'badge-purple'
  },
  {
    id: 'prednisona',
    nombre: 'Prednisona / Meprednisona',
    categoria: 'Corticosteroide',
    etiquetaTipo: 'Antiinflamatorio Rápido',
    descripcionCorta: 'Fármaco corticoide de acción antiinflamatoria e inmunosupresora rápida para apagar el brote activo.',
    indicacion: 'Control de la inflamación aguda en articulaciones, piel, pleura, pericardio o riñones. Se busca descender a la menor dosis efectiva de mantenimiento tan pronto sea posible.',
    posologia: 'Variable según la gravedad del brote (5 mg a 60 mg/día). Debe tomarse siempre por la mañana (08:00 hs) para acompañar el ritmo circadiano natural del cuerpo.',
    efectosSecundarios: [
      'Aumento del apetito, retención de líquidos y redistribución grasa (hábito cushingoide)',
      'Elevación de la presión arterial y de los niveles de azúcar en sangre (glucemia)',
      'Riesgo de osteopenia / osteoporosis y fragilidad capilar',
      'Insomnio o cambios del estado de ánimo si se toma por la tarde/noche'
    ],
    monitoreo: 'Control periódico de Tensión Arterial, Glucemia en ayunas, Densitometría ósea y suplementación con Calcio + Vitamina D.',
    consejos: 'NUNCA suspender de golpe los corticoides por riesgo de insuficiencia suprarrenal aguda. El descenso debe ser siempre gradual y pautado por el médico.',
    colorTag: 'badge-amber'
  },
  {
    id: 'micofenolato',
    nombre: 'Micofenolato Mofetilo (CellCept) / Ácido Micofenólico',
    categoria: 'Inmunosupresor',
    etiquetaTipo: 'Ahorrador de Corticoides',
    descripcionCorta: 'Inmunosupresor de primera línea para el tratamiento y mantenimiento de la Nefritis Lúpica y afectaciones sistémicas.',
    indicacion: 'Tratamiento de inducción y mantenimiento en Nefritis Lúpica Clase III, IV y V. Permite reducir o retirar corticoides manteniendo la enfermedad inactiva.',
    posologia: '1000 mg a 3000 mg repartidos en dos tomas diarias (cada 12 horas). Tomar con estómago vacío (1 hora antes o 2 horas después de comer) o con comida suave si hay intolerancia.',
    efectosSecundarios: [
      'Gastrointestinales: náuseas, dolor abdominal, diarrea',
      'Descenso de glóbulos blancos (leucopenia) y plaquetas',
      'Mayor susceptibilidad a infecciones respiratorias o urinarias'
    ],
    monitoreo: 'Hemograma completo, perfil renal y función hepática cada 1 a 2 meses.',
    consejos: 'ESTRICTAMENTE CONTRAINDICADO EN EL EMBARAZO por riesgo de malformaciones congénitas y aborto. Se requiere método anticonceptivo eficaz.',
    colorTag: 'badge-blue'
  },
  {
    id: 'azatioprina',
    nombre: 'Azatioprina (Imuran)',
    categoria: 'Inmunosupresor',
    etiquetaTipo: 'Mantenimiento Seguro',
    descripcionCorta: 'Inmunosupresor antimetabolito clásico, ampliamente utilizado en el mantenimiento y compatible con el embarazo si es necesario.',
    indicacion: 'Mantenimiento en pacientes con LES articular, cutáneo, hematológico o renal tras alcanzar la remisión. Frecuentemente elegido en mujeres en edad fértil.',
    posologia: '1 a 2.5 mg/kg de peso al día (habitualmente 50 a 150 mg diarios), tomado preferentemente después de las comidas.',
    efectosSecundarios: [
      'Supresión de la médula ósea (anemia, leucopenia)',
      'Intolerancia gástrica',
      'Elevación reversible de enzimas hepáticas (transaminasas)'
    ],
    monitoreo: 'Hemograma y hepatograma cada 4 a 8 semanas.',
    consejos: '¡ATENCIÓN! Interacción grave y potencialmente mortal con Alopurinol (fármaco para el ácido úrico). Avisar siempre al médico si le indican otros medicamentos.',
    colorTag: 'badge-blue'
  },
  {
    id: 'metotrexato',
    nombre: 'Metotrexato (MTX)',
    categoria: 'Inmunosupresor',
    etiquetaTipo: 'Uso Semanal',
    descripcionCorta: 'Inmunosupresor muy eficaz para el compromiso articular (artritis) y cutáneo del Lupus.',
    indicacion: 'Artritis inflamatoria persistente, sinovitis, y lesiones cutáneas refractarias a antipalúdicos.',
    posologia: '10 a 25 mg administrados en UNA SOLA DOSIS SEMANAL (oral o inyectable subcutánea). Al día siguiente o a las 48 hs se administra Ácido Fólico (5 mg) para reducir toxicidad.',
    efectosSecundarios: [
      'Náuseas o fatiga el día de la toma semanal',
      'Aftas o llagas en la boca',
      'Toxicidad hepática y caída de glóbulos blancos'
    ],
    monitoreo: 'Hemograma, transaminasas hepáticas y función renal cada 6-8 semanas.',
    consejos: 'RECORDAR SIEMPRE: Se toma UNA SOLA VEZ A LA SEMANA, nunca todos los días. Contraindicado en embarazo y lactancia. Evitar consumo de alcohol.',
    colorTag: 'badge-rose'
  },
  {
    id: 'belimumab',
    nombre: 'Belimumab (Benlysta)',
    categoria: 'Terapia Biológica',
    etiquetaTipo: 'Innovación Biológica',
    descripcionCorta: 'Primer anticuerpo monoclonal aprobado específicamente para el tratamiento del Lupus Eritematoso Sistémico.',
    indicacion: 'LES con autoanticuerpos positivos y alta actividad de la enfermedad a pesar del tratamiento estándar. Aprobado también para Nefritis Lúpica activa.',
    posologia: 'Vía intravenosa (10 mg/kg cada 4 semanas tras dosis de carga) o mediante autoinyector subcutáneo de 200 mg una vez por semana.',
    efectosSecundarios: [
      'Infecciones de vías respiratorias superiores',
      'Reacciones en el sitio de inyección o durante la infusión',
      'Depresión o cambios en el estado de ánimo (reportar de inmediato)'
    ],
    monitoreo: 'Evaluación clínica periódica, descartar infecciones agudas antes de cada dosis.',
    consejos: 'Conservar el autoinyector refrigerado entre 2°C y 8°C. Proteger de la luz solar directa.',
    colorTag: 'badge-emerald'
  },
  {
    id: 'anifrolumab',
    nombre: 'Anifrolumab (Saphnelo)',
    categoria: 'Terapia Biológica',
    etiquetaTipo: 'Anti-Interferón',
    descripcionCorta: 'Anticuerpo monoclonal dirigido contra la subunidad 1 del receptor de interferón tipo I, clave en la patogenia del LES.',
    indicacion: 'Tratamiento complementario en pacientes adultos con LES activo moderado a grave, con excelente respuesta en síntomas cutáneos y articulares.',
    posologia: '300 mg mediante infusión intravenosa cada 4 semanas en centro médico especializado.',
    efectosSecundarios: [
      'Infecciones respiratorias',
      'Reactivación del virus Herpes Zóster (culebrilla)',
      'Reacciones a la infusión'
    ],
    monitoreo: 'Control clínico pre-infusión. Se aconseja vacunación previa contra Herpes Zóster.',
    consejos: 'Si presenta sarpullido doloroso o ardor en la piel con ampollas pequeñas, consultar urgentemente por sospecha de zóster.',
    colorTag: 'badge-emerald'
  },
  {
    id: 'calcio_vitamina_d',
    nombre: 'Calcio + Vitamina D3',
    categoria: 'Suplemento Osteoprotector',
    etiquetaTipo: 'Salud Ósea',
    descripcionCorta: 'Suplemento indispensable para contrarrestar la pérdida mineral ósea y la falta de síntesis por fotoprotección estricta.',
    indicacion: 'Prevención de osteoporosis inducida por corticoides y corrección de la deficiencia de Vitamina D en personas con Lupus que deben evitar el sol.',
    posologia: 'Generalmente 500-1200 mg de Calcio elemental y 800-2000 UI de Vitamina D3 diarios, junto a las comidas principales.',
    efectosSecundarios: ['Constipación leve o distensión abdominal en algunas personas'],
    monitoreo: 'Dosaje en sangre de 25-OH-Vitamina D y calcemia periódica.',
    consejos: 'La fotoprotección estricta bloquea la síntesis de vitamina D en la piel; por eso el suplemento es de indicación casi universal en Lupus.',
    colorTag: 'badge-teal'
  }
];

export { GUIA_FARMACOS };

if (typeof window !== 'undefined') {
  window.GUIA_FARMACOS = GUIA_FARMACOS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GUIA_FARMACOS };
}
