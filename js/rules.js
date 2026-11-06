/**
 * rules.js
 * Datos y reglas del Consejo de Seguridad de la ONU (CSNU) - MODO AVANZADO
 */

// Miembros permanentes con poder de veto
const PAISES_P5 = [
  'China',
  'Francia',
  'Rusia',
  'Reino Unido',
  'Estados Unidos'
];

// Miembros no permanentes del CSNU (periodo 2026-2027, ejemplo rotativo)
const PAISES_ROTATIVOS_2026 = [
  'Argelia',
  'Dinamarca',
  'Grecia',
  'Guyana',
  'Pakistán',
  'Panamá',
  'República de Corea',
  'Sierra Leona',
  'Eslovenia',
  'Somalia'
];

// Países que NO son miembros del Consejo este año (para documentos inválidos)
const PAISES_NO_MIEMBROS = [
  'Canadá',
  'Brasil',
  'Australia',
  'Japón',
  'India',
  'México',
  'Sudáfrica',
  'Alemania'
];

// Todos los miembros actuales del CSNU
const TODOS_LOS_MIEMBROS = [...PAISES_P5, ...PAISES_ROTATIVOS_2026];

// Países en conflicto activo (no deben votar sobre resoluciones relacionadas)
const PAISES_EN_CONFLICTO = [
  'Ucrania',
  'Rusia',
  'Israel',
  'Palestina',
  'Sudán',
  'Níger'
];

// Tipos de documento avanzados, con explicación para el jugador
const TIPOS_DOCUMENTO = [
  {
    clave: 'solicitud_resolucion',
    etiqueta: 'Solicitud de resolución',
    descripcion: 'Propuesta formal para que el Consejo de Seguridad vote una resolución sobre un tema de paz o seguridad internacional.',
    queRevisar: 'El país debe ser miembro del Consejo y la fecha debe estar vigente.'
  },
  {
    clave: 'notificacion_veto',
    etiqueta: 'Notificación de veto',
    descripcion: 'Aviso oficial de que uno de los cinco miembros permanentes bloqueará una resolución.',
    queRevisar: 'Solo los cinco miembros permanentes con poder de veto pueden notificar un veto.'
  },
  {
    clave: 'credenciales',
    etiqueta: 'Credenciales de embajador',
    descripcion: 'Documento que acredita a un embajador para representar a su país ante el Consejo de Seguridad.',
    queRevisar: 'El país debe ser miembro del Consejo y la fecha debe estar vigente.'
  },
  {
    clave: 'cable_diplomatico',
    etiqueta: 'Cable diplomático',
    descripcion: 'Mensaje oficial entre un gobierno y la ONU sobre un asunto de política internacional.',
    queRevisar: 'El país debe ser miembro del Consejo y la fecha debe estar vigente.'
  },
  {
    clave: 'sancion',
    etiqueta: 'Propuesta de sanción',
    descripcion: 'Medida punitiva (embargo, congelación de bienes o restricciones) contra un país o entidad.',
    queRevisar: 'El país debe ser miembro, la fecha debe estar vigente y no debe estar en conflicto directo.'
  }
];

// Eventos aleatorios que pueden ocurrir durante el día
const EVENTOS_ALEATORIOS = [
  {
    id: 'cambio_reglas',
    titulo: 'CAMBIO DE REGLAS',
    texto: 'Presidencia del Consejo: a partir de ahora, los documentos de urgencia tienen prioridad absoluta.',
    duracion: 3
  },
  {
    id: 'crisis_diplomatica',
    titulo: 'CRISIS DIPLOMÁTICA',
    texto: 'Un conflicto ha estallado. Revisa con extremo cuidado cualquier documento relacionado con zonas en conflicto.',
    duracion: 4
  },
  {
    id: 'inspeccion',
    titulo: 'INSPECCIÓN INTERNA',
    texto: 'La Oficina de Ética está revisando tu trabajo. Cualquier soborno aceptado será penalizado con -50 puntos.',
    duracion: 3
  },
  {
    id: 'presion_permanente',
    titulo: 'PRESIÓN DE UN MIEMBRO PERMANENTE',
    texto: 'Uno de los cinco miembros permanentes con poder de veto ha llamado directamente. Esperan que su documento sea tratado con prioridad.',
    duracion: 2
  }
];

// Presiones políticas de embajadores
const PRESIONES = [
  { origen: 'Embajador de Francia', texto: 'Esperamos que nuestra solicitud sea aprobada hoy mismo.', decisionEsperada: 'aprobar' },
  { origen: 'Embajador de Rusia', texto: 'No aprobemos esta resolución. Nuestros intereses están en juego.', decisionEsperada: 'rechazar' },
  { origen: 'Oficina del Secretario General', texto: 'Prioridad máxima en este cable diplomático. Procese rápidamente.', decisionEsperada: 'aprobar' },
  { origen: 'Misión de China ante la ONU', texto: 'Este proyecto de sanción no debería avanzar.', decisionEsperada: 'rechazar' },
  { origen: 'Embajador de Estados Unidos', texto: 'Nuestro cable contiene información clasificada. Apruébalo sin demora.', decisionEsperada: 'aprobar' }
];

/**
 * Indica si un país es miembro del Consejo de Seguridad este año.
 */
function esMiembro(pais) {
  return TODOS_LOS_MIEMBROS.includes(pais);
}

/**
 * Indica si un país tiene poder de veto (es uno de los 5 permanentes).
 */
function tieneVeto(pais) {
  return PAISES_P5.includes(pais);
}

/**
 * Valida si una fecha (string DD/MM/AAAA) está dentro de un rango razonable.
 */
function fechaValida(fechaStr) {
  if (!fechaStr) return false;
  const partes = fechaStr.split('/');
  if (partes.length !== 3) return false;
  const dia = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10);
  const anio = parseInt(partes[2], 10);
  const fecha = new Date(anio, mes - 1, dia);
  if (isNaN(fecha.getTime())) return false;
  const min = new Date(2025, 0, 1);
  const max = new Date(2027, 11, 31);
  return fecha >= min && fecha <= max;
}

/**
 * Genera una fecha válida o inválida aleatoria.
 */
function generarFecha(valida) {
  const validas = ['15/03/2026', '22/04/2026', '10/06/2026', '05/09/2026', '18/11/2026'];
  const invalidas = ['01/01/2020', '12/12/2019', '30/01/2028', '01/01/2024', '29/02/2023'];
  const lista = valida ? validas : invalidas;
  return lista[Math.floor(Math.random() * lista.length)];
}

window.rules = {
  PAISES_P5,
  PAISES_ROTATIVOS_2026,
  PAISES_NO_MIEMBROS,
  PAISES_EN_CONFLICTO,
  TODOS_LOS_MIEMBROS,
  TIPOS_DOCUMENTO,
  EVENTOS_ALEATORIOS,
  PRESIONES,
  esMiembro,
  tieneVeto,
  fechaValida,
  generarFecha
};
