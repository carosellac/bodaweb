/* =====================================================================
   PÁGINAS DE BÚSQUEDA — el contenido de cada una.
   Después de cambiar algo acá, correr:  node seo/generar.js
   (arma las carpetas de cada página, el sitemap y revisa la lista de factores).

   Regla de oro: UNA página por cada cosa que la gente busca. Las búsquedas que piden lo mismo con otras
   palabras van juntas en la misma página ("busquedas"); hacer páginas casi iguales para cada variante es
   lo que Google llama "páginas puerta" y castiga.
   ===================================================================== */
module.exports = [
{
  slug: 'pagina-web-de-boda',
  busqueda: 'página web de boda',
  busquedas: ['crear una página web de boda', 'invitaciones digitales para bodas en formato link web'],
  title: 'Página web de boda: tu invitación en un link | Boda Web',
  description: 'Creá la página web de tu boda: fecha, mapa, itinerario, fotos y confirmación de asistencia en un solo link para compartir. Diseños listos y precio fijo.',
  migas: 'Página web de boda',
  eyebrow: 'PÁGINA WEB DE BODA',
  h1: 'Página web de boda: <em>tu invitación en un link</em>',
  intro: 'Crear una página web de boda es la forma más simple de reunir en un solo lugar todo lo que tus invitados necesitan saber: cuándo es, dónde es, cómo llegar, qué ponerse y cómo confirmar. Es tu invitación de casamiento en formato link web, lista para mandar por WhatsApp.',
  modelo: 'eucalipto',
  modeloAlt: 'Página web de boda con el diseño Eucalipto y Acuarela vista en un celular',
  disenos: ['eucalipto', 'nocturno', 'minimalista', 'roja'],
  tituloDisenos: 'Diseños para la web de tu casamiento',
  contenido: `
    <section class="seo-bloque" aria-labelledby="partes-title">
      <div class="container seo-texto">
        <h2 id="partes-title">Qué tiene una página web de boda</h2>
        <p>No es una tarjeta con más espacio: es una invitación que se puede recorrer. Cada parte resuelve una pregunta que, si no, te harían por mensaje una y otra vez.</p>
        <ul class="seo-partes">
          <li><strong>Portada</strong>Sus nombres, la fecha y una foto de los dos. Es lo primero que ve cada invitado.</li>
          <li><strong>Cuenta regresiva</strong>Días, horas y minutos que faltan. Se actualiza sola.</li>
          <li><strong>Nuestra historia</strong>Cómo se conocieron, contado por ustedes, con un par de fotos.</li>
          <li><strong>Ceremonia y fiesta</strong>Horarios, lugares y un botón que abre el mapa del celular.</li>
          <li><strong>Itinerario</strong>Qué pasa y a qué hora: recepción, cena, vals, despedida.</li>
          <li><strong>Código de vestimenta</strong>Qué ponerse, con los colores sugeridos a la vista.</li>
          <li><strong>Galería</strong>Hasta seis fotos que se abren en grande con un toque.</li>
          <li><strong>Regalos</strong>Alias o CBU con un botón para copiarlo sin errores.</li>
          <li><strong>Confirmación de asistencia</strong>Cada invitado confirma y te llega el mensaje por WhatsApp.</li>
          <li><strong>Información útil</strong>Si hay chicos, dónde dormir si la boda es lejos, y música de fondo.</li>
        </ul>
        <p>Lo que no quieran mostrar, no se muestra: si no piden regalos o no quieren contar su historia, esa parte simplemente no aparece.</p>
      </div>
    </section>

    <section class="seo-bloque suave" aria-labelledby="link-title">
      <div class="container seo-texto">
        <h2 id="link-title">Invitación digital en formato link web: ¿es lo mismo que una página?</h2>
        <p>Sí. Cuando alguien dice <strong>invitación en formato link web</strong> habla de esto: una página propia que se abre tocando un link, sin descargar nada y sin crear una cuenta. La diferencia con una imagen o un PDF es que la página está viva: si cambia un horario, se corrige y todos ven el dato nuevo con el mismo link.</p>
        <p>Por eso las invitaciones digitales para bodas en formato link convienen en casamientos con mucha información, con invitados que viajan o con ceremonia y fiesta en lugares distintos. Una imagen se reenvía y se pierde en el chat; un link se abre siempre en la versión correcta.</p>
        <h3>¿Y se ve bien en la computadora?</h3>
        <p>La página está hecha para el celular, que es donde la abre casi todo el mundo. En una computadora se muestra igual que en un teléfono, dentro de un celular dibujado en la pantalla, así nadie ve una versión distinta de la que preparaste.</p>
      </div>
    </section>

    <section class="seo-bloque" aria-labelledby="crear-title">
      <div class="container seo-texto">
        <h2 id="crear-title">Cómo armar la página de su casamiento</h2>
        <ol>
          <li><strong>Elegí un diseño.</strong> Hay trece, del clásico con letras doradas al minimalista en blanco y negro. Podés recorrer cada uno completo antes de decidir.</li>
          <li><strong>Mandanos los datos y las fotos.</strong> Nombres, fecha, lugares, horarios y lo que quieran contar. No hace falta saber nada de computación ni usar ningún programa.</li>
          <li><strong>Recibí tu link.</strong> Te pasamos la dirección de tu página para que la revises en tu celular. Si querés cambiar algo, lo cambiamos.</li>
        </ol>
        <p>La dirección lleva sus nombres, algo como <em>…/parejas/lucia-y-mateo/</em>, así queda linda para compartir. Y la página no aparece en Google: sólo la ve quien tiene el link.</p>
      </div>
    </section>`,
  faqs: [
    ['¿Tengo que comprar un dominio o un hosting?', 'No. La página queda publicada en una dirección con sus nombres y no tenés que contratar nada aparte.'],
    ['¿La página de boda aparece en Google?', 'No. Está marcada para que los buscadores no la muestren: sólo la abre quien recibe el link.'],
    ['¿Puedo cambiar datos después de publicarla?', 'Sí. Si cambia un horario o un lugar, nos escribís y lo corregimos. Todos ven el dato nuevo con el mismo link.'],
    ['¿Cuánto tiempo queda online?', 'Hasta un mes después del casamiento, para que los invitados la consulten hasta el último día. Si la querés más tiempo, se extiende.'],
  ],
},
{
  slug: 'invitaciones-de-casamiento-por-whatsapp',
  busqueda: 'invitaciones de casamiento por WhatsApp',
  busquedas: ['invitaciones de casamiento digitales para mandar por whatsapp', 'invitaciones de boda digitales whatsapp', 'invitaciones de boda para enviar por whatsapp'],
  title: 'Invitaciones de casamiento por WhatsApp | Boda Web',
  description: 'Invitaciones de casamiento digitales para mandar por WhatsApp: un link con foto y sus nombres en la vista previa, y confirmación que vuelve a tu WhatsApp.',
  migas: 'Invitaciones por WhatsApp',
  eyebrow: 'INVITACIONES POR WHATSAPP',
  h1: 'Invitaciones de casamiento <em>por WhatsApp</em>',
  intro: 'Las invitaciones de casamiento por WhatsApp llegan donde ya están todos tus invitados: en el chat. Mandás un link y se abre una página con la foto de ustedes, la fecha, el mapa y un botón para confirmar, sin descargar nada.',
  visual: 'chat-invitacion',
  disenos: ['playa', 'coral', 'pincel', 'azul'],
  contenido: `
    <section class="seo-bloque" aria-labelledby="porque-title">
      <div class="container seo-texto">
        <h2 id="porque-title">Por qué mandar la invitación de boda por WhatsApp</h2>
        <p>Porque es el lugar donde tus invitados de verdad leen los mensajes. Una invitación de boda para enviar por WhatsApp no depende del correo, no se pierde en una casilla de promociones y llega en segundos, aunque el invitado viva en otra provincia o en otro país.</p>
        <ul>
          <li><strong>Se abre con un toque.</strong> El link abre la invitación en el navegador del celular: no hay que instalar ninguna aplicación.</li>
          <li><strong>Sale con foto.</strong> En el chat aparece una vista previa con la foto de portada y sus nombres, no un link pelado.</li>
          <li><strong>Siempre está al día.</strong> Si cambia algo, se corrige la página y el mismo link muestra lo nuevo. No hay que mandar otra imagen.</li>
          <li><strong>Sirve también fuera de WhatsApp.</strong> El mismo link funciona por mail, Instagram o mensaje de texto, para quien no use WhatsApp.</li>
        </ul>
      </div>
    </section>

    <section class="seo-bloque suave" aria-labelledby="como-title">
      <div class="container seo-texto">
        <h2 id="como-title">Cómo mandar tu invitación digital por WhatsApp</h2>
        <h3>A todos juntos</h3>
        <p>Pegás el link en el grupo de la familia o de los amigos y listo. Cada uno lo abre cuando quiere y confirma desde su celular.</p>
        <h3>A cada invitado con su nombre</h3>
        <p>Si preferís algo más personal, cada link puede llevar el nombre del invitado y cuántos lugares tiene. Al abrirla, la invitación lo saluda —<em>"¡Hola, Familia Gómez! Esta invitación es para 4 personas"</em>—, deja su nombre ya escrito en la confirmación y no permite anotar a más personas de las previstas. Es la versión digital de escribir el nombre a mano en el sobre.</p>
        <h3>Cuándo mandarla</h3>
        <p>Lo habitual es entre dos y tres meses antes del casamiento, y bastante antes si hay invitados que tienen que viajar. Como la página tiene cuenta regresiva y fecha límite para confirmar, el mismo link sirve de recordatorio cuando se acerca el día.</p>
      </div>
    </section>

    <section class="seo-bloque" aria-labelledby="vuelve-title">
      <div class="container seo-texto">
        <h2 id="vuelve-title">La confirmación también vuelve por WhatsApp</h2>
        <p>Cuando un invitado confirma, su celular abre WhatsApp con un mensaje ya escrito para ustedes: su nombre, si viene, cuántos son y si tiene alguna comida especial. Sólo tiene que tocar enviar. Así las respuestas llegan todas al mismo chat y no hay que salir a preguntar uno por uno.</p>
        <p>Si querés ver el recorrido completo, abrí cualquiera de los diseños de abajo en tu celular y probá confirmar: te muestra el mensaje tal como les llegaría.</p>
      </div>
    </section>`,
  faqs: [
    ['¿Se puede mandar la invitación a un grupo de WhatsApp?', 'Sí. Es el mismo link para todos: lo pegás en el grupo y cada invitado lo abre y confirma desde su celular.'],
    ['¿El invitado tiene que descargar algo?', 'No. El link abre la invitación en el navegador del celular, sin aplicaciones ni registros.'],
    ['¿Qué pasa si alguien no usa WhatsApp?', 'El link funciona igual por mail, Instagram o mensaje de texto. La invitación es una página web, no depende de WhatsApp.'],
    ['¿Se ve igual en iPhone y en Android?', 'Sí. Es una página web: se abre en el navegador de cualquier celular, sea iPhone o Android, y se acomoda al tamaño de la pantalla.'],
  ],
},
{
  slug: 'tarjetas-de-casamiento-virtuales',
  busqueda: 'tarjetas de casamiento virtuales',
  busquedas: ['creá tarjetas de casamiento online', 'tarjetas de casamiento online'],
  title: 'Tarjetas de casamiento virtuales y online | Boda Web',
  description: 'Tarjetas de casamiento virtuales listas para compartir: comparación con la impresa, ejemplos de textos y trece diseños. Creá la tuya online sin programas.',
  migas: 'Tarjetas de casamiento virtuales',
  eyebrow: 'TARJETAS VIRTUALES',
  h1: 'Tarjetas de casamiento <em>virtuales</em>',
  intro: 'Las tarjetas de casamiento virtuales reemplazan a la tarjeta impresa sin perder lo lindo: un diseño cuidado, sus nombres y la fecha. Y suman lo que el papel no puede: mapa, confirmación de asistencia y cambios de último momento.',
  modelo: 'rosa',
  modeloAlt: 'Tarjeta de casamiento virtual con el diseño Rosas en Acuarela en un celular',
  disenos: ['clasico', 'rosa', 'minimalista', 'coral', 'bohemio', 'jardin'],
  contenido: `
    <section class="seo-bloque" aria-labelledby="comparacion-title">
      <div class="container seo-texto">
        <h2 id="comparacion-title">Tarjeta virtual o tarjeta impresa</h2>
        <p>No es una cuestión de moda: cada una resuelve cosas distintas. Esta es la comparación honesta.</p>
        <div class="tabla-desliza">
          <table class="comparativa">
            <thead><tr><th scope="col"></th><th scope="col">Tarjeta virtual</th><th scope="col">Tarjeta impresa</th></tr></thead>
            <tbody>
              <tr><th scope="row">Costo</th><td>Un solo precio, sin importar cuántos invitados haya.</td><td>Se paga por unidad, más sobres y envíos.</td></tr>
              <tr><th scope="row">Cómo llega</th><td>Por WhatsApp, mail o redes, en segundos y a cualquier lugar.</td><td>En mano o por correo, con días de demora.</td></tr>
              <tr><th scope="row">Cambios</th><td>Se corrigen y todos ven el dato nuevo con el mismo link.</td><td>Una vez impresa, no se puede cambiar.</td></tr>
              <tr><th scope="row">Mapa y horarios</th><td>Botón para abrir el mapa e itinerario completo.</td><td>Sólo la dirección escrita.</td></tr>
              <tr><th scope="row">Confirmaciones</th><td>Cada invitado confirma desde su celular.</td><td>Hay que llamar o escribir a cada uno.</td></tr>
              <tr><th scope="row">Recuerdo</th><td>Queda en el celular y se puede volver a abrir.</td><td>Es un objeto para guardar: su punto fuerte.</td></tr>
            </tbody>
          </table>
        </div>
        <p>Muchas parejas combinan las dos: tarjeta virtual para todos y unas pocas impresas para los abuelos o para quien prefiera el papel.</p>
      </div>
    </section>

    <section class="seo-bloque suave" aria-labelledby="crear-title">
      <div class="container seo-texto">
        <h2 id="crear-title">Cómo crear tu tarjeta de casamiento online</h2>
        <p>No hace falta aprender a usar un editor ni pelearse con plantillas. Creá tu tarjeta de casamiento online en tres pasos:</p>
        <ol>
          <li><strong>Elegí el estilo.</strong> Clásico, moderno, natural, de playa o nocturno: abajo están todos para recorrer.</li>
          <li><strong>Pasanos sus datos y fotos.</strong> Nosotros armamos la tarjeta con su texto, sus colores y sus imágenes.</li>
          <li><strong>Compartila.</strong> Recibís un link para mandar por WhatsApp. Si algo no te convence, se ajusta.</li>
        </ol>
      </div>
    </section>

    <section class="seo-bloque" aria-labelledby="textos-title">
      <div class="container seo-texto">
        <h2 id="textos-title">Qué texto poner en la tarjeta de casamiento</h2>
        <p>El texto marca el tono de toda la fiesta. Algunas ideas para elegir o adaptar:</p>
        <h3>Formal</h3>
        <p class="frase-ejemplo">Con la bendición de nuestras familias, tenemos el honor de invitarlos a celebrar nuestro casamiento.</p>
        <h3>Cálido</h3>
        <p class="frase-ejemplo">Queremos compartir el día más importante de nuestras vidas con las personas que más queremos. Nos encantaría que estés.</p>
        <h3>Descontracturado</h3>
        <p class="frase-ejemplo">Después de tanto tiempo, ¡nos casamos! Traé ganas de bailar, que del resto nos ocupamos nosotros.</p>
        <h3>Para una boda al aire libre</h3>
        <p class="frase-ejemplo">Entre árboles, mates y la gente de siempre, queremos decirnos que sí. Vení a celebrarlo con nosotros.</p>
        <p>Además del texto principal, conviene que la tarjeta diga claramente la fecha, la hora, el lugar, la fecha límite para confirmar y, si corresponde, el código de vestimenta.</p>
      </div>
    </section>`,
  faqs: [
    ['¿Qué diferencia hay entre una tarjeta virtual y una invitación digital?', 'Ninguna en la práctica: son dos nombres para lo mismo. En nuestro caso la tarjeta es una página con mapa, confirmación y fotos, no sólo una imagen.'],
    ['¿Puedo poner nuestras propias fotos?', 'Sí. La portada, la historia y la galería llevan sus fotos. Sirve cualquier foto del celular.'],
    ['¿Sirve para el civil y para la fiesta?', 'Sí. Se pueden poner los dos eventos con sus horarios y lugares, o uno solo.'],
    ['¿Cuánto tarda en estar lista?', 'Normalmente entre 3 y 5 días hábiles desde que recibimos los datos y las fotos.'],
  ],
},
{
  slug: 'invitaciones-con-confirmacion-de-asistencia',
  busqueda: 'invitaciones digitales para boda con confirmación',
  busquedas: ['invitaciones digitales para boda con confirmación de asistencia'],
  title: 'Invitaciones digitales de boda con confirmación | Boda Web',
  description: 'Invitaciones digitales para boda con confirmación de asistencia: cada invitado confirma desde el celular y te llega por WhatsApp quién viene y cuántos son.',
  migas: 'Invitaciones con confirmación',
  eyebrow: 'CONFIRMACIÓN DE ASISTENCIA',
  h1: 'Invitaciones digitales para boda <em>con confirmación</em>',
  intro: 'Las invitaciones digitales para boda con confirmación de asistencia te ahorran la parte más pesada de organizar: saber quién viene. Cada invitado confirma desde su celular en un minuto y la respuesta te llega por WhatsApp.',
  visual: 'chat-confirmacion',
  disenos: ['clasico', 'botanico', 'nocturno', 'jardin'],
  contenido: `
    <section class="seo-bloque" aria-labelledby="funciona-title">
      <div class="container seo-texto">
        <h2 id="funciona-title">Cómo funciona la confirmación de asistencia</h2>
        <p>Desde el lado del invitado, son cuatro toques:</p>
        <ol>
          <li>Abre el link de la invitación y baja hasta <strong>"¿Contamos con vos?"</strong>.</li>
          <li>Escribe su nombre y elige si va a poder ir.</li>
          <li>Si va, indica cuántos son y si alguien tiene una comida especial o alergia.</li>
          <li>Toca <strong>Confirmar por WhatsApp</strong>: se abre el chat con ustedes y el mensaje ya escrito.</li>
        </ol>
        <p>No necesita cuenta, contraseña ni aplicación. Y si se equivoca, vuelve a confirmar y les llega un mensaje nuevo: vale el último.</p>
      </div>
    </section>

    <section class="seo-bloque suave" aria-labelledby="datos-title">
      <div class="container seo-texto">
        <h2 id="datos-title">Qué te llega de cada invitado</h2>
        <ul>
          <li><strong>Nombre</strong> de quien confirma.</li>
          <li><strong>Si viene o no.</strong> También se avisa cuando alguien no puede: saberlo a tiempo vale tanto como un sí.</li>
          <li><strong>Cuántas personas</strong> vienen con esa invitación.</li>
          <li><strong>Comidas especiales</strong>: vegetariano, celíaco, alergias.</li>
          <li><strong>Un mensaje</strong> para ustedes, si quiere dejarles uno.</li>
        </ul>
        <p>Con eso armás la lista para el salón y el catering sin perseguir a nadie.</p>
      </div>
    </section>

    <section class="seo-bloque" aria-labelledby="control-title">
      <div class="container seo-texto">
        <h2 id="control-title">Fecha límite, lugares por invitado y después de la boda</h2>
        <h3>Fecha límite para confirmar</h3>
        <p>La invitación muestra hasta cuándo se puede confirmar, para que nadie lo deje para último momento. Lo habitual es pedir la confirmación un mes antes del casamiento.</p>
        <h3>Lugares por invitado</h3>
        <p>Cada link puede decir para cuántas personas es la invitación. Si alguien intenta anotar más, la página se lo avisa con amabilidad. Es la forma más simple de evitar acompañantes que no estaban previstos.</p>
        <h3>Cuando ya pasó la boda</h3>
        <p>Al día siguiente la confirmación se cierra sola y la invitación pasa a decir <em>"¡Gracias por acompañarnos!"</em>.</p>
      </div>
    </section>

    <section class="seo-bloque suave" aria-labelledby="porque-title">
      <div class="container seo-texto">
        <h2 id="porque-title">Por qué la confirmación digital funciona mejor</h2>
        <p>Pedir que confirmen por teléfono parece simple hasta que hay ciento cincuenta invitados. Las respuestas llegan de a una, por canales distintos, y siempre falta alguien. Con la confirmación dentro de la invitación pasan tres cosas: el invitado responde en el mismo momento en que la abre, todas las respuestas tienen el mismo formato y quedan escritas en un solo chat.</p>
        <p>Además, quien no puede ir también avisa. Es la respuesta que más cuesta conseguir por teléfono, y la que más sirve para ajustar el número de cubiertos y la distribución de las mesas.</p>
      </div>
    </section>

    <section class="seo-bloque" aria-labelledby="ordenar-title">
      <div class="container seo-texto">
        <h2 id="ordenar-title">Consejos para organizar las confirmaciones de la boda</h2>
        <ul>
          <li>Anotá cada respuesta en una planilla con tres columnas: confirmados, no vienen y sin respuesta.</li>
          <li>Una semana antes de la fecha límite, reenviá el link a quienes no respondieron: la cuenta regresiva hace de recordatorio.</li>
          <li>Pasale al catering el total de comidas especiales apenas cierre la confirmación.</li>
        </ul>
      </div>
    </section>`,
  faqs: [
    ['¿Los invitados necesitan descargar una aplicación para confirmar?', 'No. Confirman desde la misma invitación, en el navegador del celular, y el mensaje sale por WhatsApp.'],
    ['¿Puedo limitar cuántas personas vienen por invitación?', 'Sí. Cada link puede llevar la cantidad de lugares, y la invitación no deja anotar a más.'],
    ['¿Qué pasa si un invitado se equivoca al confirmar?', 'Vuelve a confirmar con los datos correctos y te llega un mensaje nuevo.'],
    ['¿Hay una lista de confirmados en algún lado?', 'Las confirmaciones te llegan por WhatsApp, una por invitado. Te recomendamos ir anotándolas en una planilla.'],
  ],
},
];
