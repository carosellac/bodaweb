/* =====================================================================
   DATOS DE LA PAREJA — lo único que hay que completar para cada casamiento.
   Las fotos van en la carpeta fotos/ con estos nombres (cualquier medida sirve):
   portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
   (también pueden ser .jpg: en ese caso cambiá la terminación en index.html).
   La música, si la quieren, es un archivo musica.mp3 en esta misma carpeta.
   ===================================================================== */
const DATOS = {
  modelo: 'Elegante Nocturno',

  nombre1: 'Sofía',
  nombre2: 'Agustín',
  iniciales: 'S · A',

  // Fecha y hora de la ceremonia: año-mes-día T hora:minutos (hora argentina -03:00)
  fecha: '2027-05-22T19:00:00-03:00',
  fechaTexto: 'Sábado 22 de mayo de 2027',
  lugarCorto: 'Rosario, Santa Fe',

  frase: 'Una noche para brindar por el amor, la familia y los amigos de siempre. Los esperamos.',

  ceremonia: {
    hora: '19:00',
    nombre: 'Catedral de Rosario',
    direccion: 'Buenos Aires 702, Rosario, Santa Fe',
    mapa: ''            // enlace de Google Maps (opcional: si está vacío se busca por la dirección)
  },
  fiesta: {
    hora: '21:30',
    nombre: 'Salón Metropolitano',
    direccion: 'Junín 501, Rosario, Santa Fe',
    mapa: ''
  },

  codigoVestimenta: 'Etiqueta · Black tie',
  confirmarHasta: '30 de abril de 2027',

  // WhatsApp al que llegan las confirmaciones: 549 + código de área sin 0 + número sin 15
  whatsapp: '',

  regalo: {
    texto: 'Compartir esta noche con ustedes es nuestro mayor regalo. Si desean hacernos un presente, pueden hacerlo a través de estos datos.',
    alias: 'SOFI.AGUS.BODA',
    cbu: '',
    titular: 'Agustín Molina'
  },

  hashtag: '#SofiYAgus',
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
