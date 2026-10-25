/* =====================================================================
   DATOS DE LA PAREJA — lo único que hay que completar para cada casamiento.
   Las fotos van en la carpeta fotos/ con estos nombres (cualquier medida sirve):
   portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
   (también pueden ser .jpg: en ese caso cambiá la terminación en index.html).
   La música, si la quieren, es un archivo musica.mp3 en esta misma carpeta.
   ===================================================================== */
const DATOS = {
  modelo: 'Círculo Botánico',

  nombre1: 'Carla',
  nombre2: 'Martín',
  iniciales: 'C & M',

  // Fecha y hora de la ceremonia: año-mes-día T hora:minutos (hora argentina -03:00)
  fecha: '2027-05-08T18:00:00-03:00',
  fechaTexto: 'Sábado 8 de mayo de 2027',
  lugarCorto: 'Villa General Belgrano, Córdoba',

  // Portada: el título (palabra manuscrita + mayúsculas chicas + palabra manuscrita),
  // la frase de arriba de los nombres y la línea final
  titulo1: 'Nos',
  titulo2: 'vamos a',
  titulo3: 'Casar',
  invitacion: 'Familia y amigos: nos llena de alegría invitarlos al casamiento de',
  mensaje: 'Te esperamos entre las sierras',

  frase: 'Entre las sierras, al aire libre y con el mate siempre a mano. Queremos festejarlo con vos.',

  ceremonia: {
    hora: '18:00',
    nombre: 'Capilla del Valle',
    direccion: 'Av. San Martín 10, Villa General Belgrano',
    mapa: ''            // enlace de Google Maps (opcional: si está vacío se busca por la dirección)
  },
  fiesta: {
    hora: '20:00',
    nombre: 'Estancia La Serena',
    direccion: 'Ruta 5 km 82, Villa General Belgrano',
    mapa: ''
  },

  codigoVestimenta: 'Elegante sport · Verdes y neutros',
  confirmarHasta: '8 de abril de 2027',

  // WhatsApp al que llegan las confirmaciones: 549 + código de área sin 0 + número sin 15
  whatsapp: '',

  regalo: {
    texto: 'Lo más lindo es que vengas. Si además querés ayudarnos con nuestro viaje de bodas, te dejamos los datos.',
    alias: 'CARLA.MARTIN.BODA',
    cbu: '',
    titular: 'Martín Ruiz'
  },

  hashtag: '#CarlaYMartin',
  // Información útil (opcional): si se completa alguno, aparece una sección con esos datos. Vacíos = no aparece.
  ninos: '',          // ej. '¡Los chicos son bienvenidos!' o 'Es una fiesta para adultos'
  alojamiento: '',    // dónde dormir, si la boda es lejos
  traslado: 'Hay un traslado desde la plaza de Villa General Belgrano a la estancia a las 19:30, con vuelta a las 4:00.',       // combi o transporte. Si se completa, la confirmación pregunta quién lo usa
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
