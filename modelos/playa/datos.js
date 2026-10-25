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
  // Información útil (opcional): si se completa alguno, aparece una sección con esos datos. Vacíos = no aparece.
  ninos: 'Queremos que sea una fiesta para adultos: te pedimos que los chicos se queden en casa ese día.',          // ej. '¡Los chicos son bienvenidos!' o 'Es una fiesta para adultos'
  alojamiento: 'Pinamar tiene hoteles y departamentos a pasos del parador. Si querés, te pasamos algunas recomendaciones.',    // dónde dormir, si la boda es lejos
  traslado: '',       // combi o transporte. Si se completa, la confirmación pregunta quién lo usa
  menu: '',           // qué se va a comer
  notas: 'El parador queda sobre la arena: traé un abrigo liviano para cuando baje el sol.',          // cualquier otra cosa para tener en cuenta

  // Confirmación de asistencia (opcional)
  confirmarPorEvento: false,   // true = cada invitado marca si va a la ceremonia, a la fiesta o a las dos
  preguntarChicos: false,      // true = pregunta cuántos chicos vienen
  sugerirCanciones: true,     // false = no aparece "¿Qué canción no puede faltar?"
  compartirFotos: true,       // false = no aparece "Compartí tus fotos" con el hashtag

  // Colores: '' = los del diseño. Las otras paletas de este diseño están al final de su estilo.css
  paleta: '',

  // Panel de los novios (opcional): ver cada confirmación y cada canción en /panel/. Lo activa Boda Web.
  panel: { invitacion: '' },

  // Cuántas personas se pueden anotar como máximo en la confirmación (si no se usa ?lugares= en el link)
  maxPersonas: 10,

  // Lo que dice la cuenta regresiva después de la boda (vacío = '¡Gracias por acompañarnos!')
  textoDespues: '',

  // Música de fondo (opcional): el nombre del archivo que dejaste en esta carpeta, por ejemplo 'musica.mp3'. Vacío = sin música.
  musica: '../../assets/musica-muestra.mp3',   // MUESTRA: Bach, "Air" (dominio público). Para una pareja: su archivo, o '' si no quieren música
  credito: true        // false para sacar el "Hecho con Boda Web" del pie
};
