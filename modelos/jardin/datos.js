/* =====================================================================
   DATOS DE LA PAREJA — lo único que hay que completar para cada casamiento.
   Las fotos van en la carpeta fotos/ con estos nombres (cualquier medida sirve):
   portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
   (también pueden ser .jpg: en ese caso cambiá la terminación en index.html).
   La música, si la quieren, es un archivo musica.mp3 en esta misma carpeta.
   ===================================================================== */
const DATOS = {
  modelo: 'Jardín en Acuarela',

  nombre1: 'Martina',
  nombre2: 'Lucas',
  iniciales: 'M & L',

  // Fecha y hora de la ceremonia: año-mes-día T hora:minutos (hora argentina -03:00)
  fecha: '2027-10-16T16:30:00-03:00',
  fechaTexto: 'Sábado 16 de octubre de 2027',
  lugarCorto: 'Cañuelas, Buenos Aires',

  frase: 'Un día de primavera, un jardín lleno de flores y la gente que más queremos. ¡Nos casamos!',

  ceremonia: {
    hora: '16:30',
    nombre: 'Capilla de la Estancia Villa María',
    direccion: 'Ruta 6 km 165, Máximo Paz, Cañuelas',
    mapa: ''            // enlace de Google Maps (opcional: si está vacío se busca por la dirección)
  },
  fiesta: {
    hora: '18:00',
    nombre: 'Jardines de la Estancia',
    direccion: 'Ruta 6 km 165, Máximo Paz, Cañuelas',
    mapa: ''
  },

  codigoVestimenta: 'Elegante de día · Colores claros · El pasto no perdona los tacos finos',
  confirmarHasta: '15 de septiembre de 2027',

  // WhatsApp al que llegan las confirmaciones: 549 + código de área sin 0 + número sin 15
  whatsapp: '',

  regalo: {
    texto: 'Tu compañía es lo que más deseamos. Si además querés regalarnos algo, nos ayudás con nuestra casita nueva.',
    alias: 'MARTU.LUCAS.CASA',
    cbu: '',
    titular: 'Martina López'
  },

  hashtag: '#MartuYLucas',
  // Información útil (opcional): si se completa alguno, aparece una sección con esos datos. Vacíos = no aparece.
  ninos: '',          // ej. '¡Los chicos son bienvenidos!' o 'Es una fiesta para adultos'
  alojamiento: '',    // dónde dormir, si la boda es lejos
  traslado: 'Sale una combi desde Plaza Italia a las 15:15 y vuelve a la ciudad al terminar la fiesta.',       // combi o transporte. Si se completa, la confirmación pregunta quién lo usa
  menu: '',           // qué se va a comer
  notas: '',          // cualquier otra cosa para tener en cuenta

  // Confirmación de asistencia (opcional)
  confirmarPorEvento: false,   // true = cada invitado marca si va a la ceremonia, a la fiesta o a las dos
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
