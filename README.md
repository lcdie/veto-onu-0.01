# VETO: Oficina de Resoluciones de la ONU

Minijuego web educativo sobre el Consejo de Seguridad de la ONU (CSNU), estilo *Papers, Please*.

## 🎮 Cómo jugar (para cualquier persona con internet)

No necesitas instalar nada. El juego está listo para subir a un hosting gratuito y funcionar en cualquier navegador.

### Opción 1: Netlify Drop (más fácil, sin cuenta)

1. Descarga los archivos de este proyecto (o el archivo `veto-onu.zip` si lo tienes).
2. Ve a: https://app.netlify.com/drop
3. Arrastra la carpeta `veto-onu` (o descomprime el ZIP y arrastra la carpeta resultante) al área marcada en la página.
4. En segundos te dará una URL pública (ejemplo: `https://tu-juego.netlify.app`).
5. Comparte esa URL con quien quieras: cualquiera con internet podrá abrirla y jugar.

### Opción 2: GitHub Pages (permanente, requiere cuenta gratuita)

1. Crea una cuenta en https://github.com
2. Crea un repositorio nuevo (ejemplo: `veto-onu`).
3. Sube los archivos: `index.html`, `css/style.css` y los archivos de `js/`.
4. Ve a **Settings** → **Pages**.
5. En "Build and deployment", selecciona rama `main` y carpeta `/ (root)`.
6. Guarda y espera un minuto. Tendrás una URL tipo `https://tu-usuario.github.io/veto-onu/`.

## 📁 Estructura de archivos

```
veto-onu/
├── index.html          # Juego + tutorial interactivo inicial + glosario
├── tutorial.html       # Redirige al tutorial integrado
├── css/style.css
├── js/
│   ├── rules.js        # Datos y reglas del CSNU
│   ├── documents.js    # Generador de documentos
│   ├── game.js         # Motor del juego (pausa, puntuación, informe)
│   ├── ui.js           # Renderizado, glosario e interfaz
│   └── tutorial.js     # Tutorial interactivo de 13 pasos
└── README.md
```

## 🎓 Tutorial interactivo (13 pasos)

Al abrir la web, lo primero que aparece es una sesión completa que explica desde cero:

1. Bienvenido a la ONU (qué es la ONU y qué es el Consejo de Seguridad)
2. Los 15 miembros del Consejo (5 permanentes con poder de veto + 10 no permanentes)
3. ¿Qué es una resolución?
4. El veto en detalle (con ejemplo y dato histórico)
5. Glosario completo de términos
6. Los documentos que revisarás
7. Cómo revisar un documento (con ejemplos válido e inválido)
8. Cómo se juega (interfaz, temporizador, documentos urgentes)
9. Sobornos: dinero y ética
10. Presiones políticas y eventos aleatorios
11. Consecuencias de tus decisiones
12. Práctica interactiva: decide tú mismo con un documento de ejemplo
13. ¡Todo listo! Resumen y botón para empezar

El tutorial puede saltarse con el botón "Saltar tutorial" y repasarse durante la partida con el botón "🎓 Tutorial" (el juego se pausa mientras lo lees).

## 📖 Glosario durante el juego

El botón "📖 Glosario" abre 11 términos explicados: ONU, Consejo de Seguridad, resolución, veto, miembro permanente, miembro no permanente, sanción, credenciales, cable diplomático, quórum y conflicto directo.

## ℹ️ Sobre el juego

Eres un funcionario administrativo del Consejo de Seguridad de la ONU. Tu trabajo es revisar documentos y decidir si se aprueban o rechazan.

Características del modo avanzado:
- Hasta 4 documentos simultáneos en pantalla
- 12 documentos por día y 3 minutos de tiempo
- Sobornos, presiones políticas y eventos aleatorios
- Reputación, fondos y puntuación
- Informe detallado de errores al final de cada día
- Pausa automática al abrir el tutorial o el glosario

Datos reales incluidos:
- 15 miembros del CSNU: 5 permanentes con poder de veto + 10 no permanentes
- Miembros permanentes con poder de veto: China, Francia, Rusia, Reino Unido y Estados Unidos
- Reglas de membresía, veto, fechas y conflicto directo

¡Listo para jugar desde cualquier navegador con internet!
