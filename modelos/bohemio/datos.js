/* =====================================================================
   DATOS DE LA PAREJA — lo único que hay que completar para cada casamiento.
   Las fotos van en la carpeta fotos/ con estos nombres (cualquier medida sirve):
   portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
   (también pueden ser .jpg: en ese caso cambiá la terminación en index.html).
   La música, si la quieren, es un archivo musica.mp3 en esta misma carpeta.
   ===================================================================== */
const DATOS = {
  modelo: 'Bohemio & Natural',

  nombre1: 'Camila',
  nombre2: 'Franco',
  iniciales: 'C + F',

  // Fecha y hora de la ceremonia: año-mes-día T hora:minutos (hora argentina -03:00)
  fecha: '2027-02-13T18:00:00-03:00',
  fechaTexto: 'Sábado 13 de febrero de 2027',
  fechaCorta: '13 febrero 2027',   // la fecha grande de la portada (corta, entra en un renglón)
  lugarCorto: 'Mar de las Pampas',

  // Portada: las dos líneas grandes (verde y dorada) y la frase de arriba de los nombres
  lema1: 'El amor',
  lema2: 'es paciente',
  invitacion: 'Te invitamos a celebrar nuestro casamiento',

  frase: 'Entre el bosque y el mar, con los pies en la arena y el corazón lleno. Vení a celebrar con nosotros.',

  ceremonia: {
    hora: '18:00',
    nombre: 'Ceremonia en el bosque',
    direccion: 'Calle Los Robles y Mercedes Sosa, Mar de las Pampas',
    mapa: ''            // enlace de Google Maps (opcional: si está vacío se busca por la dirección)
  },
  fiesta: {
    hora: '20:00',
    nombre: 'Casa Las Dunas',
    direccion: 'Av. Cruz del Sur 1200, Mar de las Pampas',
    mapa: ''
  },

  codigoVestimenta: 'Relajado · Tonos tierra · Zapatos cómodos para la arena',
  confirmarHasta: '20 de enero de 2027',

  // WhatsApp al que llegan las confirmaciones: 549 + código de área sin 0 + número sin 15
  whatsapp: '',

  regalo: {
    texto: 'Que vengas ya es un regalo. Si querés acompañarnos en nuestro viaje a la Patagonia, te dejamos el alias.',
    alias: 'CAMI.FRAN.PATAGONIA',
    cbu: '',
    titular: 'Camila Ríos'
  },

  hashtag: '#CamiYFran',
  // Información útil (opcional): si se completa alguno, aparece una sección con esos datos. Vacíos = no aparece.
  ninos: '¡Los chicos son bienvenidos! Va a haber un rincón con juegos y alguien que los cuide.',          // ej. '¡Los chicos son bienvenidos!' o 'Es una fiesta para adultos'
  alojamiento: 'Mar de las Pampas tiene cabañas y hosterías a pocas cuadras del bosque. Reservá con tiempo: en febrero se llena.',    // dónde dormir, si la boda es lejos

  // Cuántas personas se pueden anotar como máximo en la confirmación (si no se usa ?lugares= en el link)
  maxPersonas: 10,

  // Lo que dice la cuenta regresiva después de la boda (vacío = '¡Gracias por acompañarnos!')
  textoDespues: '',

  // Música de fondo (opcional): el nombre del archivo que dejaste en esta carpeta, por ejemplo 'musica.mp3'. Vacío = sin música.
  musica: '../../assets/musica-muestra.mp3',   // MUESTRA: Bach, "Air" (dominio público). Para una pareja: su archivo, o '' si no quieren música
  credito: true        // false para sacar el "Hecho con Boda Web" del pie
};
