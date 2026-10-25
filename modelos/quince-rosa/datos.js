/* =====================================================================
   DATOS DE LA QUINCEAÑERA — lo único que hay que completar para cada fiesta de 15.
   Las fotos van en la carpeta fotos/ con estos nombres (cualquier medida sirve):
   portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
   (también pueden ser .jpg: en ese caso cambiá la terminación en index.html).
   La música, si la quieren, es un archivo musica.mp3 en esta misma carpeta.
   La acuarela (fondo-rosa.webp, guirnalda.webp, filigrana.webp y esquina-1/2.webp) es parte del
   diseño: no hace falta tocarla.
   ===================================================================== */
const DATOS = {
  modelo: 'Rosas en Acuarela · 15 años',

  // Para qué evento es: 'quince' = fiesta de 15 (un solo nombre). Para un casamiento se borra esta línea.
  evento: 'quince',

  nombre1: 'Martina',
  nombre2: '',          // en una fiesta de 15 va vacío
  iniciales: 'XV',

  // Fecha y hora de la misa (o de la fiesta, si no hay misa): año-mes-día T hora:minutos (hora argentina -03:00)
  fecha: '2027-09-18T19:30:00-03:00',
  fechaTexto: 'Sábado 18 de septiembre de 2027',
  fechaCorta: 'Sábado 18 de septiembre de 2027 · 21 hs',   // la fecha de la portada, entre las dos filigranas
  lugarCorto: 'Adrogué, Buenos Aires',

  // Portada: la frase de invitación debajo de los nombres
  invitacion: 'Te invito a festejar conmigo una noche que soñé toda la vida.',

  frase: 'Quince años, mi familia y mis amigos de siempre en una sola noche. No sería lo mismo sin vos.',

  ceremonia: {
    hora: '19:30',
    nombre: 'Parroquia Nuestra Señora del Carmen',
    direccion: 'Rosales 1550, Adrogué',
    mapa: ''            // enlace de Google Maps (opcional: si está vacío se busca por la dirección)
  },
  fiesta: {
    hora: '21:00',
    nombre: 'Salón Las Glicinas',
    direccion: 'Av. Espora 2200, Adrogué',
    mapa: ''
  },

  codigoVestimenta: 'Elegante · Rosas y tonos pastel',
  confirmarHasta: '18 de agosto de 2027',

  // WhatsApp al que llegan las confirmaciones: 549 + código de área sin 0 + número sin 15
  whatsapp: '',

  regalo: {
    texto: 'Lo más lindo es que vengas. Si además querés hacerme un regalo, te dejo los datos.',
    alias: 'MARTU.MIS15',
    cbu: '',
    titular: 'Martina Rossi'
  },

  hashtag: '#Los15DeMartu',
  // Información útil (opcional): si se completa alguno, aparece una sección con esos datos. Vacíos = no aparece.
  ninos: '',          // ej. '¡Los chicos son bienvenidos!' o 'Es una fiesta para adultos'
  alojamiento: '',    // dónde dormir, si la boda es lejos
  traslado: '',       // combi o transporte. Si se completa, la confirmación pregunta quién lo usa
  menu: 'Cena de tres pasos y mesa de postres a la medianoche. Si sos celíaco o vegetariano, avisá al confirmar.',           // qué se va a comer
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
