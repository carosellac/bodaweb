BODA WEB — LANDING DE INVITACIONES DE CASAMIENTO + 6 MODELOS DE INVITACIÓN

Archivos:
- index.html       La página de venta (portada, diseños, cómo funciona, precio, preguntas)
- styles.css       Estilos de la página de venta (celular, tablet y computadora)
- script.js        Comportamiento de la página de venta (menú, pedido) y DATOS DE CONTACTO
- assets/          Fotos, flores decorativas, capturas de los 6 modelos (modelo-*.webp) e imagen para compartir
- modelos/         LOS 6 MODELOS DE INVITACIÓN (ver abajo)
- favicon.*        Ícono de la pestaña y del acceso directo en el celular
- robots.txt       Permiso para los buscadores

PUBLICACIÓN
- Repositorio: github.com/carosellac/bodaweb (rama master). Cada push se publica solo en Vercel.
- Dirección actual: https://bodaweb-rose.vercel.app
- Si se conecta un dominio propio, cambiar la dirección en index.html (canonical, og:url y og:image).

LOS 6 MODELOS (carpeta modelos/)
  modelos/clasico/       Clásico & Romántico   crema, dorado viejo, serif, tarjeta con marco
  modelos/minimalista/   Moderno & Minimalista blanco y negro, tipografía enorme, fotos en blanco y negro
  modelos/bohemio/       Bohemio & Natural     arena y terracota, fotos en arco, adornos botánicos
  modelos/nocturno/      Elegante Nocturno     azul noche y dorado, estilo gala / black tie
  modelos/jardin/        Jardín en Acuarela    manchas de color pastel, flores, fotos tipo polaroid
  modelos/playa/         Playa & Verano        azul mar y coral, olas entre secciones
Se ven en la web en /modelos/<nombre>/ (ej. https://bodaweb-rose.vercel.app/modelos/playa/).
Las tarjetas de "Diseños" de la página de venta llevan a cada uno.

Cada modelo es una carpeta completa e independiente:
  index.html   la invitación (secciones: portada, cuenta regresiva, invitación, historia, ceremonia y
               fiesta, itinerario, vestimenta, galería, regalos, confirmación de asistencia, pie)
  estilo.css   su diseño
  datos.js     LOS DATOS DE LA PAREJA (nombres, fecha, lugares, WhatsApp, alias, hashtag…)
  comun.js     el comportamiento (cuenta regresiva, mapas, calendario, galería, confirmación, música).
               Es IDÉNTICO en los 6 modelos: no hace falta tocarlo. Si se corrige algo, copiarlo a los 6.
  fotos/       portada.webp · historia-1.webp · historia-2.webp · galeria-1.webp … galeria-6.webp
               (las de muestra son de Unsplash, de uso libre)

CÓMO ARMAR LA INVITACIÓN DE UNA PAREJA (sin programar)
1. Copiar la carpeta del modelo elegido a una carpeta nueva, por ejemplo:
      modelos/playa/  →  parejas/lucia-y-mateo/
   (si se la nombra con los nombres de la pareja queda una dirección linda para compartir:
    https://bodaweb-rose.vercel.app/parejas/lucia-y-mateo/)
2. Abrir datos.js de la carpeta nueva y completar todo: nombres, fecha y hora (formato
   2027-01-23T18:30:00-03:00), lugares y direcciones, código de vestimenta, fecha límite para
   confirmar, el WhatsApp al que llegan las confirmaciones (549 + área sin 0 + número sin 15),
   alias/CBU y titular para los regalos, hashtag. Lo que quede vacío no se muestra.
3. Reemplazar las fotos de fotos/ por las de la pareja, CON LOS MISMOS NOMBRES (portada.webp,
   historia-1.webp, …). Sirve cualquier medida: el diseño las acomoda. Conviene que pesen menos de
   400 KB cada una (en webp o jpg; si son .jpg, cambiar la terminación en index.html).
4. Textos largos (la historia, el itinerario, la aclaración de vestimenta): están en index.html,
   marcados con comentarios "Texto de ejemplo: cambialo…". Se editan ahí mismo.
5. Música de fondo (opcional): dejar un archivo musica.mp3 en la carpeta. El botón aparece solo.
6. Hacer push: en un minuto queda publicada. Probar en el celular antes de mandarla.
Para que la invitación de una pareja no aparezca en Google, index.html ya lleva <meta name="robots" content="noindex">.

LO QUE HAY QUE COMPLETAR ANTES DE VENDER
1. script.js, al principio, el bloque CONTACTO: WhatsApp, Instagram y email.
   Con el WhatsApp cargado, el formulario de pedido abre WhatsApp con el pedido ya escrito
   (incluye el diseño que la persona eligió con "Quiero este").
2. Opiniones: la sección está apagada (hidden) hasta tener reseñas reales. Instrucciones en index.html.
3. Precio único: $ 55.000 (pesos argentinos, pago único). Está en index.html (sección Precios) y en
   script.js (renglón "Precio:" del pedido): si cambia, tocar los dos lugares.

NOTAS
- Las capturas de los modelos (assets/modelo-*.webp) se sacaron de los modelos reales a 1200×675.
  Si se cambia el diseño de un modelo, volver a sacarla para que la tarjeta no mienta.
- Tipografías de Google Fonts; sin conexión se usan tipografías alternativas.
