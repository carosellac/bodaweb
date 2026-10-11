/* =====================================================================
   DATOS DE LA PAREJA — lo único que hay que completar para cada casamiento.
   Las fotos van en la carpeta fotos/ con estos nombres (cualquier medida sirve):
   portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
   (también pueden ser .jpg: en ese caso cambiá la terminación en index.html).
   La música, si la quieren, es un archivo musica.mp3 en esta misma carpeta.
   ===================================================================== */
const DATOS = {
  modelo: 'Clásico & Romántico',

  nombre1: 'Valentina',
  nombre2: 'Nicolás',
  iniciales: 'V & N',

  // Fecha y hora de la ceremonia: año-mes-día T hora:minutos (hora argentina -03:00)
  fecha: '2027-04-17T17:00:00-03:00',
  fechaTexto: 'Sábado 17 de abril de 2027',
  lugarCorto: 'Buenos Aires',

  frase: 'Con la bendición de nuestras familias, tenemos el honor de invitarlos a celebrar nuestro casamiento.',

  ceremonia: {
    hora: '17:00',
    nombre: 'Basílica Nuestra Señora del Pilar',
    direccion: 'Junín 1904, Recoleta, Ciudad de Buenos Aires',
    mapa: ''            // enlace de Google Maps (opcional: si está vacío se busca por la dirección)
  },
  fiesta: {
    hora: '19:30',
    nombre: 'Palacio Sans Souci',
    direccion: 'Av. del Libertador 1190, Victoria, San Fernando',
    mapa: ''
  },

  codigoVestimenta: 'Elegante · Formal',
  confirmarHasta: '20 de marzo de 2027',

  // WhatsApp al que llegan las confirmaciones: 549 + código de área sin 0 + número sin 15
  whatsapp: '',

  regalo: {
    texto: 'Su presencia es nuestro mejor regalo. Si además quieren ayudarnos con nuestra luna de miel, les dejamos nuestros datos.',
    alias: 'VALEN.NICO.BODA',
    cbu: '',
    titular: 'Valentina Suárez'
  },

  hashtag: '#ValenYNico',
  credito: true        // false para sacar el "Hecho con Boda Web" del pie
};
