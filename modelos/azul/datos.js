/* =====================================================================
   DATOS DE LA PAREJA — lo único que hay que completar para cada casamiento.
   Las fotos van en la carpeta fotos/ con estos nombres (cualquier medida sirve):
   portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
   (también pueden ser .jpg: en ese caso cambiá la terminación en index.html).
   La música, si la quieren, es un archivo musica.mp3 en esta misma carpeta.
   Las flores de acuarela (flores-fondo.webp, corona.webp y esquina-1…4.webp) son parte del diseño:
   no hace falta tocarlas.
   ===================================================================== */
const DATOS = {
  modelo: 'Flores Azules',

  nombre1: 'Valeria',
  nombre2: 'Santiago',
  iniciales: 'V & S',

  // Fecha y hora de la ceremonia: año-mes-día T hora:minutos (hora argentina -03:00)
  fecha: '2028-03-18T18:00:00-03:00',
  fechaTexto: 'Sábado 18 de marzo de 2028',
  // El calendario de la portada: día de la semana, número, mes y hora
  fechaDia: 'Sábado',
  fechaNumero: '18',
  fechaMes: 'Marzo',
  fechaHora: 'A las 18 hs',
  lugarCorto: 'Tandil, Buenos Aires',

  // Portada: el título dorado, la frase de invitación y el saludo final
  titulo1: 'Nuestra Boda',
  invitacion: 'Tenemos el gusto de invitarte a este día tan importante de nuestras vidas',
  mensaje: 'Te esperamos',

  frase: 'Entre sierras y flores, con la gente que más queremos. Nos haría muy felices que estés.',

  ceremonia: {
    hora: '18:00',
    nombre: 'Capilla del Cerro',
    direccion: 'Av. Don Bosco 2800, Tandil',
    mapa: ''            // enlace de Google Maps (opcional: si está vacío se busca por la dirección)
  },
  fiesta: {
    hora: '20:00',
    nombre: 'Estancia Las Hortensias',
    direccion: 'Ruta 74 km 8, Tandil',
    mapa: ''
  },

  codigoVestimenta: 'Elegante · Azules y tonos claros',
  confirmarHasta: '18 de febrero de 2028',

  // WhatsApp al que llegan las confirmaciones: 549 + código de área sin 0 + número sin 15
  whatsapp: '',

  regalo: {
    texto: 'Tu presencia es nuestro mejor regalo. Si además querés ayudarnos con nuestro viaje de bodas, te dejamos los datos.',
    alias: 'VALE.SANTI.BODA',
    cbu: '',
    titular: 'Valeria Méndez'
  },

  hashtag: '#ValeYSanti',
  // Información útil (opcional): si se completa alguno, aparece una sección con esos datos. Vacíos = no aparece.
  ninos: 'Queremos que sea una noche para adultos: te pedimos que los chicos se queden en casa.',          // ej. '¡Los chicos son bienvenidos!' o 'Es una fiesta para adultos'
  alojamiento: '',    // dónde dormir, si la boda es lejos

  // Cuántas personas se pueden anotar como máximo en la confirmación (si no se usa ?lugares= en el link)
  maxPersonas: 10,

  // Lo que dice la cuenta regresiva después de la boda (vacío = '¡Gracias por acompañarnos!')
  textoDespues: '',

  // Música de fondo (opcional): el nombre del archivo que dejaste en esta carpeta, por ejemplo 'musica.mp3'. Vacío = sin música.
  musica: '../../assets/musica-muestra.mp3',   // MUESTRA: Bach, "Air" (dominio público). Para una pareja: su archivo, o '' si no quieren música
  credito: true        // false para sacar el "Hecho con Boda Web" del pie
};
