/* =====================================================================
   DATOS DE LA PAREJA — lo único que hay que completar para cada casamiento.
   Las fotos van en la carpeta fotos/ con estos nombres (cualquier medida sirve):
   portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
   (también pueden ser .jpg: en ese caso cambiá la terminación en index.html).
   La música, si la quieren, es un archivo musica.mp3 en esta misma carpeta.
   ===================================================================== */
const DATOS = {
  modelo: 'Playa & Verano',

  nombre1: 'Lucía',
  nombre2: 'Mateo',
  iniciales: 'L + M',

  // Fecha y hora de la ceremonia: año-mes-día T hora:minutos (hora argentina -03:00)
  fecha: '2027-01-23T18:30:00-03:00',
  fechaTexto: 'Sábado 23 de enero de 2027',
  lugarCorto: 'Pinamar, Costa Atlántica',

  frase: '¡Nos casamos frente al mar! Traé ganas de bailar, protector solar y tu mejor sonrisa.',

  ceremonia: {
    hora: '18:30',
    nombre: 'Ceremonia en la playa · Parador Marbella',
    direccion: 'Av. del Mar y Jasón, Pinamar',
    mapa: ''            // enlace de Google Maps (opcional: si está vacío se busca por la dirección)
  },
  fiesta: {
    hora: '20:00',
    nombre: 'Fiesta en el Parador Marbella',
    direccion: 'Av. del Mar y Jasón, Pinamar',
    mapa: ''
  },

  codigoVestimenta: 'Fresco y de verano · Lino, colores claros · Sin tacos (es arena)',
  confirmarHasta: '5 de enero de 2027',

  // WhatsApp al que llegan las confirmaciones: 549 + código de área sin 0 + número sin 15
  whatsapp: '',

  regalo: {
    texto: 'Lo mejor es que vengas. Si querés sumar a nuestra luna de miel en el Caribe, acá tenés el alias.',
    alias: 'LU.MATEO.CARIBE',
    cbu: '',
    titular: 'Lucía Fernández'
  },

  hashtag: '#LuYMateo',
  credito: true        // false para sacar el "Hecho con Boda Web" del pie
};
