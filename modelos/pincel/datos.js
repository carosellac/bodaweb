/* =====================================================================
   DATOS DE LA PAREJA — lo único que hay que completar para cada casamiento.
   Las fotos van en la carpeta fotos/ con estos nombres (cualquier medida sirve):
   portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
   (también pueden ser .jpg: en ese caso cambiá la terminación en index.html).
   La música, si la quieren, es un archivo musica.mp3 en esta misma carpeta.
   ===================================================================== */
const DATOS = {
  modelo: 'Pincelada Rosa',

  nombre1: 'Agustina',
  nombre2: 'Ignacio',
  iniciales: 'A & I',

  // Fecha y hora de la ceremonia: año-mes-día T hora:minutos (hora argentina -03:00)
  fecha: '2027-12-04T19:30:00-03:00',
  fechaTexto: 'Sábado 4 de diciembre de 2027',
  lugarCorto: 'San Isidro, Buenos Aires',

  // Portada: el título grande en letra manuscrita, el saludo, la frase de arriba de los nombres,
  // la línea rosa en mayúsculas y la nota de abajo
  titulo1: 'Nos Casamos',
  saludo: 'Querida familia y amigos,',
  invitacion: 'tenemos el gusto de invitarlos al casamiento de',
  mensaje: '¡Reservá la fecha!',
  nota: 'Nos encantaría que nos acompañes en este día tan especial.',

  frase: 'Una noche de primavera, mucha música y un piano que no puede faltar. Te esperamos para cantar con nosotros.',

  ceremonia: {
    hora: '19:30',
    nombre: 'Catedral de San Isidro',
    direccion: 'Av. del Libertador 16200, San Isidro',
    mapa: ''            // enlace de Google Maps (opcional: si está vacío se busca por la dirección)
  },
  fiesta: {
    hora: '21:00',
    nombre: 'Quinta Los Aromos',
    direccion: 'Camino Real Morón 3400, San Isidro',
    mapa: ''
  },

  codigoVestimenta: 'Elegante · Rosas y celestes bienvenidos',
  confirmarHasta: '4 de noviembre de 2027',

  // WhatsApp al que llegan las confirmaciones: 549 + código de área sin 0 + número sin 15
  whatsapp: '',

  regalo: {
    texto: 'Lo más lindo es que vengas. Si además querés ayudarnos con nuestro viaje de bodas, te dejamos los datos.',
    alias: 'AGUS.NACHO.BODA',
    cbu: '',
    titular: 'Ignacio Pérez'
  },

  hashtag: '#AgusYNacho',
  // Información útil (opcional): si se completa alguno, aparece una sección con esos datos. Vacíos = no aparece.
  ninos: '',          // ej. '¡Los chicos son bienvenidos!' o 'Es una fiesta para adultos'
  alojamiento: '',    // dónde dormir, si la boda es lejos

  // Cuántas personas se pueden anotar como máximo en la confirmación (si no se usa ?lugares= en el link)
  maxPersonas: 10,

  // Lo que dice la cuenta regresiva después de la boda (vacío = '¡Gracias por acompañarnos!')
  textoDespues: '',

  // Música de fondo (opcional): el nombre del archivo que dejaste en esta carpeta, por ejemplo 'musica.mp3'. Vacío = sin música.
  musica: '../../assets/musica-muestra.mp3',   // MUESTRA: Bach, "Air" (dominio público). Para una pareja: su archivo, o '' si no quieren música
  credito: true        // false para sacar el "Hecho con Boda Web" del pie
};
