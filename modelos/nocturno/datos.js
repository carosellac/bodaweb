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
  credito: true        // false para sacar el "Hecho con Boda Web" del pie
};
