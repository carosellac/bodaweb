/* =====================================================================
   DATOS DE LA PAREJA — lo único que hay que completar para cada casamiento.
   Las fotos van en la carpeta fotos/ con estos nombres (cualquier medida sirve):
   portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
   (también pueden ser .jpg: en ese caso cambiá la terminación en index.html).
   La música, si la quieren, es un archivo musica.mp3 en esta misma carpeta.
   ===================================================================== */
const DATOS = {
  modelo: 'Eucalipto & Acuarela',

  nombre1: 'Florencia',
  nombre2: 'Joaquín',
  iniciales: 'F & J',

  // Fecha y hora de la ceremonia: año-mes-día T hora:minutos (hora argentina -03:00)
  fecha: '2027-03-20T17:30:00-03:00',
  fechaTexto: 'Sábado 20 de marzo de 2027',
  lugarCorto: 'Tigre, Buenos Aires',

  // Portada: el título de arriba (una palabra en letra manuscrita + una en mayúsculas chicas),
  // la frase de arriba de los nombres y la línea final
  titulo1: 'Nuestra',
  titulo2: 'boda',
  invitacion: 'Querida familia y amigos: con mucha alegría los invitamos a la boda de',
  mensaje: 'Los esperamos para celebrar juntos',

  frase: 'Un día junto al río, rodeados de verde y de la gente que más queremos. Nos encantaría que estés.',

  ceremonia: {
    hora: '17:30',
    nombre: 'Capilla Santa María del Delta',
    direccion: 'Paseo Victorica 600, Tigre',
    mapa: ''            // enlace de Google Maps (opcional: si está vacío se busca por la dirección)
  },
  fiesta: {
    hora: '19:30',
    nombre: 'Casona del Río',
    direccion: 'Lavalle 1200, Tigre',
    mapa: ''
  },

  codigoVestimenta: 'Elegante de día · Tonos claros y verdes',
  confirmarHasta: '20 de febrero de 2027',

  // WhatsApp al que llegan las confirmaciones: 549 + código de área sin 0 + número sin 15
  whatsapp: '',

  regalo: {
    texto: 'Tu presencia es nuestro mejor regalo. Si además querés ayudarnos con nuestro viaje de bodas, te dejamos los datos.',
    alias: 'FLOR.JOACO.BODA',
    cbu: '',
    titular: 'Florencia Gómez'
  },

  hashtag: '#FlorYJoaco',
  // Información útil (opcional): si se completa alguno, aparece una sección con esos datos. Vacíos = no aparece.
  ninos: '',          // ej. '¡Los chicos son bienvenidos!' o 'Es una fiesta para adultos'
  alojamiento: '',    // dónde dormir, si la boda es lejos
  traslado: '',       // combi o transporte. Si se completa, la confirmación pregunta quién lo usa
  menu: '',           // qué se va a comer
  notas: 'La capilla tiene pocos lugares para estacionar: si podés, vení en lancha o en taxi.',          // cualquier otra cosa para tener en cuenta

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
