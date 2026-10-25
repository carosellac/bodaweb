/* =====================================================================
   DATOS DE LA QUINCEAÑERA — lo único que hay que completar para cada fiesta de 15.
   Las fotos van en la carpeta fotos/ con estos nombres (cualquier medida sirve):
   portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
   (también pueden ser .jpg: en ese caso cambiá la terminación en index.html).
   La música, si la quieren, es un archivo musica.mp3 en esta misma carpeta.
   ===================================================================== */
const DATOS = {
  modelo: 'Elegante Nocturno · 15 años',

  // Para qué evento es: 'quince' = fiesta de 15 (un solo nombre). Para un casamiento se borra esta línea.
  evento: 'quince',

  nombre1: 'Valentina',
  nombre2: '',          // en una fiesta de 15 va vacío
  iniciales: 'XV',

  // Fecha y hora de la misa (o de la fiesta, si no hay misa): año-mes-día T hora:minutos (hora argentina -03:00)
  fecha: '2027-08-21T20:00:00-03:00',
  fechaTexto: 'Sábado 21 de agosto de 2027',
  lugarCorto: 'Mendoza',

  frase: 'Una noche para brindar por mis 15 con la familia y los amigos de siempre. Te espero.',

  ceremonia: {
    hora: '20:00',
    nombre: 'Basílica de San Francisco',
    direccion: 'Necochea 201, Mendoza',
    mapa: ''            // enlace de Google Maps (opcional: si está vacío se busca por la dirección)
  },
  fiesta: {
    hora: '21:30',
    nombre: 'Salón Los Olivos',
    direccion: 'Av. Boulogne Sur Mer 1500, Mendoza',
    mapa: ''
  },

  codigoVestimenta: 'Elegante · De noche',
  confirmarHasta: '21 de julio de 2027',

  // WhatsApp al que llegan las confirmaciones: 549 + código de área sin 0 + número sin 15
  whatsapp: '',

  regalo: {
    texto: 'Compartir esta noche con vos es mi mayor regalo. Si querés hacerme un presente, te dejo los datos.',
    alias: 'VALEN.MIS15',
    cbu: '',
    titular: 'Valentina Correa'
  },

  hashtag: '#Los15DeValen',
  // Información útil (opcional): si se completa alguno, aparece una sección con esos datos. Vacíos = no aparece.
  ninos: '',          // ej. '¡Los chicos son bienvenidos!' o 'Es una fiesta para adultos'
  alojamiento: '',    // dónde dormir, si la boda es lejos
  traslado: '',       // combi o transporte. Si se completa, la confirmación pregunta quién lo usa
  menu: 'Cena de tres pasos y mesa de postres. Si tenés alguna restricción, avisame al confirmar.',           // qué se va a comer
  notas: '',          // cualquier otra cosa para tener en cuenta

  // Confirmación de asistencia (opcional)
  confirmarPorEvento: true,   // true = cada invitado marca si va a la ceremonia, a la fiesta o a las dos
  preguntarChicos: false,      // true = pregunta cuántos chicos vienen
  sugerirCanciones: true,     // false = no aparece "¿Qué canción no puede faltar?"
  compartirFotos: true,       // false = no aparece "Compartí tus fotos" con el hashtag

  // Colores: '' = los del diseño. Las otras paletas de este diseño están al final de su estilo.css
  paleta: '',

  // Panel de la quinceañera (opcional): ver cada confirmación y cada canción en /panel/. Lo activa Boda Web.
  panel: { invitacion: '' },

  // Cuántas personas se pueden anotar como máximo en la confirmación (si no se usa ?lugares= en el link)
  maxPersonas: 10,

  // Lo que dice la cuenta regresiva después de la boda (vacío = '¡Gracias por acompañarnos!')
  textoDespues: '',

  // Música de fondo (opcional): el nombre del archivo que dejaste en esta carpeta, por ejemplo 'musica.mp3'. Vacío = sin música.
  musica: '../../assets/musica-muestra.mp3',   // MUESTRA: Bach, "Air" (dominio público). Para una pareja: su archivo, o '' si no quieren música
  credito: true        // false para sacar el "Hecho con Boda Web" del pie
};
