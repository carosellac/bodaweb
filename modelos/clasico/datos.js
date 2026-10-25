/* =====================================================================
   DATOS DE LA PAREJA — lo único que hay que completar para cada casamiento.
   Las fotos van en la carpeta fotos/ con estos nombres (cualquier medida sirve):
   portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
   (también pueden ser .jpg: en ese caso cambiá la terminación en index.html).
   La música, si la quieren, es un archivo musica.mp3 en esta misma carpeta.
   ===================================================================== */
const DATOS = {
  modelo: 'Clásico & Romántico',

  nombre1: 'Valentina',
  nombre2: 'Nicolás',
  iniciales: 'V & N',

  // Fecha y hora de la ceremonia: año-mes-día T hora:minutos (hora argentina -03:00)
  fecha: '2027-04-17T17:00:00-03:00',
  fechaTexto: 'Sábado 17 de abril de 2027',
  lugarCorto: 'Buenos Aires',

  frase: 'Con la bendición de nuestras familias, tenemos el honor de invitarlos a celebrar nuestro casamiento.',

  ceremonia: {
    hora: '17:00',
    nombre: 'Basílica Nuestra Señora del Pilar',
    direccion: 'Junín 1904, Recoleta, Ciudad de Buenos Aires',
    mapa: ''            // enlace de Google Maps (opcional: si está vacío se busca por la dirección)
  },
  fiesta: {
    hora: '19:30',
    nombre: 'Palacio Sans Souci',
    direccion: 'Av. del Libertador 1190, Victoria, San Fernando',
    mapa: ''
  },

  codigoVestimenta: 'Elegante · Formal',
  confirmarHasta: '20 de marzo de 2027',

  // WhatsApp al que llegan las confirmaciones: 549 + código de área sin 0 + número sin 15
  whatsapp: '',

  regalo: {
    texto: 'Su presencia es nuestro mejor regalo. Si además quieren ayudarnos con nuestra luna de miel, les dejamos nuestros datos.',
    alias: 'VALEN.NICO.BODA',
    cbu: '',
    titular: 'Valentina Suárez'
  },

  hashtag: '#ValenYNico',
  // Información útil (opcional): si se completa alguno, aparece una sección con esos datos. Vacíos = no aparece.
  ninos: '',          // ej. '¡Los chicos son bienvenidos!' o 'Es una fiesta para adultos'
  alojamiento: '',    // dónde dormir, si la boda es lejos
  traslado: '',       // combi o transporte. Si se completa, la confirmación pregunta quién lo usa
  menu: '',           // qué se va a comer
  notas: '',          // cualquier otra cosa para tener en cuenta

  // Confirmación de asistencia (opcional)
  confirmarPorEvento: true,   // true = cada invitado marca si va a la ceremonia, a la fiesta o a las dos
  preguntarChicos: false,      // true = pregunta cuántos chicos vienen
  sugerirCanciones: true,     // false = no aparece "¿Qué canción no puede faltar?"
  compartirFotos: true,       // false = no aparece "Compartí tus fotos" con el hashtag

  // Colores: '' = los del diseño. Las otras paletas de este diseño están al final de su estilo.css
  paleta: '',

  // Panel de los novios (opcional): ver cada confirmación y cada canción en /panel/. Lo activa Boda Web.
  panel: { invitacion: '' },

  // Cuántas personas se pueden anotar como máximo en la confirmación (si no se usa ?lugares= en el link)
  maxPersonas: 10,

  // Lo que dice la cuenta regresiva después de la boda (vacío = '¡Gracias por acompañarnos!')
  textoDespues: '',

  // Música de fondo (opcional): el nombre del archivo que dejaste en esta carpeta, por ejemplo 'musica.mp3'. Vacío = sin música.
  musica: '../../assets/musica-muestra.mp3',   // MUESTRA: Bach, "Air" (dominio público). Para una pareja: su archivo, o '' si no quieren música
  credito: true        // false para sacar el "Hecho con Boda Web" del pie
};
