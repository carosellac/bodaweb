/* =====================================================================
   DATOS DE LA PAREJA — lo único que hay que completar para cada casamiento.
   Las fotos van en la carpeta fotos/ con estos nombres (cualquier medida sirve):
   portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
   (también pueden ser .jpg: en ese caso cambiá la terminación en index.html).
   La música, si la quieren, es un archivo musica.mp3 en esta misma carpeta.
   Las flores (arriba-*.webp, abajo.webp, marco-foto.webp y esquina-1/2.webp) son parte del diseño:
   no hace falta tocarlas.
   ===================================================================== */
const DATOS = {
  modelo: 'Rosas Bordó y Dorado',

  nombre1: 'Rocío',
  nombre2: 'Gonzalo',
  iniciales: 'R & G',

  // Fecha y hora de la ceremonia: año-mes-día T hora:minutos (hora argentina -03:00)
  fecha: '2027-11-27T19:00:00-03:00',
  fechaTexto: 'Sábado 27 de noviembre de 2027',
  // El calendario de la portada: día de la semana, número, mes y hora
  fechaDia: 'Sábado',
  fechaNumero: '27',
  fechaMes: 'Noviembre',
  fechaHora: 'A las 19 hs',
  lugarCorto: 'Cafayate, Salta',

  // Portada: el título dorado, la frase de invitación y el saludo final
  titulo1: 'Nos Casamos',
  invitacion: 'Este día tan especial queremos pasarlo junto a las personas que más queremos.',
  mensaje: '¡Te esperamos!',

  frase: 'Entre viñedos y cerros de colores, con una copa de tinto en la mano. Queremos brindar con vos.',

  ceremonia: {
    hora: '19:00',
    nombre: 'Catedral de Cafayate',
    direccion: 'Rivadavia 55, Cafayate',
    mapa: ''            // enlace de Google Maps (opcional: si está vacío se busca por la dirección)
  },
  fiesta: {
    hora: '21:00',
    nombre: 'Finca Las Nubes',
    direccion: 'Camino al Divisadero km 3, Cafayate',
    mapa: ''
  },

  codigoVestimenta: 'Elegante · Bordó, dorado y tonos tierra',
  confirmarHasta: '27 de octubre de 2027',

  // WhatsApp al que llegan las confirmaciones: 549 + código de área sin 0 + número sin 15
  whatsapp: '',

  regalo: {
    texto: 'Que vengas es el mejor regalo. Si además querés ayudarnos con nuestra luna de miel, te dejamos los datos.',
    alias: 'RO.GONZA.BODA',
    cbu: '',
    titular: 'Gonzalo Álvarez'
  },

  hashtag: '#RoYGonza',
  // Información útil (opcional): si se completa alguno, aparece una sección con esos datos. Vacíos = no aparece.
  ninos: '',          // ej. '¡Los chicos son bienvenidos!' o 'Es una fiesta para adultos'
  alojamiento: 'Cafayate está a unas tres horas de Salta capital. Hay posadas y fincas con habitaciones cerca de la bodega: avisanos y te pasamos opciones.',    // dónde dormir, si la boda es lejos
  traslado: 'Combi desde la plaza de Cafayate a la finca a las 20:30. Vuelve a las 4:00 y a las 5:00.',       // combi o transporte. Si se completa, la confirmación pregunta quién lo usa
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
