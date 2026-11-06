/**
 * documents.js
 * Generador de documentos avanzados para el minijuego.
 */

function generarDocumento() {
  const { esMiembro, tieneVeto, fechaValida, generarFecha, TIPOS_DOCUMENTO, PAISES_EN_CONFLICTO } = window.rules;

  // Selección de país
  const esMiembroAleatorio = Math.random() < 0.75;
  let pais;
  if (esMiembroAleatorio) {
    const todos = window.rules.TODOS_LOS_MIEMBROS;
    pais = todos[Math.floor(Math.random() * todos.length)];
  } else {
    pais = window.rules.PAISES_NO_MIEMBROS[Math.floor(Math.random() * window.rules.PAISES_NO_MIEMBROS.length)];
  }

  const tipoIndex = Math.floor(Math.random() * TIPOS_DOCUMENTO.length);
  const tipo = TIPOS_DOCUMENTO[tipoIndex];

  const fechaEsValida = Math.random() < 0.75;
  const fecha = generarFecha(fechaEsValida);

  const conflicto = Math.random() < 0.2 && PAISES_EN_CONFLICTO.includes(pais);

  // Soborno: 30% de probabilidad de ofrecer soborno
  const ofreceSoborno = Math.random() < 0.3;
  const soborno = ofreceSoborno
    ? {
        ofrece: true,
        monto: [50, 100, 200, 500][Math.floor(Math.random() * 4)]
      }
    : { ofrece: false, monto: 0 };

  // Presión: 25% de probabilidad de tener presión política
  const tienePresion = Math.random() < 0.25;
  const presion = tienePresion
    ? window.rules.PRESIONES[Math.floor(Math.random() * window.rules.PRESIONES.length)]
    : null;

  // Urgencia: 20% de probabilidad
  const urgente = Math.random() < 0.2;

  const miembro = esMiembro(pais);
  const veto = tieneVeto(pais);
  const fechaOk = fechaValida(fecha);

  // Reglas de negocio para determinar si el documento es válido
  let valido = true;
  let motivo = '';

  if (!miembro) {
    valido = false;
    motivo = `El país "${pais}" no es miembro del Consejo de Seguridad este año.`;
  } else if (!fechaOk) {
    valido = false;
    motivo = 'La fecha del documento no es válida o ha expirado.';
  } else if (tipo.clave === 'notificacion_veto' && !veto) {
    valido = false;
    motivo = 'Solo los cinco miembros permanentes con poder de veto pueden notificar un veto.';
  } else if (tipo.clave === 'sancion' && conflicto) {
    valido = false;
    motivo = `El país "${pais}" está en conflicto directo y no puede proponer sanciones.`;
  } else if (tipo.clave === 'credenciales' && !miembro) {
    valido = false;
    motivo = 'Credenciales de un país no miembro del CSNU.';
  }

  return {
    id: Date.now() + Math.random(),
    pais,
    tipo,
    fecha,
    fechaValida: fechaOk,
    esMiembro: miembro,
    tieneVeto: veto,
    conflicto,
    urgente,
    soborno,
    presion,
    valido,
    motivo
  };
}

window.documents = {
  generarDocumento,
  TIPOS_DOCUMENTO: window.rules.TIPOS_DOCUMENTO
};
