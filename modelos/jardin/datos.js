/* =====================================================================
   DATOS DE LA PAREJA — lo único que hay que completar para cada casamiento.
   Las fotos van en la carpeta fotos/ con estos nombres (cualquier medida sirve):
   portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
   (también pueden ser .jpg: en ese caso cambiá la terminación en index.html).
   La música, si la quieren, es un archivo musica.mp3 en esta misma carpeta.
   ===================================================================== */
const DATOS = {
  modelo: 'Jardín en Acuarela',

  nombre1: 'Martina',
  nombre2: 'Lucas',
  iniciales: 'M & L',

  // Fecha y hora de la ceremonia: año-mes-día T hora:minutos (hora argentina -03:00)
  fecha: '2027-10-16T16:30:00-03:00',
  fechaTexto: 'Sábado 16 de octubre de 2027',
  lugarCorto: 'Pilar, Buenos Aires',

  frase: 'Un día de primavera, un jardín lleno de flores y la gente que más queremos. ¡Nos casamos!',

  ceremonia: {
    hora: '16:30',
    nombre: 'Capilla de la Estancia Villa María',
    direccion: 'Ruta 6 km 165, Máximo Paz, Cañuelas',
    mapa: ''            // enlace de Google Maps (opcional: si está vacío se busca por la dirección)
  },
  fiesta: {
    hora: '18:00',
    nombre: 'Jardines de la Estancia',
    direccion: 'Ruta 6 km 165, Máximo Paz, Cañuelas',
    mapa: ''
  },

  codigoVestimenta: 'Elegante de día · Colores claros · El pasto no perdona los tacos finos',
  confirmarHasta: '15 de septiembre de 2027',

  // WhatsApp al que llegan las confirmaciones: 549 + código de área sin 0 + número sin 15
  whatsapp: '',

  regalo: {
    texto: 'Tu compañía es lo que más deseamos. Si además querés regalarnos algo, nos ayudás con nuestra casita nueva.',
    alias: 'MARTU.LUCAS.CASA',
    cbu: '',
    titular: 'Martina López'
  },

  hashtag: '#MartuYLucas',
  // Música de fondo (opcional): el nombre del archivo que dejaste en esta carpeta, por ejemplo 'musica.mp3'. Vacío = sin música.
  musica: '',
  credito: true        // false para sacar el "Hecho con Boda Web" del pie
};
