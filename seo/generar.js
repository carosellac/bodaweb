/* =====================================================================
   GENERADOR DE LAS PÁGINAS DE BÚSQUEDA —  node seo/generar.js

   · Arma una carpeta por página (ej. /pagina-web-de-boda/index.html) con el MISMO encabezado, pie y
     ventana de pedido que la portada (se copian de index.html: si cambia la portada, volver a correrlo).
   · Escribe los datos para Google (ruta, servicio con precio y preguntas frecuentes) en cada página y
     en la portada, el sitemap.xml y la línea del sitemap en robots.txt.
   · Revisa la LISTA DE FACTORES en cada página y corta con error si alguno no se cumple.
   El contenido de cada página está en seo/paginas.js; el de las páginas de cada diseño (/disenos/…), en
   seo/disenos.js.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const DOMINIO = 'https://bodaweb-rose.vercel.app';   // si se conecta un dominio propio, cambiarlo acá
const PRECIO = '55000';
const RAIZ = path.join(__dirname, '..');
const PAGINAS = require('./paginas.js');
const DISENOS = require('./disenos.js');
const hoy = new Date().toISOString().slice(0, 10);

const leer = f => fs.readFileSync(path.join(RAIZ, f), 'utf8');
const escribir = (f, t) => { fs.mkdirSync(path.dirname(path.join(RAIZ, f)), { recursive: true }); fs.writeFileSync(path.join(RAIZ, f), t); };
const esc = t => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const sinEtiquetas = t => String(t).replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
const VACIAS = new Set(['para', 'con', 'por', 'de', 'del', 'la', 'las', 'los', 'el', 'en', 'una', 'un', 'y', 'tu', 'crea']);
const clave = t => normal(t).split(' ').filter(w => w.length > 2 && !VACIAS.has(w));
const normal = t => sinEtiquetas(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ ]/g, ' ').replace(/\s+/g, ' ').trim();

// ---------- Piezas de la portada que comparten todas las páginas ----------
let portada = leer('index.html');
const cuerpo = portada.slice(portada.indexOf('<body>') + 6);
const cabecera = cuerpo.slice(0, cuerpo.indexOf('<main id="contenido"'))
  .replace(/href="#inicio"/g, 'href="/"').replace(/href="#(disenos|como-funciona|precios|faq)"/g, 'href="/#$1"').replace(/ class="current"/g, '');
const pie = cuerpo.slice(cuerpo.indexOf('</main>') + 7, cuerpo.indexOf('</body>'))
  .replace(/href="#inicio"/g, 'href="/"').replace(/href="#(disenos|como-funciona|precios|faq)"/g, 'href="/#$1"');
if (!cabecera.includes('site-header') || !pie.includes('order-dialog')) throw new Error('No se encontraron el encabezado o el pie en index.html');

// Tarjeta de cada diseño, copiada de la portada (misma foto, textos y botones) con direcciones absolutas
const tarjeta = slug => {
  const m = new RegExp('<article class="design-card">\\s*<a class="design-image" href="modelos/' + slug + '/"[\\s\\S]*?</article>').exec(portada);
  if (!m) throw new Error('No está la tarjeta del diseño "' + slug + '" en la portada');
  return m[0].replace(/href="modelos\//g, 'href="/modelos/').replace(/src="assets\//g, 'src="/assets/').replace(/data-img="assets\//g, 'data-img="/assets/');
};
const modeloNombre = slug => { try { return (new RegExp('data-design="([^"]+)"[^>]*>Quiero este</button>').exec(tarjeta(slug)) || [])[1]; } catch (e) { return ''; } };
// Tarjeta de un diseño de 15 años (no están en el catálogo de la portada)
const tarjetaQuince = ([m, nombre, texto]) => `<article class="design-card">
          <a class="design-image" href="/modelos/${m}/" aria-label="Ver el diseño ${esc(nombre)} para 15 años"><img src="/assets/modelo-${m}-movil.webp" alt="Invitación de 15 años ${esc(nombre)} vista en el celular" loading="lazy" width="780" height="975" /></a>
          <div class="design-card-body">
            <span class="design-card-title">${esc(nombre)}</span>
            <span class="design-card-text">${esc(texto)}</span>
            <div class="design-card-actions"><a class="design-card-link" href="/modelos/${m}/">Ver diseño <svg class="icon icon-btn"><use href="#i-arrow"/></svg></a><button type="button" class="design-card-choose js-elegir" data-design="${esc(nombre)} · 15 años">Quiero este</button></div>
          </div>
        </article>`;

// ---------- Datos para Google ----------
const servicio = (nombre, tipo) => ({ '@type': 'Service', name: nombre, serviceType: tipo || 'Invitaciones de boda digitales', areaServed: { '@type': 'Country', name: 'Argentina' },
  provider: { '@type': 'Organization', name: 'Boda Web', url: DOMINIO + '/' },
  offers: { '@type': 'Offer', price: PRECIO, priceCurrency: 'ARS', availability: 'https://schema.org/InStock', url: DOMINIO + '/#precios' } });
const faqLd = faqs => ({ '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const ld = grafo => '<script type="application/ld+json">' + JSON.stringify({ '@context': 'https://schema.org', '@graph': grafo }).replace(/</g, '\\u003c') + '</script>';

// ---------- Visuales propios de algunas páginas ----------
const VISUALES = {
  'chat-invitacion': `<div class="chat" role="img" aria-label="Ejemplo de cómo se ve la invitación en un chat de WhatsApp: una foto de la pareja con sus nombres y el link">
            <div class="chat-cabecera"><span class="chat-avatar" aria-hidden="true">M</span><span><span class="chat-nombre">Tía Marta</span><br /><span class="chat-estado">en línea</span></span></div>
            <div class="burbuja propia"><span class="burbuja-vista"><img src="/modelos/playa/fotos/compartir.jpg" alt="" width="1200" height="630" loading="lazy" /><span><strong>Lucía &amp; Mateo · ¡Nos casamos frente al mar!</strong><em>bodaweb-rose.vercel.app</em></span></span>¡Tía! Te mandamos la invitación 💛<small>18:42 ✓✓</small></div>
            <div class="burbuja">¡Qué hermosa! Ya confirmé que vamos los dos 🎉<small>18:51</small></div>
          </div>`,
  'chat-confirmacion': `<div class="chat" role="img" aria-label="Ejemplo de una confirmación de asistencia que llega por WhatsApp con el nombre, cuántos son y comidas especiales">
            <div class="chat-cabecera"><span class="chat-avatar" aria-hidden="true">C</span><span><span class="chat-nombre">Carla Pérez</span><br /><span class="chat-estado">en línea</span></span></div>
            <div class="burbuja">¡Hola! Soy Carla Pérez.<br />Confirmo que voy al casamiento de Valentina y Nicolás. 🎉<br />Somos 2 personas.<br />Comida / restricciones: una vegetariana<br />Mensaje: ¡No veo la hora de bailar con ustedes!<small>20:14</small></div>
            <div class="burbuja propia">¡Gracias, Carla! Ya los anotamos 💛<small>20:20 ✓✓</small></div>
          </div>`,
};

// ---------- Armado de cada página ----------
function armar(p, todas) {
  const url = DOMINIO + '/' + p.slug + '/';
  const imagenCompartir = DOMINIO + '/modelos/' + (p.modelo || p.disenos[0]) + '/fotos/compartir.jpg';
  // Portada igual a la de la página de inicio: tres celulares con diseños reales (los de esta página) y el aviso de confirmación
  const [tc, ti, td] = p.telefonos;
  const nombreDe = s => modeloNombre(s) || s;
  const visual = `<div class="hero2-telefonos">
            <a class="tel tel-izq" href="/modelos/${ti}/" tabindex="-1" aria-hidden="true"><img src="/assets/modelo-${ti}-pantalla.webp" width="585" height="1203" alt="" /></a>
            <a class="tel tel-der" href="/modelos/${td}/" tabindex="-1" aria-hidden="true"><img src="/assets/modelo-${td}-pantalla.webp" width="585" height="1203" alt="" /></a>
            <a class="tel tel-centro" href="/modelos/${tc}/"><img src="/assets/modelo-${tc}-pantalla.webp" width="585" height="1203" alt="${esc(sinEtiquetas(p.h1))}: diseños ${esc([tc, ti, td].map(nombreDe).join(', '))} vistos en el celular" fetchpriority="high" /></a>
            <div class="hero2-aviso" aria-hidden="true">
              <span class="hero2-aviso-icono"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L19 7"/></svg></span>
              <span><strong>${esc(p.aviso ? p.aviso[0] : 'Carla confirmó')}</strong><small>${esc(p.aviso ? p.aviso[1] : 'Vienen 2 · llegó por WhatsApp')}</small></span>
            </div>
          </div>`;
  // La conversación de WhatsApp de muestra (páginas de WhatsApp y de confirmación) baja a una sección propia
  const chat = p.visual ? `
    <section class="seo-bloque suave" aria-labelledby="chat-title">
      <div class="container seo-chat">
        <div class="seo-texto"><h2 id="chat-title">${esc(p.chatTitulo)}</h2><p>${p.chatTexto}</p></div>
        ${VISUALES[p.visual]}
      </div>
    </section>` : '';
  const mitad = Math.ceil(p.faqs.length / 2);
  const det = ([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`;
  const otras = todas.filter(o => o.slug !== p.slug);
  const grafo = [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: DOMINIO + '/' }, { '@type': 'ListItem', position: 2, name: p.migas, item: url }] },
    { ...servicio(sinEtiquetas(p.h1), p.tipo === 'quince' ? 'Invitaciones de 15 años digitales' : ''), url },
    faqLd(p.faqs),
  ];
  return `<!doctype html>
<html lang="es-AR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#fbf8f5" />
  <script>document.documentElement.classList.add('js')</script>
  <title>${esc(p.title)}</title>
  <meta name="description" content="${esc(p.description)}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Boda Web" />
  <meta property="og:title" content="${esc(p.title)}" />
  <meta property="og:description" content="${esc(p.description)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${imagenCompartir}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="es_AR" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/styles.css" />
  <script defer src="/script.js"></script>
  ${ld(grafo)}
</head>
<body>${cabecera}<main id="contenido" tabindex="-1">
    <section class="hero hero2 hero2-pagina" aria-labelledby="hero-title">
      <div class="container hero2-grid">
        <div class="hero2-copy">
          <nav class="migas" aria-label="Estás en"><ol><li><a href="/">Inicio</a></li><li aria-current="page">${esc(p.migas)}</li></ol></nav>
          <p class="eyebrow">${p.eyebrow}</p>
          <h1 id="hero-title">${p.h1}</h1>
          <p class="hero2-texto">${p.intro}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#disenos">Ver diseños <svg class="icon icon-btn"><use href="#i-arrow"/></svg></a>
            <button class="btn btn-outline js-start" type="button">Quiero mi invitación</button>
          </div>
          <ul class="hero2-datos">
            <li><a href="#precio-title"><strong>$55.000</strong><span>todo incluido</span></a></li>
            <li><strong>72 hs</strong><span>y la tenés lista</span></li>
            <li><strong>Cambios</strong><span>incluidos</span></li>
          </ul>
        </div>
        <div class="hero2-visual">
          ${visual}
        </div>
      </div>
    </section>
${p.contenido}${chat}

    <section class="designs section-container" id="disenos" aria-labelledby="designs-title">
      <div class="section-intro"><p class="eyebrow">DISEÑOS</p><h2 id="designs-title">${esc(p.tituloDisenos || ('Diseños para tu ' + p.migas.toLowerCase().replace(/^invitaciones /, 'invitación ').replace(/^tarjetas /, 'tarjeta ')))}</h2><p class="lead">${p.leadDisenos ? esc(p.leadDisenos) : 'Tocá "Ver diseño" para recorrerlo completo en tu celular. Hay trece en total: <a href="/#disenos">ver todos</a>.'}</p></div>
      <div class="design-grid">
        ${(p.quince ? p.quince.map(tarjetaQuince) : p.disenos.map(tarjeta)).join('\n        ')}
      </div>
    </section>

    <section class="seo-bloque suave" aria-labelledby="precio-title">
      <div class="container">
        <h2 id="precio-title" class="visually-hidden">Precio</h2>
        <div class="seo-precio">
          <p>Un solo precio, todo incluido<strong data-precio>$ 55.000</strong>Pesos argentinos · pago único</p>
          <button class="btn btn-primary js-start" type="button">Quiero mi invitación</button>
        </div>
      </div>
    </section>

    <section class="faq" id="faq" aria-labelledby="faq-title">
      <div class="container">
        <div class="section-intro"><p class="eyebrow">DUDAS</p><h2 id="faq-title">Preguntas frecuentes</h2></div>
        <div class="faq-grid">
        <div class="faq-column">
          ${p.faqs.slice(0, mitad).map(det).join('\n          ')}
        </div>
        <div class="faq-column">
          ${p.faqs.slice(mitad).map(det).join('\n          ')}
        </div>
        </div>
      </div>
    </section>

    <section class="relacionadas" aria-labelledby="relacionadas-title">
      <div class="container">
        <div class="section-intro"><p class="eyebrow">SEGUÍ LEYENDO</p><h2 id="relacionadas-title">Más sobre invitaciones digitales</h2></div>
        <div class="guias-grid">
          ${otras.map(o => `<a class="guia" href="/${o.slug}/"><span class="guia-titulo">${esc(o.migas)}</span><span class="guia-texto">${esc(o.description.split(':')[0].split('.')[0])}.</span></a>`).join('\n          ')}
        </div>
        <p class="faq-mas"><a href="/">Volver al inicio</a></p>
      </div>
    </section>
  </main>
${pie}</body>
</html>
`;
}

// ---------- Página de cada diseño (/disenos/<slug>/) ----------
const listaPaletas = m => {
  const css = leer('modelos/' + m + '/estilo.css');
  const v = (/--bw-paletas:"([^"]*)"/.exec(css) || [])[1] || '';
  return v.split(';').filter(Boolean).map(x => { const [slug, nombre, c1, c2] = x.split('|'); return { slug, nombre, c1, c2 }; });
};
function armarDiseno(d) {
  const url = DOMINIO + '/disenos/' + d.slug + '/';
  const pals = listaPaletas(d.modelo);
  const imgPal = (x, tipo) => '/assets/modelo-' + d.modelo + (x.slug === 'original' ? '' : '-' + x.slug) + '-' + tipo + '.webp';
  const [p0, p1, p2] = pals;
  const tel = (x, clase, extra) => `<a class="tel ${clase}" href="/modelos/${d.modelo}/${x.slug === 'original' ? '' : '?paleta=' + x.slug}"${extra}><img src="${imgPal(x, 'pantalla')}" width="585" height="1203" alt="${clase === 'tel-centro' ? esc('Invitación ' + d.nombre + ' vista en el celular, en ' + x.nombre) : ''}"${clase === 'tel-centro' ? ' fetchpriority="high"' : ''} /></a>`;
  const visual = `<div class="hero2-telefonos">
            ${p1 ? tel(p1, 'tel-izq', ' tabindex="-1" aria-hidden="true"') : ''}
            ${p2 ? tel(p2, 'tel-der', ' tabindex="-1" aria-hidden="true"') : ''}
            ${tel(p0, 'tel-centro', '')}
          </div>`;
  const faqs = [...d.faqs,
    ['¿Puedo verlo con nuestros nombres antes de pedirlo?', 'Sí. En "Probalo con sus nombres" escribís los dos nombres y la fecha y lo ves al instante, completo, como lo van a ver tus invitados.'],
    ['¿Cuánto cuesta y cuánto tarda?', 'Un solo precio con todo incluido y entrega en 72 horas hábiles desde que recibimos los datos y las fotos.']];
  const det = ([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`;
  const mitad = Math.ceil(faqs.length / 2);
  const grafo = [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: DOMINIO + '/' }, { '@type': 'ListItem', position: 2, name: 'Diseños', item: DOMINIO + '/#disenos' }, { '@type': 'ListItem', position: 3, name: d.nombre, item: url }] },
    { ...servicio('Invitación de boda ' + d.nombre), url, image: DOMINIO + '/modelos/' + d.modelo + '/fotos/compartir.jpg' },
    faqLd(faqs),
  ];
  const contenido = `
    <section class="seo-bloque" aria-labelledby="como-title">
      <div class="container seo-texto">
        <h2 id="como-title">Cómo es el diseño ${esc(d.nombre)}</h2>
        ${d.estilo.map(t => '<p>' + esc(t) + '</p>').join('\n        ')}
        <h3>Lo que lo distingue</h3>
        <ul>${d.detalles.map(t => '<li>' + esc(t) + '</li>').join('')}</ul>
      </div>
    </section>

    <section class="seo-bloque suave" aria-labelledby="colores-title">
      <div class="container">
        <div class="section-intro"><h2 id="colores-title">${esc(d.nombre)} en ${pals.length} combinaciones de colores</h2><p class="lead">Tocá una para verla completa. Si buscás otra, la preparamos.</p></div>
        <div class="colores-grid">
          ${pals.map(x => `<a class="color-variante" href="/modelos/${d.modelo}/${x.slug === 'original' ? '' : '?paleta=' + x.slug}"><img src="${imgPal(x, 'movil')}" width="780" height="975" loading="lazy" alt="${esc('Invitación ' + d.nombre + ' en ' + x.nombre)}" /><span class="color-variante-nombre"><span class="design-color-circulo" aria-hidden="true"><i style="background-color:${x.c1}"></i><i style="background-color:${x.c2}"></i></span>${esc(x.nombre)}</span></a>`).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="seo-bloque" aria-labelledby="ideal-title">
      <div class="container seo-texto">
        <h2 id="ideal-title">Para qué casamiento es ideal</h2>
        <ul>${d.ideal.map(t => '<li>' + esc(t) + '</li>').join('')}</ul>
        <p>Como todas nuestras invitaciones, trae cuenta regresiva, mapa de la ceremonia y la fiesta, itinerario, galería, música, regalos y confirmación de asistencia por WhatsApp. Lo que no quieran mostrar, no aparece.</p>
      </div>
    </section>`;
  const html = `<!doctype html>
<html lang="es-AR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#fbf8f5" />
  <script>document.documentElement.classList.add('js')</script>
  <title>${esc(d.title)}</title>
  <meta name="description" content="${esc(d.description)}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Boda Web" />
  <meta property="og:title" content="${esc(d.title)}" />
  <meta property="og:description" content="${esc(d.description)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${DOMINIO}/modelos/${d.modelo}/fotos/compartir.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="es_AR" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/styles.css" />
  <script defer src="/script.js"></script>
  ${ld(grafo)}
</head>
<body>${cabecera}<main id="contenido" tabindex="-1">
    <section class="hero hero2 hero2-pagina" aria-labelledby="hero-title">
      <div class="container hero2-grid">
        <div class="hero2-copy">
          <nav class="migas" aria-label="Estás en"><ol><li><a href="/">Inicio</a></li><li><a href="/#disenos">Diseños</a></li><li aria-current="page">${esc(d.nombre)}</li></ol></nav>
          <p class="eyebrow">DISEÑO · ${esc(d.nombre.toUpperCase())}</p>
          <h1 id="hero-title">${d.h1}</h1>
          <p class="hero2-texto">${esc(d.intro)}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="/modelos/${d.modelo}/">Ver el diseño completo <svg class="icon icon-btn"><use href="#i-arrow"/></svg></a>
            <button class="btn btn-outline js-elegir" type="button" data-design="${esc(d.nombre)}">Quiero este diseño</button>
          </div>
          <ul class="hero2-datos">
            <li><a href="#precio-title"><strong>$55.000</strong><span>todo incluido</span></a></li>
            <li><strong>72 hs</strong><span>y la tenés lista</span></li>
            <li><strong>${pals.length} colores</strong><span>a elección</span></li>
          </ul>
        </div>
        <div class="hero2-visual">
          ${visual}
        </div>
      </div>
    </section>
${contenido}

    <section class="probar" id="probar" aria-labelledby="probar-title">
      <div class="container probar-grid">
        <div class="probar-texto">
          <p class="eyebrow">PROBALO AHORA</p>
          <h2 id="probar-title">Miralo <em>con sus nombres</em></h2>
          <p class="lead">Escribí los dos nombres y la fecha, y mirá ${esc(d.nombre)} como lo van a recibir tus invitados.</p>
        </div>
        <form class="probar-form" id="probar-form" novalidate>
          <div class="probar-nombres">
            <label>Tu nombre <input name="nombre1" maxlength="30" autocomplete="off" placeholder="Ej. Valentina" /></label>
            <label>El de tu pareja <input name="nombre2" maxlength="30" autocomplete="off" placeholder="Ej. Matías" /></label>
          </div>
          <label>Fecha <span class="opcional">(opcional)</span> <input type="date" name="fecha" /></label>
          <input type="hidden" name="diseno" value="${d.modelo}" />
          <p class="form-error" id="probar-error" role="alert" hidden></p>
          <button class="btn btn-primary" type="submit">Ver mi invitación <svg class="icon icon-btn"><use href="#i-arrow"/></svg></button>
        </form>
      </div>
    </section>

    <section class="seo-bloque suave" aria-labelledby="precio-title">
      <div class="container">
        <h2 id="precio-title" class="visually-hidden">Precio</h2>
        <div class="seo-precio">
          <p>Un solo precio, todo incluido<strong data-precio>$ 55.000</strong>Pesos argentinos · pago único</p>
          <button class="btn btn-primary js-elegir" type="button" data-design="${esc(d.nombre)}">Quiero este diseño</button>
        </div>
      </div>
    </section>

    <section class="faq" id="faq" aria-labelledby="faq-title">
      <div class="container">
        <div class="section-intro"><p class="eyebrow">DUDAS</p><h2 id="faq-title">Preguntas sobre ${esc(d.nombre)}</h2></div>
        <div class="faq-grid">
        <div class="faq-column">
          ${faqs.slice(0, mitad).map(det).join('\n          ')}
        </div>
        <div class="faq-column">
          ${faqs.slice(mitad).map(det).join('\n          ')}
        </div>
        </div>
      </div>
    </section>

    <section class="designs section-container" id="disenos" aria-labelledby="designs-title">
      <div class="section-intro"><p class="eyebrow">TAMBIÉN TE PUEDEN GUSTAR</p><h2 id="designs-title">Diseños parecidos</h2><p class="lead"><a href="/#disenos">Ver los trece diseños</a></p></div>
      <div class="design-grid">
        ${d.parecidos.map(tarjeta).join('\n        ')}
      </div>
    </section>
  </main>
${pie}</body>
</html>
`;
  return html;
}
function revisarDiseno(d, html) {
  const fallas = [], notas = [];
  const chequeo = (ok, que) => { (ok ? notas : fallas).push(que); };
  const kw = normal(d.busqueda);
  const titulo = (/<title>([^<]*)<\/title>/.exec(html) || [])[1] || '';
  const desc = (/name="description" content="([^"]*)"/.exec(html) || [])[1] || '';
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map(m => normal(m[1]));
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const tieneKw = t => normal(t).includes(kw) || clave(d.busqueda).every(w => normal(t).includes(w));
  chequeo(titulo.length >= 30 && titulo.length <= 60, `Título de 30 a 60 caracteres (${titulo.length})`);
  chequeo(tieneKw(titulo), 'La búsqueda está en el título');
  chequeo(desc.length >= 120 && desc.length <= 160, `Descripción de 120 a 160 caracteres (${desc.length})`);
  chequeo(tieneKw(desc), 'La búsqueda está en la descripción');
  chequeo(h1s.length === 1 && tieneKw(h1s[0]), 'Un solo H1 y con la búsqueda');
  chequeo(normal(d.intro).indexOf(kw) >= 0 && normal(d.intro).indexOf(kw) < 40, 'La búsqueda está al principio del primer párrafo');
  const imgs = [...main.matchAll(/<img\b[^>]*>/g)].map(m => m[0]);
  chequeo(imgs.every(i => /\balt="/.test(i) && /\bwidth="\d+"/.test(i) && /\bheight="\d+"/.test(i)), `Imágenes con texto alternativo y medidas (${imgs.length})`);
  chequeo(imgs.every(i => { const f = (/src="\/([^"]+)"/.exec(i) || [])[1]; return f && fs.existsSync(path.join(RAIZ, f)); }), 'Todas las imágenes existen');
  try { [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].forEach(m => JSON.parse(m[1])); chequeo(true, 'Datos estructurados válidos'); } catch (e) { chequeo(false, 'Datos estructurados válidos'); }
  const palabras = normal(main).split(' ').length;
  chequeo(palabras >= 450, `Contenido suficiente (${palabras} palabras)`);
  chequeo(portada.includes(`href="/disenos/${d.slug}/"`), 'La portada enlaza a esta página');
  // Texto propio frente a los otros diseños
  const tejas = t => { const w = normal(t).split(' '); const s = new Set(); for (let i = 0; i + 8 <= w.length; i++) s.add(w.slice(i, i + 8).join(' ')); return s; };
  const propio = x => [x.intro, ...x.estilo, ...x.detalles, ...x.ideal, ...x.faqs.flat()].join(' ');
  const mias = tejas(propio(d));
  for (const o of DISENOS.filter(o => o.slug !== d.slug)) { const otras = tejas(propio(o)); let c = 0; mias.forEach(x => { if (otras.has(x)) c++; }); if (c / mias.size >= 0.05) chequeo(false, `Texto propio frente a "${o.nombre}" (${Math.round(100 * c / mias.size)}% en común)`); }
  return { fallas, notas, palabras };
}

// ---------- Datos para Google en la portada ----------
function datosPortada() {
  const faqs = [...portada.matchAll(/<details><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)].map(m => [sinEtiquetas(m[1]), sinEtiquetas(m[2])]);
  const grafo = [
    { '@type': 'WebSite', name: 'Boda Web', url: DOMINIO + '/', inLanguage: 'es-AR' },
    { ...servicio('Invitaciones de boda digitales'), url: DOMINIO + '/' },
    faqLd(faqs),
  ];
  const a = '<!-- datos-estructurados: los escribe seo/generar.js -->', b = '<!-- /datos-estructurados -->';
  if (!portada.includes(a) || !portada.includes(b)) throw new Error('Faltan las marcas de datos estructurados en index.html');
  portada = portada.slice(0, portada.indexOf(a) + a.length) + '\n  ' + ld(grafo) + '\n  ' + portada.slice(portada.indexOf(b));
  escribir('index.html', portada);
  return faqs.length;
}

// ---------- LISTA DE FACTORES ----------
function revisar(p, html, todas) {
  const fallas = [], notas = [];
  const kw = normal(p.busqueda);
  const titulo = (/<title>([^<]*)<\/title>/.exec(html) || [])[1] || '';
  const desc = (/name="description" content="([^"]*)"/.exec(html) || [])[1] || '';
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map(m => normal(m[1]));
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => normal(m[1]));
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const texto = normal(main);
  const palabras = texto.split(' ').length;
  const chequeo = (ok, que) => { (ok ? notas : fallas).push(que); };
  const tieneKw = t => normal(t).includes(kw) || clave(p.busqueda).every(w => normal(t).includes(w));
  chequeo(titulo.length >= 30 && titulo.length <= 60, `Título de 30 a 60 caracteres (${titulo.length})`);
  chequeo(tieneKw(titulo), 'La búsqueda principal está en el título');
  chequeo(desc.length >= 120 && desc.length <= 160, `Descripción de 120 a 160 caracteres (${desc.length})`);
  chequeo(tieneKw(desc), 'La búsqueda principal está en la descripción');
  chequeo(h1s.length === 1, 'Un solo título principal (H1)');
  chequeo(h1s.length && tieneKw(h1s[0]), 'La búsqueda principal está en el H1');
  chequeo(tieneKw(p.intro) && normal(p.intro).indexOf(kw.split(' ')[0]) < 60, 'La búsqueda principal está al principio del primer párrafo');
  chequeo(h2s.some(h => tieneKw(h) || p.busquedas.some(b => clave(b).filter(w => h.includes(w)).length >= 2)), 'La búsqueda (o una variante) está en un subtítulo H2');
  chequeo(h2s.length >= 5, `Subtítulos H2 suficientes (${h2s.length})`);
  for (const b of p.busquedas) chequeo(clave(b).every(w => texto.includes(w)), `Cubre la búsqueda "${b}"`);
  chequeo(palabras >= 700, `Contenido suficiente (${palabras} palabras)`);
  const repeticiones = texto.split(kw).length - 1;
  chequeo(repeticiones <= 5, `Sin repetir de más la búsqueda exacta (${repeticiones} veces)`);
  const imgs = [...main.matchAll(/<img\b[^>]*>/g)].map(m => m[0]);
  chequeo(imgs.every(i => /\balt="/.test(i) && /\bwidth="\d+"/.test(i) && /\bheight="\d+"/.test(i)), `Imágenes con texto alternativo y medidas (${imgs.length})`);
  chequeo(html.includes(`<link rel="canonical" href="${DOMINIO}/${p.slug}/" />`), 'Dirección canónica propia');
  chequeo(/^[a-z0-9]+(-[a-z0-9]+){1,5}$/.test(p.slug) && kw.split(' ').filter(w => w.length > 3).some(w => p.slug.includes(w.replace(/ñ/g, 'n'))), 'Dirección corta, en minúsculas y con la búsqueda');
  const internos = new Set([...main.matchAll(/href="(\/[^"#]*)"/g)].map(m => m[1]).filter(h => h !== '/' + p.slug + '/' && !h.startsWith('/modelos/') && !h.startsWith('/assets/')));
  chequeo(internos.size >= 3, `Enlaces a otras páginas del sitio (${internos.size})`);
  chequeo(portada.includes(`href="/${p.slug}/"`), 'La portada enlaza a esta página');
  chequeo(!/name="robots"[^>]*noindex/.test(html), 'Se deja indexar');
  try { [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].forEach(m => JSON.parse(m[1])); chequeo(true, 'Datos estructurados válidos'); } catch (e) { chequeo(false, 'Datos estructurados válidos'); }
  const faqsVisibles = p.faqs.every(([q]) => html.includes('<summary>' + esc(q) + '</summary>'));
  chequeo(faqsVisibles, 'Las preguntas de los datos estructurados están a la vista');
  // Contenido propio: cuántas frases de 8 palabras se repiten con las otras páginas
  const tejas = t => { const w = normal(t).split(' '); const s = new Set(); for (let i = 0; i + 8 <= w.length; i++) s.add(w.slice(i, i + 8).join(' ')); return s; };
  const mias = tejas(p.intro + ' ' + p.contenido);
  for (const o of todas.filter(o => o.slug !== p.slug)) {
    const otras = tejas(o.intro + ' ' + o.contenido); let c = 0; mias.forEach(x => { if (otras.has(x)) c++; });
    chequeo(c / mias.size < 0.05, `Texto propio frente a "${o.migas}" (${Math.round(100 * c / mias.size)}% en común)`);
  }
  return { fallas, notas, palabras };
}

// ---------- Ejecución ----------
const nFaqs = datosPortada();
const titulos = new Set([(/<title>([^<]*)<\/title>/.exec(portada) || [])[1]]);
let hayFallas = false;
for (const p of PAGINAS) {
  const html = armar(p, PAGINAS);
  escribir(p.slug + '/index.html', html);
  const r = revisar(p, html, PAGINAS);
  if (titulos.has(p.title)) r.fallas.push('Título repetido con otra página'); titulos.add(p.title);
  console.log((r.fallas.length ? '✖ ' : '✔ ') + '/' + p.slug + '/  —  ' + r.notas.length + ' factores cumplidos' + (r.fallas.length ? ', ' + r.fallas.length + ' sin cumplir:' : ''));
  r.fallas.forEach(f => console.log('    ✖ ' + f));
  if (r.fallas.length) hayFallas = true;
}
// Páginas de cada diseño
for (const d of DISENOS) {
  const html = armarDiseno(d);
  escribir('disenos/' + d.slug + '/index.html', html);
  const r = revisarDiseno(d, html);
  if (titulos.has(d.title)) r.fallas.push('Título repetido con otra página'); titulos.add(d.title);
  console.log((r.fallas.length ? '✖ ' : '✔ ') + '/disenos/' + d.slug + '/  —  ' + r.notas.length + ' factores cumplidos' + (r.fallas.length ? ', ' + r.fallas.length + ' sin cumplir:' : ''));
  r.fallas.forEach(f => console.log('    ✖ ' + f));
  if (r.fallas.length) hayFallas = true;
}
// Mapa del sitio y robots
const urls = ['/', ...PAGINAS.map(p => '/' + p.slug + '/'), ...DISENOS.map(d => '/disenos/' + d.slug + '/')];
escribir('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map(u => `  <url><loc>${DOMINIO}${u}</loc><lastmod>${hoy}</lastmod></url>`).join('\n') + '\n</urlset>\n');
escribir('robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: ' + DOMINIO + '/sitemap.xml\n');
console.log('\nPortada: ' + nFaqs + ' preguntas en sus datos estructurados. Sitemap con ' + urls.length + ' direcciones.');
if (hayFallas) { console.log('Hay factores sin cumplir: corregí seo/paginas.js y volvé a correrlo.'); process.exitCode = 1; }
