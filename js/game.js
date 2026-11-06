/**
 * game.js
 * Motor del minijuego avanzado: múltiples documentos, sobornos, presiones, eventos, reputación.
 */

const estado = {
  dia: 1,
  puntuacion: 0,
  dinero: 0,
  reputacion: 100,
  aciertos: 0,
  errores: 0,
  documentosProcesados: 0,
  documentosPorDia: 12,
  documentosGenerados: 0,
  cola: [],           // documentos visibles en pantalla (hasta 4)
  procesados: [],     // documentos ya procesados
  erroresDetalle: [], // detalle de los errores cometidos en el día
  juegoActivo: false,
  pausado: false,
  tiempoRestante: 0,  // segundos por día
  eventoActual: null,
  presionActual: null,
  tiempoEventoRestante: 0,
  sobornosAceptados: 0
};

const CONFIG = {
  tiempoPorDia: 180, // 3 minutos por día
  documentosIniciales: 3,
  documentosMaximoPantalla: 4,
  puntosAcierto: 15,
  puntosError: -10,
  penalidadSoborno: -20,
  reputacionPenalidadSoborno: -15,
  reputacionBonificacionDia: 5
};

/**
 * Inicia una nueva partida desde el día 1.
 */
function iniciarPartida() {
  estado.dia = 1;
  estado.puntuacion = 0;
  estado.dinero = 0;
  estado.reputacion = 100;
  estado.aciertos = 0;
  estado.errores = 0;
  estado.documentosProcesados = 0;
  estado.documentosGenerados = 0;
  estado.cola = [];
  estado.procesados = [];
  estado.erroresDetalle = [];
  estado.juegoActivo = true;
  estado.pausado = false;
  estado.tiempoRestante = CONFIG.tiempoPorDia;
  estado.eventoActual = null;
  estado.presionActual = null;
  estado.tiempoEventoRestante = 0;
  estado.sobornosAceptados = 0;

  generarEventoAleatorio();
  rellenarCola();
  iniciarTemporizador();

  window.ui.actualizarBarraEstado();
  window.ui.actualizarTemporizador();
  window.ui.renderizarCola();
}

/**
 * Rellena la cola de documentos visibles hasta el máximo.
 */
function rellenarCola() {
  while (estado.cola.length < CONFIG.documentosMaximoPantalla && estado.documentosGenerados < estado.documentosPorDia) {
    const doc = window.documents.generarDocumento();
    estado.cola.push(doc);
    estado.documentosGenerados++;
  }
}

/**
 * Inicia el temporizador del día.
 */
function iniciarTemporizador() {
  if (estado.temporizadorInterval) clearInterval(estado.temporizadorInterval);
  estado.temporizadorInterval = setInterval(() => {
    if (!estado.juegoActivo || estado.pausado) return;
    estado.tiempoRestante--;
    if (estado.tiempoEventoRestante > 0) {
      estado.tiempoEventoRestante--;
      if (estado.tiempoEventoRestante <= 0) {
        estado.eventoActual = null;
        estado.presionActual = null;
        window.ui.actualizarEvento();
      }
    }
    if (estado.tiempoRestante <= 0) {
      terminarDia();
    }
    window.ui.actualizarTemporizador();
  }, 1000);
}

/**
 * Genera un evento aleatorio o presión al inicio del día.
 */
function generarEventoAleatorio() {
  const probabilidadEvento = Math.random();
  const probabilidadPresion = Math.random();

  if (probabilidadEvento < 0.4) {
    const evento = window.rules.EVENTOS_ALEATORIOS[Math.floor(Math.random() * window.rules.EVENTOS_ALEATORIOS.length)];
    estado.eventoActual = evento;
    estado.tiempoEventoRestante = evento.duracion;
  }

  if (probabilidadPresion < 0.35 && !estado.presionActual) {
    estado.presionActual = window.rules.PRESIONES[Math.floor(Math.random() * window.rules.PRESIONES.length)];
  }
}

/**
 * Procesa un documento de la cola.
 * @param {object} doc - Documento a procesar
 * @param {string} decision - 'aprobar' o 'rechazar'
 * @param {boolean} aceptoSoborno - si el jugador aceptó soborno
 */
