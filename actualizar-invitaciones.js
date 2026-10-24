/* =====================================================================
   ACTUALIZAR INVITACIONES — correr después de armar o cambiar una invitación:

       node actualizar-invitaciones.js

   Para cada carpeta de modelos/ y de parejas/ que tenga datos.js:
   · escribe el TÍTULO y la vista previa para compartir (lo que muestra WhatsApp) a partir de datos.js.
     WhatsApp no ejecuta la página: si estas líneas no se actualizan, el link de una pareja real
     se compartiría con los nombres de la pareja de ejemplo;
   · arma fotos/compartir.jpg (1200×630, el formato que todas las redes muestran) desde fotos/portada.*
     (necesita la librería "sharp"; si no está, usa la portada tal cual y lo avisa);
   · AVISA lo que quedó de ejemplo en una invitación de pareja: nombres de la pareja de muestra en
     la historia, WhatsApp vacío (las confirmaciones no llegarían) o la música de muestra.
   No toca nada más.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Dirección del sitio. Si se conecta un dominio propio, cambiarla acá (y en index.html de la raíz).
const DOMINIO = 'https://bodaweb-rose.vercel.app';

const RAIZ = __dirname;
let sharp = null;
try { sharp = require('sharp'); sharp.cache(false); } catch (_) { /* sin sharp: se usa la portada tal cual */ }

const esc = t => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const leerDatos = archivo => { const ctx = {}; vm.runInNewContext(fs.readFileSync(archivo, 'utf8') + ';this.D = DATOS;', ctx); return ctx.D || {}; };
const carpetas = base => fs.existsSync(path.join(RAIZ, base))
  ? fs.readdirSync(path.join(RAIZ, base)).map(n => base + '/' + n).filter(c => fs.existsSync(path.join(RAIZ, c, 'datos.js')) && fs.existsSync(path.join(RAIZ, c, 'index.html')))
  : [];

// Nombres de cada pareja de muestra, para avisar si quedaron en una invitación real
const muestras = {};
for (const c of carpetas('modelos')) { const D = leerDatos(path.join(RAIZ, c, 'datos.js')); if (D.modelo) muestras[D.modelo] = D; }

function reemplazarMeta(html, prop, valor) {
  const re = new RegExp('(<meta\\s+(?:property|name)="' + prop.replace(/[:]/g, '\\:') + '"\\s+content=")[^"]*(")');
  return re.test(html) ? html.replace(re, '$1' + esc(valor) + '$2') : html;
}
function agregarMetaSiFalta(html, prop, valor, despuesDe) {
  if (new RegExp('property="' + prop + '"').test(html)) return reemplazarMeta(html, prop, valor);
  const re = new RegExp('(\\n([ \\t]*)<meta property="' + despuesDe + '"[^>]*>)');
  return html.replace(re, (m, linea, sangria) => linea + '\n' + sangria + '<meta property="' + prop + '" content="' + esc(valor) + '" />');
}

(async () => {
  const lista = [...carpetas('modelos'), ...carpetas('parejas')];
  let avisos = 0;
  for (const c of lista) {
    const dir = path.join(RAIZ, c);
    const D = leerDatos(path.join(dir, 'datos.js'));
    let html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
    const antes = html;
    const nombres = (D.nombre1 || '') + ' & ' + (D.nombre2 || '');

    // Título: "Nombre & Nombre · <lo que el modelo tenía después del punto>"
    const tituloActual = (/<title>([^<]*)<\/title>/.exec(html) || [])[1] || '';
    const sufijo = tituloActual.includes(' · ') ? tituloActual.split(' · ').slice(1).join(' · ').replace(/&amp;/g, '&') : 'Nos casamos';
    // Si lo de después del punto es una fecha (tiene números), va la fecha de ESTA pareja, no la del ejemplo
    const titulo = nombres + ' · ' + (/\d/.test(sufijo) ? (D.fechaTexto || 'Nos casamos') : sufijo);
    html = html.replace(/<title>[^<]*<\/title>/, '<title>' + esc(titulo) + '</title>');
    html = reemplazarMeta(html, 'og:title', titulo);

    // Foto para compartir
    let imagen = '';
    const portada = ['portada.webp', 'portada.jpg', 'portada.jpeg', 'portada.png'].map(f => path.join(dir, 'fotos', f)).find(f => fs.existsSync(f));
    if (portada && sharp) {
      const buf = await sharp(fs.readFileSync(portada)).resize(1200, 630, { fit: 'cover', position: sharp.strategy.attention }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
      fs.writeFileSync(path.join(dir, 'fotos', 'compartir.jpg'), buf);
      imagen = DOMINIO + '/' + c + '/fotos/compartir.jpg';
    } else if (portada) {
      imagen = DOMINIO + '/' + c + '/fotos/' + path.basename(portada);
      console.log('  ⚠ ' + c + ': sin la librería sharp no se pudo armar compartir.jpg; se usa la portada tal cual.');
    }
    html = reemplazarMeta(html, 'og:url', DOMINIO + '/' + c + '/');
    if (imagen) {
      html = reemplazarMeta(html, 'og:image', imagen);
      if (imagen.endsWith('compartir.jpg')) {
        html = agregarMetaSiFalta(html, 'og:image:width', '1200', 'og:image');
        html = agregarMetaSiFalta(html, 'og:image:height', '630', 'og:image:width');
      }
    }
    if (html !== antes) fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log((html !== antes ? '✔ actualizada  ' : '· sin cambios  ') + c + '  →  "' + titulo + '"');

    // Avisos para las invitaciones de parejas reales
    if (c.startsWith('parejas/')) {
      const M = muestras[D.modelo];
      const texto = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<script[\s\S]*?<\/script>/g, '');
      if (M) for (const n of [M.nombre1, M.nombre2]) {
        if (n && n !== D.nombre1 && n !== D.nombre2 && new RegExp('\\b' + n + '\\b').test(texto)) { console.log('  ⚠ ' + c + ': la página todavía nombra a "' + n + '" (pareja de ejemplo). Revisá la historia en index.html.'); avisos++; }
      }
      if (!String(D.whatsapp || '').replace(/\D/g, '')) { console.log('  ⚠ ' + c + ': falta el WhatsApp en datos.js: las confirmaciones no le van a llegar a nadie.'); avisos++; }
      if (/musica-muestra\.mp3/.test(String(D.musica || ''))) { console.log('  ⚠ ' + c + ': tiene la música de muestra. Poné la de la pareja o dejá musica vacío.'); avisos++; }
      if (/Texto de ejemplo/.test(html) && M) { /* los comentarios quedan; lo que importa es el texto, revisado arriba */ }
    }
  }
  console.log('\n' + lista.length + ' invitaciones revisadas' + (avisos ? ', ' + avisos + ' cosas para revisar (arriba).' : ', todo en orden.'));
})().catch(e => { console.error('No se pudo terminar:', e.message); process.exit(1); });
