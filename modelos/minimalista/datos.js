/* =====================================================================
   DATOS DE LA PAREJA — lo único que hay que completar para cada casamiento.
   Las fotos van en la carpeta fotos/ con estos nombres (cualquier medida sirve):
   portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
   (también pueden ser .jpg: en ese caso cambiá la terminación en index.html).
   La música, si la quieren, es un archivo musica.mp3 en esta misma carpeta.
   ===================================================================== */
const DATOS = {
  modelo: 'Moderno & Minimalista',

  nombre1: 'Julieta',
  nombre2: 'Tomás',
  iniciales: 'J—T',

  // Fecha y hora de la ceremonia: año-mes-día T hora:minutos (hora argentina -03:00)
  fecha: '2027-11-06T18:30:00-03:00',
  fechaTexto: '06.11.2027',
  lugarCorto: 'Palermo, Buenos Aires',

  frase: 'Nos casamos. Queremos que estés.',

  ceremonia: {
    hora: '18:30',
    nombre: 'Registro Civil de Palermo',
    direccion: 'Beruti 3325, Ciudad de Buenos Aires',
    mapa: ''            // enlace de Google Maps (opcional: si está vacío se busca por la dirección)
  },
  fiesta: {
    hora: '21:00',
    nombre: 'Estudio Dorrego',
    direccion: 'Dorrego 1680, Palermo, Ciudad de Buenos Aires',
    mapa: ''
  },

  codigoVestimenta: 'Cocktail · Blanco y negro',
  confirmarHasta: '10 de octubre de 2027',

  // WhatsApp al que llegan las confirmaciones: 549 + código de área sin 0 + número sin 15
  whatsapp: '',

  regalo: {
    texto: 'Lo más importante es que vengas. Si querés sumar a nuestro viaje, acá está el alias.',
    alias: 'JULI.TOMI.VIAJE',
    cbu: '',
    titular: 'Tomás Pereyra'
  },

  hashtag: '#JuliYTomi',
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
