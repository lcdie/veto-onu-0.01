/**
 * ui.js
 * Renderizado de pantallas y manejo de eventos del DOM - MODO AVANZADO
 */

const pantallas = {
  tutorial: document.getElementById('pantalla-tutorial'),
  juego: document.getElementById('pantalla-juego'),
  resultado: document.getElementById('pantalla-resultado')
};

const zonaEvento = document.getElementById('zona-evento');
const eventoTitulo = document.getElementById('evento-titulo');
const eventoTexto = document.getElementById('evento-texto');
const feedbackEl = document.getElementById('mensaje-feedback');

function mostrarPantalla(nombre) {
  Object.values(pantallas).forEach(p => p.classList.remove('activa'));
  pantallas[nombre].classList.add('activa');
}

/**
 * Renderiza todos los documentos de la cola con información detallada.
 */
function renderizarCola() {
  const cinta = document.getElementById('cinta-documentos');
  cinta.innerHTML = '';

  const estadoJuego = window.game.estado;

  actualizarEvento();

  estadoJuego.cola.forEach(doc => {
    const el = document.createElement('div');
    el.className = 'documento';
    if (doc.urgente) el.classList.add('urgente');
    if (doc.soborno.ofrece) el.classList.add('con-soborno');

    if (doc.urgente) {
      el.style.borderColor = '#d4af37';
      el.style.boxShadow = '5px 5px 0 #d4af37';
    }

    let html = `
      ${doc.urgente ? '<span class="etiqueta-urgente">⚠ URGENTE</span>' : ''}
      <h3>${doc.tipo.etiqueta}</h3>
      <p class="doc-descripcion">${doc.tipo.descripcion}</p>
      <div class="campo"><strong>País remitente:</strong> ${doc.pais}</div>
      <div class="campo"><strong>¿Es miembro del Consejo?:</strong> ${doc.esMiembro ? 'SÍ' : 'NO'}</div>
      <div class="campo"><strong>¿Tiene poder de veto?:</strong> ${doc.tieneVeto ? 'SÍ' : 'NO'}</div>
      <div class="campo"><strong>Fecha del documento:</strong> ${doc.fecha}</div>
      <div class="campo-ayuda">
        <strong>Qué debes revisar:</strong> ${doc.tipo.queRevisar}
      </div>
    `;

    if (doc.soborno.ofrece) {
      html += `
        <div class="soborno">
          💰 Soborno ofrecido: $${doc.soborno.monto}<br>
          <span class="soborno-nota">Aceptar cuesta 20 puntos y 15 de reputación.</span><br>
          <button class="btn btn-soborno" onclick="window.ui.aceptarSoborno('${doc.id}', 'aprobar')">Aceptar y Aprobar</button>
          <button class="btn btn-soborno" onclick="window.ui.aceptarSoborno('${doc.id}', 'rechazar')">Aceptar y Rechazar</button>
        </div>
      `;
    }

    if (doc.presion) {
      html += `
        <div class="presion">
          ⚠️ Presión: ${doc.presion.origen} espera que ${doc.presion.decisionEsperada === 'aprobar' ? 'APRUEBES' : 'RECHAZES'}.
        </div>
      `;
    }

    html += `
      <div class="acciones-doc">
        <button class="btn btn-aprobar" onclick="window.game.procesarDocumento(window.getDocById('${doc.id}'), 'aprobar', false)">APROBAR</button>
        <button class="btn btn-rechazar" onclick="window.game.procesarDocumento(window.getDocById('${doc.id}'), 'rechazar', false)">RECHAZAR</button>
      </div>
    `;

    el.innerHTML = html;
    cinta.appendChild(el);
  });
}

window.getDocById = function(id) {
  return window.game.estado.cola.find(d => d.id === parseFloat(id));
};

window.aceptarSoborno = function(id, decision) {
  const doc = window.game.estado.cola.find(d => d.id === parseFloat(id));
  if (doc) {
    window.game.procesarDocumento(doc, decision, true);
  }
};

function actualizarEvento() {
  const estadoJuego = window.game.estado;

  if (estadoJuego.eventoActual || estadoJuego.presionActual) {
    zonaEvento.classList.remove('oculto');

    if (estadoJuego.eventoActual) {
      eventoTitulo.textContent = estadoJuego.eventoActual.titulo;
      eventoTexto.textContent = estadoJuego.eventoActual.texto;
    } else if (estadoJuego.presionActual) {
      eventoTitulo.textContent = 'PRESIÓN POLÍTICA';
      eventoTexto.textContent = `${estadoJuego.presionActual.origen}: ${estadoJuego.presionActual.texto}`;
    }
  } else {
    zonaEvento.classList.add('oculto');
  }
}

function mostrarFeedback(texto, esCorrecto) {
  feedbackEl.textContent = texto;
  feedbackEl.className = 'feedback ' + (esCorrecto ? 'correcto' : 'error');
  setTimeout(() => {
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
  }, 2500);
}

function actualizarBarraEstado() {
  const s = window.game.estado;
  document.getElementById('dia-actual').textContent = s.dia;
  document.getElementById('doc-actual').textContent = s.documentosProcesados;
  document.getElementById('doc-total').textContent = s.documentosPorDia;
  document.getElementById('puntuacion').textContent = s.puntuacion;
  document.getElementById('reputacion').textContent = s.reputacion;
  document.getElementById('fondos').textContent = s.dinero;
}

