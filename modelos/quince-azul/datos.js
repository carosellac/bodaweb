/* =====================================================================
   DATOS DE LA QUINCEAÑERA — lo único que hay que completar para cada fiesta de 15.
   Las fotos van en la carpeta fotos/ con estos nombres (cualquier medida sirve):
   portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
   (también pueden ser .jpg: en ese caso cambiá la terminación en index.html).
   La música, si la quieren, es un archivo musica.mp3 en esta misma carpeta.
   Las flores de acuarela (flores-fondo.webp, corona.webp y esquina-1…4.webp) son parte del diseño:
   no hace falta tocarlas.
   ===================================================================== */
const DATOS = {
  modelo: 'Flores Azules · 15 años',

  // Para qué evento es: 'quince' = fiesta de 15 (un solo nombre). Para un casamiento se borra esta línea.
  evento: 'quince',

  nombre1: 'Catalina',
  nombre2: '',          // en una fiesta de 15 va vacío
  iniciales: 'XV',

  // Fecha y hora de la misa (o de la fiesta, si no hay misa): año-mes-día T hora:minutos (hora argentina -03:00)
  fecha: '2027-11-13T20:00:00-03:00',
  fechaTexto: 'Sábado 13 de noviembre de 2027',
  // El calendario de la portada: día de la semana, número, mes y hora
  fechaDia: 'Sábado',
  fechaNumero: '13',
  fechaMes: 'Noviembre',
  fechaHora: 'A las 21:30 hs',
  lugarCorto: 'Villa Allende, Córdoba',

  // Portada: el título dorado, la frase de invitación y el saludo final
  titulo1: 'Mis XV',
  invitacion: 'Tengo el gusto de invitarte a festejar conmigo esta noche tan especial',
  mensaje: 'Te espero',

  frase: 'Entre sierras, flores y la gente que más quiero. Me haría muy feliz que estés.',

  ceremonia: {
    hora: '20:00',
    nombre: 'Parroquia Nuestra Señora del Rosario',
    direccion: 'Av. Río de Janeiro 1200, Villa Allende',
    mapa: ''            // enlace de Google Maps (opcional: si está vacío se busca por la dirección)
  },
  fiesta: {
    hora: '21:30',
    nombre: 'Quinta Los Aromos',
    direccion: 'Camino a Saldán km 3, Villa Allende',
    mapa: ''
  },

  codigoVestimenta: 'Elegante · Celestes y tonos claros',
  confirmarHasta: '13 de octubre de 2027',

  // WhatsApp al que llegan las confirmaciones: 549 + código de área sin 0 + número sin 15
  whatsapp: '',

  regalo: {
    texto: 'Tu presencia es mi mejor regalo. Si además querés hacerme un regalo, te dejo los datos.',
    alias: 'CATA.MIS15',
    cbu: '',
    titular: 'Catalina Ferreyra'
  },

  hashtag: '#Los15DeCata',
  // Información útil (opcional): si se completa alguno, aparece una sección con esos datos. Vacíos = no aparece.
  ninos: '',          // ej. '¡Los chicos son bienvenidos!' o 'Es una fiesta para adultos'
  alojamiento: '',    // dónde dormir, si la boda es lejos
  traslado: 'Sale una combi desde la plaza de Villa Allende a las 19:30 y vuelve al terminar la fiesta.',       // combi o transporte. Si se completa, la confirmación pregunta quién lo usa
  menu: '',           // qué se va a comer
  notas: '',          // cualquier otra cosa para tener en cuenta

  // Confirmación de asistencia (opcional)
  confirmarPorEvento: true,   // true = cada invitado marca si va a la ceremonia, a la fiesta o a las dos
  preguntarChicos: false,      // true = pregunta cuántos chicos vienen
  sugerirCanciones: true,     // false = no aparece "¿Qué canción no puede faltar?"
  compartirFotos: true,       // false = no aparece "Compartí tus fotos" con el hashtag

  // Colores: '' = los del diseño. Las otras paletas de este diseño están al final de su estilo.css
  paleta: '',

  // Panel de la quinceañera (opcional): ver cada confirmación y cada canción en /panel/. Lo activa Boda Web.
  panel: { invitacion: '' },

  // Cuántas personas se pueden anotar como máximo en la confirmación (si no se usa ?lugares= en el link)
  maxPersonas: 10,

  // Lo que dice la cuenta regresiva después de la boda (vacío = '¡Gracias por acompañarnos!')
  textoDespues: '',

  // Música de fondo (opcional): el nombre del archivo que dejaste en esta carpeta, por ejemplo 'musica.mp3'. Vacío = sin música.
  musica: '../../assets/musica-muestra.mp3',   // MUESTRA: Bach, "Air" (dominio público). Para una pareja: su archivo, o '' si no quieren música
  credito: true        // false para sacar el "Hecho con Boda Web" del pie
};
