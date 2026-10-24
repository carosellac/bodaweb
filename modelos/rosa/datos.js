/* =====================================================================
   DATOS DE LA PAREJA — lo único que hay que completar para cada casamiento.
   Las fotos van en la carpeta fotos/ con estos nombres (cualquier medida sirve):
   portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
   (también pueden ser .jpg: en ese caso cambiá la terminación en index.html).
   La música, si la quieren, es un archivo musica.mp3 en esta misma carpeta.
   La acuarela (fondo-rosa.webp, guirnalda.webp, filigrana.webp y esquina-1/2.webp) es parte del
   diseño: no hace falta tocarla.
   ===================================================================== */
const DATOS = {
  modelo: 'Rosas en Acuarela',

  nombre1: 'Paula',
  nombre2: 'Benjamín',
  iniciales: 'P & B',

  // Fecha y hora de la ceremonia: año-mes-día T hora:minutos (hora argentina -03:00)
  fecha: '2028-05-20T16:00:00-03:00',
  fechaTexto: 'Sábado 20 de mayo de 2028',
  fechaCorta: 'Sábado 20 de mayo · 16 hs',   // la fecha de la portada, entre las dos filigranas
  lugarCorto: 'Chascomús, Buenos Aires',

  // Portada: la frase de invitación debajo de los nombres
  invitacion: 'Te invitamos a celebrar nuestro amor y nuestro compromiso.',

  frase: 'Junto a la laguna, entre flores y con la gente que más queremos. Este día no sería lo mismo sin vos.',

  ceremonia: {
    hora: '16:00',
    nombre: 'Capilla de los Milagros',
    direccion: 'Lavalle 120, Chascomús',
    mapa: ''            // enlace de Google Maps (opcional: si está vacío se busca por la dirección)
  },
  fiesta: {
    hora: '18:00',
    nombre: 'Estancia La Alameda',
    direccion: 'Ruta 2 km 118, Chascomús',
    mapa: ''
  },

  codigoVestimenta: 'Elegante de día · Rosas y tonos pastel',
  confirmarHasta: '20 de abril de 2028',

  // WhatsApp al que llegan las confirmaciones: 549 + código de área sin 0 + número sin 15
  whatsapp: '',

  regalo: {
    texto: 'Lo más lindo es que vengas. Si además querés ayudarnos con nuestro viaje de bodas, te dejamos los datos.',
    alias: 'PAU.BENJA.BODA',
    cbu: '',
    titular: 'Paula Ríos'
  },

  hashtag: '#PauYBenja',
  // Música de fondo (opcional): el nombre del archivo que dejaste en esta carpeta, por ejemplo 'musica.mp3'. Vacío = sin música.
  musica: '',
  credito: true        // false para sacar el "Hecho con Boda Web" del pie
};
