BODA WEB — LANDING DE INVITACIONES DE CASAMIENTO + 13 MODELOS DE BODA + 3 DE 15 AÑOS

Archivos:
- index.html       La página de venta (portada, diseños, cómo funciona, precio, preguntas)
- styles.css       Estilos de la página de venta (celular, tablet y computadora)
- script.js        Comportamiento de la página de venta (menú, pedido) y DATOS DE CONTACTO
- assets/          Fotos, flores decorativas, capturas de los modelos (modelo-*.webp) e imagen para compartir
- modelos/         LOS 13 MODELOS DE INVITACIÓN (ver abajo)
- favicon.*        Ícono de la pestaña y del acceso directo en el celular
- robots.txt       Permiso para los buscadores
- 404.html         La página que se muestra cuando alguien entra a una dirección que no existe
- vercel.json      Le dice al navegador que guarde las fotos un día (abre más rápido la segunda vez)

PUBLICACIÓN
- Repositorio: github.com/carosellac/bodaweb (rama master). Cada push se publica solo en Vercel.
- Dirección actual: https://bodaweb-rose.vercel.app
- Si se conecta un dominio propio, cambiar la dirección en index.html (canonical, og:url y og:image).
- Los modelos de muestra (carpeta modelos/) tienen una barra abajo, que aparece al bajar, con "Ver otros
  diseños" y "Quiero este diseño". Sale sola porque la dirección contiene /modelos/: en la carpeta de una
  pareja (parejas/…) NO aparece.

EN LA COMPUTADORA LAS INVITACIONES SE VEN COMO EN EL CELULAR
- En una pantalla de computadora (900 px o más, con mouse) la invitación aparece adentro de un celular
  dibujado, con la versión de celular tal cual. Lo hace comun.js; no hay que configurar nada.
- En los modelos de muestra, al costado del celular están "Quiero este diseño" y "Ver otros diseños".
  En la invitación de una pareja (parejas/…) sólo se ve el celular.
