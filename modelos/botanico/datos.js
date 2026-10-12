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
  invitacion: 'Querida familia y amigos: con mucha alegría los invitamos a la boda de',
  mensaje: 'Te esperamos para celebrar juntos',

  frase: 'Entre las sierras, al aire libre y con la gente que más queremos. Este día no sería lo mismo sin vos.',

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
  credito: true        // false para sacar el "Hecho con Boda Web" del pie
};