function actualizarTemporizador() {
  const s = window.game.estado;
  const min = Math.floor(s.tiempoRestante / 60);
  const seg = s.tiempoRestante % 60;
  document.getElementById('temporizador').textContent = `Tiempo: ${min}:${seg.toString().padStart(2, '0')}`;
}

function mostrarResultado(puntuacion, aciertos, errores, reputacion, dinero, dia, erroresDetalle = [], sinProcesar = 0) {
  document.getElementById('titulo-resultado').textContent = `Fin del día ${dia}`;
  document.getElementById('stat-aciertos').textContent = aciertos;
  document.getElementById('stat-errores').textContent = errores;
  document.getElementById('stat-puntuacion').textContent = puntuacion;
  document.getElementById('stat-reputacion').textContent = reputacion;
  document.getElementById('stat-fondos').textContent = dinero;

  let mensaje = '';
  if (reputacion >= 90 && aciertos >= 8) {
    mensaje = 'Excelente jornada. Mantuviste la integridad y la eficiencia.';
  } else if (reputacion >= 70) {
    mensaje = 'Jornada aceptable, pero hubo compromisos.';
  } else if (reputacion >= 40) {
    mensaje = 'Jornada difícil. Tu reputación se ha visto afectada.';
  } else {
    mensaje = 'Jornada crítica. Se recomienda revisión ética inmediata.';
  }

  const datosCuriosos = [
    'El Consejo de Seguridad tiene 15 miembros: 5 permanentes con poder de veto y 10 no permanentes elegidos cada dos años.',
    'Solo los cinco miembros permanentes (China, Francia, Rusia, Reino Unido y Estados Unidos) tienen poder de veto sobre resoluciones no procedimentales.',
    'La presidencia del Consejo rota mensualmente entre sus miembros en orden alfabético inglés.',
    'Para aprobar una resolución se necesitan al menos 9 votos a favor y que ninguno de los cinco miembros permanentes ejerza el veto.',
    'El Consejo de Seguridad es el único órgano de la ONU con poder para adoptar decisiones vinculantes para todos los miembros.',
    'Los miembros no permanentes no tienen veto, pero su voto es necesario para alcanzar los 9 votos requeridos.',
    'El veto puede ejercerse incluso si una resolución cuenta con 14 votos a favor: basta con que un miembro permanente vote en contra.',
    'Las sanciones del Consejo de Seguridad pueden incluir embargos comerciales, congelación de bienes o restricciones de viaje.'
  ];
  const dato = datosCuriosos[Math.floor(Math.random() * datosCuriosos.length)];

  document.getElementById('mensaje-educativo').innerHTML = `<strong>${mensaje}</strong><br><br><em>Dato del día:</em> ${dato}`;

  // Informe detallado de errores y documentos sin procesar
  const informe = document.getElementById('informe-errores');
  let htmlInforme = '';

  if (sinProcesar > 0) {
    htmlInforme += `
      <div class="informe-bloque informe-advertencia">
        <strong>⏰ Documentos sin procesar: ${sinProcesar}.</strong>
        El tiempo se agotó antes de revisarlos. En el próximo día intenta priorizar los documentos urgentes.
      </div>
    `;
  }

  if (erroresDetalle.length > 0) {
    htmlInforme += `
      <div class="informe-bloque">
        <h3>❌ Errores del día (${erroresDetalle.length})</h3>
        <ul class="lista-errores">
          ${erroresDetalle.map(e => `
            <li>
              <strong>${e.tipo}</strong> de ${e.pais}.
              Decisión tomada: <strong>${e.decisionTomada === 'aprobar' ? 'APROBAR' : 'RECHAZAR'}</strong>.
              <span class="motivo-error">${e.motivo}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  } else {
    htmlInforme += `
      <div class="informe-bloque informe-exito">
        <strong>✅ Sin errores este día.</strong> Procesaste todos los documentos correctamente.
      </div>
    `;
  }

  informe.innerHTML = htmlInforme;

  mostrarPantalla('resultado');
}

// ---- Eventos globales ----

document.getElementById('btn-siguiente-dia').addEventListener('click', () => {
  window.game.siguienteDia();
});

document.getElementById('btn-volver-inicio').addEventListener('click', () => {
  mostrarPantalla('tutorial');
  if (window.tutorial) {
    window.tutorial.resetear();
  }
});

document.getElementById('btn-glosario').addEventListener('click', () => {
  if (window.game.estado.juegoActivo) {
    window.game.pausarJuego();
  }
  document.getElementById('modal-glosario').classList.remove('oculto');
});

document.getElementById('btn-cerrar-glosario').addEventListener('click', () => {
  document.getElementById('modal-glosario').classList.add('oculto');
  if (window.game.estado.juegoActivo) {
    window.game.reanudarJuego();
  }
});

document.getElementById('btn-rever-tutorial').addEventListener('click', () => {
  if (window.tutorial) {
    window.tutorial.mostrarRepaso();
  }
});

window.ui = {
  mostrarPantalla,
  renderizarCola,
  actualizarEvento,
  mostrarFeedback,
  actualizarBarraEstado,
  actualizarTemporizador,
  mostrarResultado,
  aceptarSoborno: window.aceptarSoborno
};