- Para ver el diseño de computadora que tiene cada modelo, agregar ?vista=compu a la dirección
  (ej. https://bodaweb-rose.vercel.app/modelos/playa/?vista=compu).

LOS 13 MODELOS (carpeta modelos/)
  modelos/clasico/       Clásico & Romántico   crema, dorado viejo, serif, tarjeta con marco
  modelos/minimalista/   Moderno & Minimalista blanco y negro, tipografía enorme, fotos en blanco y negro
  modelos/bohemio/       Bohemio & Natural     portada con la foto en un hexágono dorado y ramas; verde y dorado
  modelos/nocturno/      Elegante Nocturno     azul noche y dorado, estilo gala / black tie
  modelos/jardin/        Jardín en Acuarela    manchas de color pastel, flores, fotos tipo polaroid
  modelos/playa/         Playa & Verano        azul mar y coral, olas entre secciones
  modelos/eucalipto/     Eucalipto & Acuarela  hojas de acuarela verde agua, foto con filete dorado, letra manuscrita
  modelos/botanico/      Círculo Botánico      foto en círculo con aro dorado, ramitos verdes, "Nos vamos a casar"
  modelos/coral/         Coral Moderno         caligrafía grande, coral y negro, fecha con el día en un círculo
  modelos/pincel/        Pincelada Rosa        papel con esquinas recortadas, fotos con borde de pincel, rosa y celeste
  modelos/azul/          Flores Azules         flores de acuarela, foto dentro de una corona de hojas, azul y dorado
  modelos/rosa/          Rosas en Acuarela     guirnalda de rosas, foto en aro dorado, filigranas, caligrafía
  modelos/roja/          Rosas Bordó y Dorado  marco geométrico dorado, foto en hexágono, rosas bordó
Se ven en la web en /modelos/<nombre>/ (ej. https://bodaweb-rose.vercel.app/modelos/playa/).
Las tarjetas de "Diseños" de la página de venta llevan a cada uno.

Cada modelo es una carpeta completa e independiente:
  index.html   la invitación (secciones: portada, cuenta regresiva, invitación, historia, ceremonia y
               fiesta, itinerario, vestimenta, galería, regalos, confirmación de asistencia, pie)
  estilo.css   su diseño
  datos.js     LOS DATOS DE LA PAREJA (nombres, fecha, lugares, WhatsApp, alias, hashtag…)
  comun.js     el comportamiento (cuenta regresiva, mapas, calendario, galería, confirmación, música).
               Es IDÉNTICO en todos los modelos: no hace falta tocarlo. Si se corrige algo, copiarlo a todos.
  fotos/       portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
               (las de muestra son de dominio público: Unsplash y Wikimedia Commons, licencia CC0)

CÓMO ARMAR LA INVITACIÓN DE UNA PAREJA (sin programar)
1. Copiar la carpeta del modelo elegido a una carpeta nueva, por ejemplo:
      modelos/playa/  →  parejas/lucia-y-mateo/
   (si se la nombra con los nombres de la pareja queda una dirección linda para compartir:
    https://bodaweb-rose.vercel.app/parejas/lucia-y-mateo/)
2. Abrir datos.js de la carpeta nueva y completar todo: nombres, fecha y hora (formato
   2027-01-23T18:30:00-03:00), lugares y direcciones, código de vestimenta, fecha límite para
   confirmar, el WhatsApp al que llegan las confirmaciones (549 + área sin 0 + número sin 15),
   alias/CBU y titular para los regalos, hashtag. Lo que quede vacío no se muestra.
   Opcionales: "ninos" y "alojamiento" (si se completan aparece la sección "Información útil"),
   "maxPersonas" (tope de "¿Cuántos vienen?", 10 por defecto) y "textoDespues" (lo que dice la
   cuenta regresiva pasada la boda; vacío = "¡Gracias por acompañarnos!").
3. Reemplazar las fotos de fotos/ por las de la pareja, CON LOS MISMOS NOMBRES (portada.webp,
   historia-1.webp, …). Sirve cualquier medida: el diseño las acomoda. Conviene que pesen menos de
   400 KB cada una (en webp o jpg; si son .jpg, cambiar la terminación en index.html).
4. Textos largos (la historia, el itinerario, la aclaración de vestimenta): están en index.html,
   marcados con comentarios "Texto de ejemplo: cambialo…". Se editan ahí mismo.
5. Música de fondo: los modelos de muestra traen la "Air" de Bach (dominio público, assets/musica-muestra.mp3).
   Para la pareja: dejar SU archivo (por ejemplo musica.mp3) en la carpeta y escribir su nombre en datos.js,
   en el renglón musica: 'musica.mp3'. Si queda vacío, no hay botón de música.
6. Correr  node actualizar-invitaciones.js  (en la raíz). Escribe el título y la vista previa de WhatsApp con
   los nombres de la pareja, arma fotos/compartir.jpg y evento.ics (el calendario que abren iPhone, iPad y
   Mac) y AVISA si quedó algo del ejemplo: nombres, fecha, alias o titular de los regalos, hashtag, foto de
   portada, nombres de la pareja de muestra en la historia, WhatsApp vacío o la música de muestra.
   Si datos.js cambia (fecha, horarios, lugar), volver a correrla. Sin este paso, el link se
   compartiría con los nombres de la pareja de ejemplo. (Para la foto necesita la librería sharp:
   npm install sharp, una sola vez.)
7. Hacer push: en un minuto queda publicada. Probar en el celular antes de mandarla.

LINK PERSONALIZADO PARA CADA INVITADO (opcional)
Agregando al final de la dirección  ?para=Familia%20Gómez&lugares=4  la invitación saluda por el nombre
("¡Hola, Familia Gómez! Esta invitación es para 4 personas."), deja el nombre escrito en la confirmación
y no deja anotar más de 4. Los espacios se escriben %20. Sin esos datos, la invitación es la misma para todos.

MÁS OPCIONES DE LA INVITACIÓN (en datos.js, todas opcionales)
- traslado, menu, notas (además de ninos y alojamiento): si se completan, aparece "Información útil".
  Con traslado, la confirmación pregunta quién lo usa.
- confirmarPorEvento: true = cada invitado marca si va a la ceremonia, a la fiesta o a las dos.
- preguntarChicos: true = la confirmación pregunta cuántos chicos van.
- sugerirCanciones / compartirFotos: false apaga "¿Qué canción no puede faltar?" o "Compartí tus fotos".
- paleta: '' = los colores del diseño; o el nombre de otra paleta (cada estilo.css las tiene al final,
  entre las marcas PALETAS). Cada diseño viene en 3 combinaciones.
- evento: 'quince' = invitación de 15 años (un solo nombre, "Mis 15", "La misa" en vez de "La ceremonia").
- musica: con música, al abrir la invitación cada invitado elige "Entrar con música" o "sin música".
- Link con los NOMBRES de cada invitado:  ?para=Familia%20Gómez&nombres=Juan,Sofía,Mateo  saluda a la
  familia y la confirmación pregunta quiénes de ellos van (uno por uno).

PROBAR UN DISEÑO CON SUS NOMBRES (muestras)
- En cualquier modelo de muestra:  ?nombre1=Ana&nombre2=Bruno&fecha=2027-10-16  (y &paleta=… para otro
  color) muestra el diseño con esos nombres y esa fecha al instante. Lo usan "Probalo ahora" de la portada,
  el panel de la compu y el botón "Nombres y colores" del celular. "Quiero este" lleva al pedido con
  diseño, nombres, fecha y color ya cargados.

PANEL DE LOS NOVIOS (/panel/) — LISTO, FALTA ACTIVARLO
- Muestra cada confirmación y cada canción, con totales, buscador y planilla para descargar.
  Ejemplo con datos inventados: /panel/?i=demo
- Para activarlo: 1) crear un proyecto en Supabase (la cuenta gratis permite 2 activos: hoy están ocupados);
  2) correr db/panel.sql en su editor SQL; 3) poner la dirección y la clave pública del proyecto en
  PANEL_URL y PANEL_CLAVE de modelos/*/comun.js (en todos) y de panel/index.html.
- Para cada pareja:  select crear_invitacion('lucia-y-mateo', 'Lucía y Mateo');  devuelve la clave.
  En su datos.js: panel: { invitacion: 'lucia-y-mateo' }. Su link: /panel/?i=lucia-y-mateo&c=<clave>.

INVITACIONES DE 15 AÑOS
- modelos/quince-rosa, quince-azul y quince-nocturno (Rosas en Acuarela, Flores Azules y Elegante
  Nocturno adaptados). Página de venta: /invitaciones-de-15-anos/. Cualquier otro diseño se adapta con
  evento: 'quince' en datos.js y cambiando los textos de pareja del index.html.
- Fotos de muestra de Unsplash (licencia libre).

IMPRESOS A JUEGO
- En la portada hay una sección con cartel, menú y número de mesa del mismo diseño (assets/impresos.webp)
  y en el pedido una casilla "Sumar los impresos". El precio se pasa con cada pedido.

DESPUÉS DE LA BODA
Pasado el día, la cuenta regresiva dice "¡Gracias por acompañarnos!" y la confirmación se cierra sola.
Para que la invitación de una pareja no aparezca en Google, index.html ya lleva <meta name="robots" content="noindex">.

PÁGINAS DE BÚSQUEDA (para aparecer en Google)
Seis direcciones generales, una por cada cosa que la gente busca (las búsquedas que piden lo mismo con otras
palabras van en la misma página: hacer páginas casi iguales es lo que Google castiga como "páginas puerta"):
  /                                              invitaciones de boda digitales, invitación digital para bodas,
                                                 invitaciones casamiento, invitaciones digitales Argentina
  /pagina-web-de-boda/                           crear una página web de boda, invitaciones en formato link web
  /invitaciones-de-casamiento-por-whatsapp/      invitaciones para mandar/enviar por WhatsApp (3 búsquedas)
  /tarjetas-de-casamiento-virtuales/             tarjetas de casamiento virtuales, creá tarjetas online
  /invitaciones-con-confirmacion-de-asistencia/  invitaciones digitales para boda con confirmación
  /invitaciones-de-15-anos/                      invitaciones de 15 años digitales
Y una por diseño, /disenos/<nombre>/ (ej. /disenos/playa-y-verano/ para "invitación de boda en la playa"):
su texto está en seo/disenos.js y muestra sus 3 colores. El título de cada tarjeta de la portada lleva ahí.
- El texto de cada una está en seo/paginas.js. Después de cambiarlo, o de cambiar el encabezado, el pie o
  las tarjetas de la portada, correr:  node seo/generar.js
  Arma las carpetas, los datos para Google, sitemap.xml y robots.txt, y revisa en cada página la lista de
  factores (título y descripción con la búsqueda y de largo correcto, un solo H1, búsqueda en el primer
  párrafo y en un subtítulo, variantes cubiertas, contenido suficiente y propio, sin repetir de más la
  búsqueda, imágenes con descripción, enlaces internos, preguntas a la vista). Si algo no se cumple, avisa.
- Si se conecta un dominio propio: cambiar DOMINIO en seo/generar.js y en actualizar-invitaciones.js, y
  las direcciones de index.html, y volver a correr los dos.
- Después de publicar: dar de alta el sitio en Google Search Console y enviar /sitemap.xml.

LO QUE HAY QUE COMPLETAR ANTES DE VENDER
1. script.js, al principio, el bloque CONTACTO: WhatsApp, Instagram y email.
   Con el WhatsApp cargado, el formulario de pedido abre WhatsApp con el pedido ya escrito
   (incluye el diseño que la persona eligió con "Quiero este"). El formulario pide el WhatsApp de la
   pareja (obligatorio) y el email (opcional).
2. Opiniones: la sección está apagada (hidden) hasta tener reseñas reales. Instrucciones en index.html.
3. Precio único: $ 55.000 (pesos argentinos, pago único). Está en index.html (sección Precios) y de ahí
   lo lee el pedido: se cambia en UN solo lugar.
4. Preguntas frecuentes (index.html): dicen "72 horas hábiles", "hasta un mes después de la boda"
   y "transferencia o Mercado Pago". CONFIRMARLOS o cambiarlos antes de vender: la entrega en 72 hs
   también está en la portada y en todas las páginas de búsqueda (seo/generar.js).
6. Con el WhatsApp de CONTACTO cargado aparece además un botón verde flotante "Consultanos" en todas las
   páginas de venta.
5. Medición de visitas (opcional): en script.js, bloque ANALITICA, pegar el ID de Google Analytics (G-…).

NOTAS
- Las tarjetas de "Diseños" usan una captura por modelo: assets/modelo-*-movil.webp (la primera pantalla
  del celular, 780×975), en el celular y en la compu; y una por cada color (modelo-<diseño>-<paleta>-movil.webp
  y -pantalla.webp). Los puntitos de color de cada tarjeta salen de las paletas de su estilo.css. Si se cambia el diseño de un modelo, volver a sacarla
  para que la tarjeta no mienta.
- La portada de la página de inicio y de las páginas de búsqueda es la misma: tres celulares con diseños
  reales (assets/modelo-*-pantalla.webp, la pantalla completa de un celular, 585×1203) y el aviso de
  "Carla confirmó". En las páginas de búsqueda, los tres diseños de cada una se eligen en seo/paginas.js
  (telefonos: [centro, izquierda, derecha]). Si cambia el diseño de un modelo, volver a sacar su captura.
- "Agregar al calendario": en iPhone, iPad y Mac entrega un archivo de calendario (abre el calendario del
  teléfono); en el resto abre Google Calendar.
- Tipografías de Google Fonts; sin conexión se usan tipografías alternativas.
- Interior de los modelos de acuarela: Bohemio es el diseño original; Eucalipto, Botánico, Coral, Pincelada,
  Flores Azules, Rosas y Rosas Bordó tienen además un interior propio (cuenta regresiva, tarjetas, itinerario,
  formulario y regalos) en el bloque "IDENTIDAD PROPIA" al final de su estilo.css. Si se toca la estructura
  común, revisar los ocho.