function procesarDocumento(doc, decision, aceptoSoborno = false) {
  if (!estado.juegoActivo) return;

  // Remover documento de la cola
  const index = estado.cola.findIndex(d => d.id === doc.id);
  if (index === -1) return;
  estado.cola.splice(index, 1);

  const decisionCorrecta = doc.valido ? 'aprobar' : 'rechazar';
  const correcto = decision === decisionCorrecta;

  // Calcular puntuación base
  let puntos = 0;
  let mensaje = '';

  if (correcto) {
    puntos += CONFIG.puntosAcierto;
    estado.aciertos++;
    mensaje = 'Documento procesado correctamente.';
  } else {
    puntos += CONFIG.puntosError;
    estado.errores++;
    mensaje = 'Error: ' + doc.motivo;
    estado.erroresDetalle.push({
      pais: doc.pais,
      tipo: doc.tipo.etiqueta,
      motivo: doc.motivo,
      decisionTomada: decision
    });
  }

  // Manejo de soborno
  if (doc.soborno.ofrece && aceptoSoborno) {
    estado.dinero += doc.soborno.monto;
    estado.sobornosAceptados++;
    puntos += CONFIG.penalidadSoborno;
    estado.reputacion = Math.max(0, estado.reputacion + CONFIG.reputacionPenalidadSoborno);
    mensaje += ` Aceptaste soborno de $${doc.soborno.monto}. Reputación reducida.`;
  }

  // Reputación por decisiones correctas/incorrectas
  if (correcto) {
    estado.reputacion = Math.min(100, estado.reputacion + 1);
  } else {
    estado.reputacion = Math.max(0, estado.reputacion - 2);
  }

  estado.puntuacion = Math.max(0, estado.puntuacion + puntos);
  estado.documentosProcesados++;
  estado.procesados.push({ doc, decision, correcto, aceptoSoborno });

  // Revisar presión (si la decisión coincide con la presión esperada, bonificación de reputación)
  if (estado.presionActual && decision === estado.presionActual.decisionEsperada && doc.presion) {
    estado.reputacion = Math.min(100, estado.reputacion + 2);
    mensaje += ' Has seguido la presión política.';
  }

  window.ui.mostrarFeedback(mensaje, correcto);
  window.ui.actualizarBarraEstado();

  // Rellenar cola con nuevos documentos
  rellenarCola();

  // Si no quedan documentos ni en cola ni por generar, terminar día
  if (estado.cola.length === 0 && estado.documentosGenerados >= estado.documentosPorDia) {
    setTimeout(() => {
      terminarDia();
    }, 1500);
  } else {
    window.ui.renderizarCola();
  }
}

/**
 * Finaliza el día actual.
 */
function terminarDia() {
  if (!estado.juegoActivo) return;
  estado.juegoActivo = false;
  if (estado.temporizadorInterval) {
    clearInterval(estado.temporizadorInterval);
  }

  // Bonificación de reputación por completar el día
  estado.reputacion = Math.min(100, estado.reputacion + CONFIG.reputacionBonificacionDia);

  window.ui.mostrarResultado(
    estado.puntuacion,
    estado.aciertos,
    estado.errores,
    estado.reputacion,
    estado.dinero,
    estado.dia,
    estado.erroresDetalle,
    estado.documentosPorDia - estado.documentosProcesados
  );
}

/**
 * Avanza al siguiente día.
 */
function siguienteDia() {
  estado.dia++;
  estado.documentosProcesados = 0;
  estado.cola = [];
  estado.procesados = [];
  estado.erroresDetalle = [];
  estado.documentosGenerados = 0;
  estado.juegoActivo = true;
  estado.pausado = false;
  estado.tiempoRestante = CONFIG.tiempoPorDia;
  estado.eventoActual = null;
  estado.presionActual = null;
  estado.tiempoEventoRestante = 0;

  generarEventoAleatorio();
  rellenarCola();
  iniciarTemporizador();

  window.ui.actualizarBarraEstado();
  window.ui.actualizarTemporizador();
  window.ui.renderizarCola();
  window.ui.mostrarPantalla('juego');
}

function pausarJuego() {
  estado.pausado = true;
}

function reanudarJuego() {
  estado.pausado = false;
}

window.game = {
  iniciarPartida,
  procesarDocumento,
  siguienteDia,
  pausarJuego,
  reanudarJuego,
  get estado() {
    return estado;
  },
  get config() {
    return CONFIG;
  }
};
