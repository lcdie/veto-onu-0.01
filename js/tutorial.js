/**
 * tutorial.js
 * Tutorial interactivo y detallado para el minijuego VETO.
 * Explica desde cero todos los conceptos del CSNU, la jugabilidad
 * y las consecuencias de las decisiones, con una práctica final.
 */

const PASOS_TUTORIAL = [
  {
    titulo: 'Bienvenido a la ONU',
    contenido: `
      <p class="tutorial-intro">
        Antes de empezar a jugar, vamos a explicarte todo lo necesario.
        <strong>No necesitas saber nada de la ONU</strong>: esta sesión te enseña los conceptos paso a paso.
      </p>
      <div class="concepto-clave">
        <h3>¿Qué es la ONU?</h3>
        <p>
          La <strong>Organización de las Naciones Unidas (ONU)</strong> es una organización internacional
          creada en 1945, después de la Segunda Guerra Mundial, para mantener la paz, proteger los derechos
          humanos y fomentar la cooperación entre los países. Casi todos los países del mundo son miembros.
        </p>
      </div>
      <div class="concepto-clave">
        <h3>¿Qué es el Consejo de Seguridad?</h3>
        <p>
          El <strong>Consejo de Seguridad de las Naciones Unidas (CSNU)</strong> es el órgano de la ONU
          encargado de <strong>mantener la paz y la seguridad internacionales</strong>. Es el único órgano
          de la ONU cuyas decisiones son <strong>obligatorias</strong> para todos los países miembros.
          Puede imponer sanciones, autorizar misiones de paz y declarar que existe una amenaza a la paz.
        </p>
      </div>
      <div class="concepto-clave">
        <h3>¿Qué harás en este juego?</h3>
        <p>
          Serás un funcionario administrativo de la oficina de documentos del Consejo de Seguridad.
          Cada día llegarán documentos a tu escritorio y deberás decidir si se <strong>APRUEBAN</strong>
          o se <strong>RECHAZAN</strong> según las reglas que aprenderás en esta sesión.
        </p>
      </div>
    `
  },
  {
    titulo: 'Los 15 miembros del Consejo',
    contenido: `
      <p class="tutorial-intro">
        El Consejo de Seguridad no incluye a todos los países del mundo: tiene exactamente
        <strong>15 miembros</strong>, divididos en dos categorías.
      </p>
      <div class="concepto-clave">
        <h3>Los 5 miembros permanentes con poder de veto</h3>
        <p>
          Son <strong>China, Francia, Rusia, Reino Unido y Estados Unidos</strong>.
          Pertenecen siempre al Consejo y tienen un poder especial llamado <strong>veto</strong>:
          pueden bloquear una resolución aunque todos los demás miembros voten a favor.
        </p>
      </div>
      <div class="concepto-clave">
        <h3>Los 10 miembros no permanentes</h3>
        <p>
          Son elegidos por la Asamblea General para periodos de <strong>dos años</strong>.
          Rotan con el tiempo y <strong>no tienen poder de veto</strong>.
          En este juego, los miembros no permanentes son los del periodo 2026-2027:
          Argelia, Dinamarca, Grecia, Guyana, Pakistán, Panamá, República de Corea,
          Sierra Leona, Eslovenia y Somalia.
        </p>
      </div>
      <div class="dato-tutorial">
        <strong>Regla de los 9 votos:</strong> para aprobar una resolución se necesitan al menos
        <strong>9 votos a favor</strong> y que <strong>ningún miembro permanente ejerza el veto</strong>.
        Los miembros no permanentes no pueden vetar, pero sus votos son necesarios para alcanzar los 9.
      </div>
    `
  },
  {
    titulo: '¿Qué es una resolución?',
    contenido: `
      <div class="concepto-clave">
        <h3>Resolución</h3>
        <p>
          Una <strong>resolución</strong> es una decisión oficial del Consejo de Seguridad.
          Puede ordenar un alto el fuego, imponer sanciones económicas, autorizar una misión de paz
          o declarar que un conflicto representa una amenaza para la paz mundial.
        </p>
      </div>
      <div class="concepto-clave">
        <h3>¿Cómo se aprueba?</h3>
        <p>
          Primero se presenta un proyecto de resolución. Luego los 15 miembros votan.
          La resolución se aprueba si obtiene al menos <strong>9 votos a favor</strong>
          y <strong>ningún miembro permanente vota en contra</strong> (es decir, ningún veto).
        </p>
      </div>
      <div class="concepto-clave">
        <h3>¿Qué pasa si se aprueba?</h3>
        <p>
          Todos los países miembros de la ONU están obligados a cumplirla.
          Por eso el Consejo de Seguridad es tan importante: sus decisiones tienen fuerza legal internacional.
        </p>
      </div>
      <div class="dato-tutorial">
        <strong>Ejemplo:</strong> si 14 países votan a favor de una resolución pero uno de los
        cinco miembros permanentes vota en contra, la resolución queda bloqueada por el veto.
      </div>
    `
  },
  {
    titulo: 'El veto en detalle',
    contenido: `
      <div class="concepto-clave">
        <h3>¿Qué es el veto?</h3>
        <p>
          El <strong>veto</strong> es el poder que tienen los <strong>cinco miembros permanentes</strong>
          del Consejo de Seguridad para <strong>bloquear una resolución</strong>, incluso si todos los demás
          miembros votan a favor. Basta con que uno solo de ellos vote en contra.
        </p>
      </div>
      <div class="concepto-clave">
        <h3>¿Quiénes tienen el veto?</h3>
        <p>
          Solo los cinco miembros permanentes: <strong>China, Francia, Rusia, Reino Unido y Estados Unidos</strong>.
          Ningún miembro no permanente tiene este poder.
        </p>
      </div>
      <div class="concepto-clave">
        <h3>Un ejemplo para entenderlo</h3>
        <p>
          Imagina que se propone una resolución para imponer sanciones a un país.
          Los 14 miembros restantes votan a favor, pero Rusia vota en contra.
          Como Rusia es miembro permanente, su voto negativo es un veto:
          <strong>la resolución no se aprueba</strong>.
        </p>
      </div>
      <div class="dato-tutorial">
        <strong>Importante:</strong> el veto solo se aplica a cuestiones sustantivas (por ejemplo, sanciones
        o intervenciones). No se aplica a cuestiones de procedimiento, como el orden del día de una reunión.
      </div>
      <div class="dato-tutorial">
        <strong>Dato histórico:</strong> el veto se ha usado cientos de veces desde 1945.
        Es uno de los temas más debatidos de la ONU, porque puede paralizar decisiones importantes
        aunque haya una amplia mayoría a favor.
      </div>
    `
  },
  {
    titulo: 'Glosario de términos',
    contenido: `
      <p class="tutorial-intro">
        Estos son todos los términos que aparecerán durante el juego. Guárdalos: los necesitarás para decidir.
      </p>
      <dl class="glosario-lista">
        <dt>ONU</dt>
        <dd>Organización de las Naciones Unidas. Organización internacional creada en 1945 para mantener la paz y la cooperación entre países.</dd>
        <dt>Consejo de Seguridad (CSNU)</dt>
        <dd>Órgano de la ONU encargado de mantener la paz y la seguridad internacionales. Sus decisiones son obligatorias para todos los países miembros.</dd>
        <dt>Resolución</dt>
        <dd>Decisión oficial del Consejo de Seguridad. Necesita al menos 9 votos a favor y ningún veto de un miembro permanente.</dd>
        <dt>Veto</dt>
        <dd>Poder de los cinco miembros permanentes para bloquear una resolución, incluso si los demás votan a favor.</dd>
        <dt>Miembro permanente</dt>
        <dd>País que pertenece siempre al Consejo de Seguridad: China, Francia, Rusia, Reino Unido y Estados Unidos. Tiene poder de veto.</dd>
        <dt>Miembro no permanente</dt>
        <dd>País elegido por dos años para formar parte del Consejo. No tiene poder de veto.</dd>
        <dt>Sanción</dt>
        <dd>Medida punitiva contra un país o entidad: embargo comercial, congelación de bienes o restricciones de viaje.</dd>
        <dt>Credenciales</dt>
        <dd>Documento que acredita a un embajador para representar a su país ante el Consejo de Seguridad.</dd>
        <dt>Cable diplomático</dt>
        <dd>Mensaje oficial entre un gobierno y la ONU sobre un asunto de política internacional.</dd>
        <dt>Quórum</dt>
        <dd>Número mínimo de miembros presentes para que el Consejo pueda tomar decisiones.</dd>
        <dt>Conflicto directo</dt>
        <dd>Situación en la que un país está involucrado activamente en un enfrentamiento armado. En el juego, un país en conflicto directo no puede proponer sanciones.</dd>
      </dl>
    `
  },
  {
    titulo: 'Los documentos que revisarás',
    contenido: `
      <p class="tutorial-intro">En tu escritorio llegarán cinco tipos de documentos. Cada uno tiene reglas distintas:</p>
      <table class="tabla-tutorial">
        <thead>
          <tr><th>Documento</th><th>Qué es</th><th>Cuándo es válido</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Solicitud de resolución</strong></td>
            <td>Propuesta formal para que el Consejo vote una resolución sobre paz o seguridad.</td>
            <td>El país debe ser miembro del Consejo y la fecha debe estar vigente.</td>
          </tr>
          <tr>
            <td><strong>Notificación de veto</strong></td>
            <td>Aviso de que un miembro permanente bloqueará una resolución.</td>
            <td>Solo los cinco miembros permanentes con poder de veto pueden notificar un veto.</td>
          </tr>
          <tr>
            <td><strong>Credenciales de embajador</strong></td>
            <td>Documento que acredita a un embajador ante el Consejo.</td>
            <td>El país debe ser miembro del Consejo y la fecha debe estar vigente.</td>
          </tr>
          <tr>
            <td><strong>Cable diplomático</strong></td>
            <td>Mensaje oficial entre un gobierno y la ONU.</td>
            <td>El país debe ser miembro del Consejo y la fecha debe estar vigente.</td>
          </tr>
          <tr>
            <td><strong>Propuesta de sanción</strong></td>
            <td>Medida punitiva contra un país o entidad.</td>
            <td>El país debe ser miembro, la fecha vigente y no estar en conflicto directo.</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    titulo: 'Cómo revisar un documento',
    contenido: `
      <p class="tutorial-intro">Cada documento muestra varios campos. Debes revisarlos en este orden:</p>
      <ol class="lista-pasos">
        <li><strong>País remitente:</strong> ¿es uno de los 15 miembros del Consejo este año? Si no lo es, el documento es inválido.</li>
        <li><strong>¿Tiene poder de veto?:</strong> solo los cinco miembros permanentes lo tienen. Si un país sin veto presenta una notificación de veto, es inválido.</li>
        <li><strong>Fecha:</strong> debe estar entre 2025 y 2027. Si está fuera de ese rango, el documento ha expirado o no es válido.</li>
        <li><strong>Tipo de documento y conflicto:</strong> si es una propuesta de sanción y el país está en conflicto directo, es inválida.</li>
      </ol>
      <div class="dato-tutorial">
        <strong>Resumen de validez:</strong> un documento es válido si el país es miembro del Consejo,
        la fecha está vigente y el tipo de documento corresponde a un poder que ese país realmente tiene.
      </div>
      <div class="ejemplo-doc">
        <h3>Ejemplo de documento INVÁLIDO</h3>
        <p><strong>Tipo:</strong> Notificación de veto</p>
        <p><strong>País:</strong> Brasil</p>
        <p><strong>¿Es miembro del Consejo?:</strong> NO</p>
        <p><strong>¿Tiene poder de veto?:</strong> NO</p>
        <p><strong>Fecha:</strong> 15/03/2026</p>
        <p class="motivo-invalido">→ Debe RECHAZARSE: Brasil no es miembro del Consejo y no tiene poder de veto.</p>
      </div>
      <div class="ejemplo-doc valido">
        <h3>Ejemplo de documento VÁLIDO</h3>
        <p><strong>Tipo:</strong> Solicitud de resolución</p>
        <p><strong>País:</strong> Francia</p>
        <p><strong>¿Es miembro del Consejo?:</strong> SÍ</p>
        <p><strong>¿Tiene poder de veto?:</strong> SÍ</p>
        <p><strong>Fecha:</strong> 22/04/2026</p>
        <p class="motivo-valido">→ Debe APROBARSE: Francia es miembro permanente y la fecha está vigente.</p>
      </div>
    `
  },
  {
    titulo: 'Cómo se juega',
    contenido: `
      <p class="tutorial-intro">Así funciona la pantalla del juego:</p>
      <ol class="lista-pasos">
        <li><strong>Barra de estado:</strong> muestra el día, los documentos procesados, tu puntuación, tu reputación, tus fondos y el tiempo restante.</li>
        <li><strong>Panel de reglas:</strong> recuerda las reglas básicas en todo momento.</li>
        <li><strong>Cinta de documentos:</strong> verás hasta 4 documentos al mismo tiempo. Cada uno muestra su tipo, descripción, país, membresía, poder de veto, fecha y lo que debes revisar.</li>
        <li><strong>Botones APROBAR y RECHAZAR:</strong> úsalos para procesar cada documento según las reglas.</li>
        <li><strong>Temporizador:</strong> tienes <strong>3 minutos por día</strong> para procesar <strong>12 documentos</strong>.</li>
        <li><strong>Glosario:</strong> el botón "📖 Glosario" abre todos los términos cuando los necesites.</li>
      </ol>
      <div class="dato-tutorial">
        <strong>Documentos urgentes:</strong> los que tienen borde dorado y la etiqueta "⚠ URGENTE"
        deben atenderse primero para no quedarte sin tiempo.
      </div>
      <div class="dato-tutorial">
        <strong>Consejo:</strong> no aprobarás todo ni rechazarás todo. Lee cada documento y decide según
        la membresía, el poder de veto, la fecha y el tipo.
      </div>
    `
  },
  {
    titulo: 'Sobornos: dinero y ética',
    contenido: `
      <div class="concepto-clave">
        <h3>💰 ¿Qué es un soborno?</h3>
        <p>
          Algunos documentos incluyen una oferta de dinero para que decidas a favor de los intereses
          del remitente. Es una tentación: el dinero es real dentro del juego, pero tiene un costo.
        </p>
      </div>
      <div class="concepto-clave">
        <h3>Consecuencias de aceptar</h3>
        <p>
          Si aceptas un soborno:
        </p>
        <ul>
          <li>Ganas <strong>fondos</strong> (dinero para tu personaje).</li>
          <li>Pierdes <strong>20 puntos</strong> de puntuación.</li>
          <li>Pierdes <strong>15 puntos de reputación</strong>.</li>
        </ul>
        <p>
          Aceptar sobornos repetidamente puede arruinar tu reputación y tu evaluación final del día.
        </p>
      </div>
      <div class="dato-tutorial">
        <strong>Decisión ética:</strong> el juego no te obliga a aceptar sobornos.
        Rechazarlos mantiene tu reputación alta y demuestra integridad.
      </div>
    `
  },
  {
    titulo: 'Presiones políticas y eventos',
    contenido: `
      <div class="concepto-clave">
        <h3>⚠️ Presiones políticas</h3>
        <p>
          Embajadores, oficinas diplomáticas o miembros del Consejo pueden pedirte una decisión concreta.
          Si tu decisión coincide con lo que esperan, ganas una pequeña bonificación de reputación (+2).
          Si no coincides, no hay penalización directa, pero podrías perder una oportunidad.
        </p>
      </div>
      <div class="concepto-clave">
        <h3>🎲 Eventos aleatorios</h3>
        <p>
          Al inicio de cada día pueden ocurrir eventos que cambian las condiciones:
        </p>
        <ul>
          <li><strong>Cambio de reglas:</strong> los documentos urgentes tienen prioridad absoluta.</li>
          <li><strong>Crisis diplomática:</strong> debes revisar con extremo cuidado los documentos de zonas en conflicto.</li>
          <li><strong>Inspección interna:</strong> la Oficina de Ética revisa tu trabajo; los sobornos aceptados serán penalizados con -50 puntos.</li>
          <li><strong>Presión de un miembro permanente:</strong> uno de los cinco países con veto espera que su documento se trate con prioridad.</li>
        </ul>
      </div>
      <div class="dato-tutorial">
        <strong>Importante:</strong> los eventos duran varios turnos. Lee siempre el aviso rojo en la parte
        superior de la pantalla para saber qué está pasando.
      </div>
    `
  },
  {
    titulo: 'Consecuencias de tus decisiones',
    contenido: `
      <p class="tutorial-intro">Cada decisión tiene un efecto inmediato y otro a largo plazo:</p>
      <table class="tabla-tutorial">
        <thead>
          <tr><th>Decisión</th><th>Efecto inmediato</th><th>Efecto a largo plazo</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>✅ Acierto</td>
            <td>+15 puntos, +1 reputación</td>
            <td>Mejor evaluación y puntuación final.</td>
          </tr>
          <tr>
            <td>❌ Error</td>
            <td>-10 puntos, -2 reputación</td>
            <td>Acumular errores puede provocar crisis diplomáticas.</td>
          </tr>
          <tr>
            <td>💰 Aceptar soborno</td>
            <td>+dinero, -20 puntos, -15 reputación</td>
            <td>Reputación baja afecta tu evaluación final.</td>
          </tr>
          <tr>
            <td>⚠️ Seguir una presión política</td>
            <td>+2 reputación</td>
            <td>Pequeña mejora de tu evaluación.</td>
          </tr>
          <tr>
            <td>⏰ Tiempo agotado</td>
            <td>El día termina</td>
            <td>Los documentos pendientes cuentan como no procesados.</td>
          </tr>
          <tr>
            <td>🏆 Día completo con buena reputación</td>
            <td>+5 reputación</td>
            <td>Mejores resultados en los días siguientes.</td>
          </tr>
        </tbody>
      </table>
      <div class="niveles-reputacion">
        <h3>Niveles de reputación final:</h3>
        <ul>
          <li><strong>90-100:</strong> Excelente jornada. Integridad y eficiencia.</li>
          <li><strong>70-89:</strong> Jornada aceptable, con algunos compromisos.</li>
          <li><strong>40-69:</strong> Jornada difícil. Tu reputación se vio afectada.</li>
          <li><strong>0-39:</strong> Jornada crítica. Revisión ética inmediata.</li>
        </ul>
      </div>
    `
  },
  {
    titulo: 'Práctica: decide tú mismo',
    contenido: `
      <p class="tutorial-intro">
        Antes de empezar, prueba con este documento de ejemplo. Lee los campos y decide si se aprueba o se rechaza.
      </p>
      <div class="documento-practica">
        <h3>Notificación de veto</h3>
        <p><strong>País remitente:</strong> Brasil</p>
        <p><strong>¿Es miembro del Consejo?:</strong> NO</p>
        <p><strong>¿Tiene poder de veto?:</strong> NO</p>
        <p><strong>Fecha del documento:</strong> 15/03/2026</p>
        <p><strong>Qué debes revisar:</strong> solo los cinco miembros permanentes con poder de veto pueden notificar un veto.</p>
      </div>
      <div class="practica-botones">
        <button class="btn btn-aprobar" data-practica="aprobar">APROBAR</button>
        <button class="btn btn-rechazar" data-practica="rechazar">RECHAZAR</button>
      </div>
      <div id="practica-feedback" class="feedback"></div>
    `
  },
  {
    titulo: '¡Todo listo!',
    contenido: `
      <div class="fin-tutorial">
        <p>Ya conoces los conceptos básicos del Consejo de Seguridad de la ONU y sabes cómo jugar.</p>
        <div class="resumen-tutorial">
          <h3>Resumen rápido</h3>
          <ul>
            <li><strong>15 miembros:</strong> 5 permanentes con poder de veto + 10 no permanentes.</li>
            <li><strong>Veto:</strong> solo los cinco miembros permanentes pueden bloquear una resolución.</li>
            <li><strong>Resolución:</strong> necesita al menos 9 votos a favor y ningún veto.</li>
            <li><strong>Documento válido:</strong> país miembro + fecha vigente + tipo correcto.</li>
            <li><strong>Tu objetivo:</strong> aprobar o rechazar correctamente, cuidar tu reputación y resistir sobornos.</li>
          </ul>
        </div>
        <p class="recordatorio">
          Cuando estés listo, presiona el botón para comenzar tu primer día en la oficina.
        </p>
      </div>
    `
  }
];

let pasoActual = 0;
let modoRepaso = false;

const tutorialTitulo = document.getElementById('tutorial-titulo');
const tutorialCuerpo = document.getElementById('tutorial-cuerpo');
const tutorialProgreso = document.getElementById('tutorial-progreso');
const btnAnterior = document.getElementById('btn-tutorial-anterior');
const btnSiguiente = document.getElementById('btn-tutorial-siguiente');
const btnSaltar = document.getElementById('btn-tutorial-saltar');

function renderizarPaso() {
  const paso = PASOS_TUTORIAL[pasoActual];
  tutorialTitulo.textContent = paso.titulo;
  tutorialCuerpo.innerHTML = paso.contenido;
  tutorialProgreso.textContent = `Paso ${pasoActual + 1} de ${PASOS_TUTORIAL.length}`;

  btnAnterior.style.visibility = pasoActual === 0 ? 'hidden' : 'visible';

  if (pasoActual === PASOS_TUTORIAL.length - 1) {
    btnSiguiente.textContent = '¡Empezar a jugar!';
    btnSiguiente.classList.remove('btn-principal');
    btnSiguiente.classList.add('btn-empezar-tutorial');
  } else {
    btnSiguiente.textContent = 'Siguiente →';
    btnSiguiente.classList.remove('btn-empezar-tutorial');
    btnSiguiente.classList.add('btn-principal');
  }

  // Práctica interactiva del paso 12
  if (pasoActual === 11) {
    const botones = tutorialCuerpo.querySelectorAll('[data-practica]');
    botones.forEach(btn => {
      btn.addEventListener('click', () => {
        const decision = btn.getAttribute('data-practica');
        const feedback = document.getElementById('practica-feedback');
        if (decision === 'rechazar') {
          feedback.textContent = '✅ ¡Correcto! Brasil no es miembro del Consejo y no tiene poder de veto, así que la notificación es inválida.';
          feedback.className = 'feedback correcto';
        } else {
          feedback.textContent = '❌ Incorrecto. Brasil no es miembro del Consejo ni tiene poder de veto, así que no puede notificar un veto.';
          feedback.className = 'feedback error';
        }
        // Deshabilitar botones tras responder
        botones.forEach(b => b.disabled = true);
      });
    });
  }
}

function irAlSiguientePaso() {
  if (pasoActual < PASOS_TUTORIAL.length - 1) {
    pasoActual++;
    renderizarPaso();
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
  } else {
    iniciarJuegoDesdeTutorial();
  }
}

function irAlAnteriorPaso() {
  if (pasoActual > 0) {
    pasoActual--;
    renderizarPaso();
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
  }
}

function iniciarJuegoDesdeTutorial() {
  document.getElementById('pantalla-tutorial').classList.remove('activa');
  document.getElementById('pantalla-juego').classList.add('activa');

  if (modoRepaso) {
    // Volver al juego en curso sin reiniciarlo
    modoRepaso = false;
    window.game.reanudarJuego();
    window.ui.actualizarBarraEstado();
    window.ui.actualizarTemporizador();
    window.ui.renderizarCola();
  } else {
    window.game.iniciarPartida();
  }
}

function saltarTutorial() {
  iniciarJuegoDesdeTutorial();
}

/**
 * Muestra el tutorial como repaso durante una partida, pausando el juego.
 */
function mostrarRepaso() {
  modoRepaso = true;
  if (window.game.estado.juegoActivo) {
    window.game.pausarJuego();
  }
  pasoActual = 0;
  renderizarPaso();
  window.ui.mostrarPantalla('tutorial');
  try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
}

btnSiguiente.addEventListener('click', irAlSiguientePaso);
btnAnterior.addEventListener('click', irAlAnteriorPaso);
btnSaltar.addEventListener('click', saltarTutorial);

renderizarPaso();

window.tutorial = {
  iniciarJuegoDesdeTutorial,
  mostrarRepaso,
  resetear: () => {
    pasoActual = 0;
    renderizarPaso();
  }
};