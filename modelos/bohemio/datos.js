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
  lugarCorto: 'Mar de las Pampas',

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
  credito: true        // false para sacar el "Hecho con Boda Web" del pie
};
