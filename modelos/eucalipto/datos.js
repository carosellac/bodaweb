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
  credito: true        // false para sacar el "Hecho con Boda Web" del pie
};
