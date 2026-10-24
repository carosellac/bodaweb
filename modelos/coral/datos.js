/* =====================================================================
   DATOS DE LA PAREJA — lo único que hay que completar para cada casamiento.
   Las fotos van en la carpeta fotos/ con estos nombres (cualquier medida sirve):
   portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
   (también pueden ser .jpg: en ese caso cambiá la terminación en index.html).
   La música, si la quieren, es un archivo musica.mp3 en esta misma carpeta.
   ===================================================================== */
const DATOS = {
  modelo: 'Coral Moderno',

  nombre1: 'Micaela',
  nombre2: 'Federico',
  iniciales: 'M & F',

  // Fecha y hora de la ceremonia: año-mes-día T hora:minutos (hora argentina -03:00)
  fecha: '2027-11-13T19:00:00-03:00',
  fechaTexto: 'Sábado 13 de noviembre de 2027',
  // La fecha grande de la portada va en tres partes: día de la semana, número (en el círculo) y mes
  fechaDia: 'Sábado',
  fechaNumero: '13',
  fechaMes: 'Noviembre',
  lugarCorto: 'Luján de Cuyo, Mendoza',

  // Portada: título (caligrafía + mayúsculas), anuncio en coral, frase, "Te esperamos el" y la franja de abajo
  titulo1: 'Sí, quiero',
  titulo2: 'Reservá la fecha',
  anuncio: 'Nos casamos',
  invitacion: 'No vemos la hora de celebrarlo con vos',
  esperamos: 'Te esperamos el',
  mensaje: '¡Gracias por acompañarnos en este día!',

  frase: 'Entre viñedos, con buen vino y la gente que más queremos. Este día no sería lo mismo sin vos.',

  ceremonia: {
    hora: '19:00',
    nombre: 'Capilla Nuestra Señora del Rosario',
    direccion: 'Roque Sáenz Peña 3000, Luján de Cuyo',
    mapa: ''            // enlace de Google Maps (opcional: si está vacío se busca por la dirección)
  },
  fiesta: {
    hora: '20:30',
    nombre: 'Bodega Los Álamos',
    direccion: 'Ruta 15 km 30, Luján de Cuyo',
    mapa: ''
  },

  codigoVestimenta: 'Elegante · Colores vivos bienvenidos',
  confirmarHasta: '13 de octubre de 2027',

  // WhatsApp al que llegan las confirmaciones: 549 + código de área sin 0 + número sin 15
  whatsapp: '',

  regalo: {
    texto: 'Que vengas es el mejor regalo. Si además querés ayudarnos con nuestra luna de miel, te dejamos los datos.',
    alias: 'MICA.FEDE.BODA',
    cbu: '',
    titular: 'Micaela Sosa'
  },

  hashtag: '#MicaYFede',
  // Música de fondo (opcional): el nombre del archivo que dejaste en esta carpeta, por ejemplo 'musica.mp3'. Vacío = sin música.
  musica: '',
  credito: true        // false para sacar el "Hecho con Boda Web" del pie
};
