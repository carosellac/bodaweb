/* =====================================================================
   ACTUALIZAR INVITACIONES — correr después de armar o cambiar una invitación:

       node actualizar-invitaciones.js

   Para cada carpeta de modelos/ y de parejas/ que tenga datos.js:
   · escribe el TÍTULO y la vista previa para compartir (lo que muestra WhatsApp) a partir de datos.js.
     WhatsApp no ejecuta la página: si estas líneas no se actualizan, el link de una pareja real
     se compartiría con los nombres de la pareja de ejemplo;
   · arma fotos/compartir.jpg (1200×630, el formato que todas las redes muestran) desde fotos/portada.*
     (necesita la librería "sharp"; si no está, usa la portada tal cual y lo avisa);
   · arma evento.ics, el archivo de calendario que abren el iPhone, el iPad y la Mac;
   · AVISA lo que quedó del ejemplo en una invitación de pareja: nombres, fecha, alias o titular de los
     regalos, fotos de muestra, nombres de la pareja de muestra en la historia, WhatsApp vacío o la
     música de muestra.
   Un problema en una carpeta no frena a las demás. No toca nada más.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

// Dirección del sitio. Si se conecta un dominio propio, cambiarla acá (y en index.html de la raíz).
const DOMINIO = 'https://bodaweb-rose.vercel.app';

const RAIZ = __dirname;
let sharp = null;
try { sharp = require('sharp'); sharp.cache(false); } catch (_) { /* sin sharp: se usa la portada tal cual */ }

const esc = t => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escRegex = t => String(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const vacio = v => v === undefined || v === null || String(v).trim() === '';
const leerDatos = archivo => { const ctx = {}; vm.runInNewContext(fs.readFileSync(archivo, 'utf8') + ';this.D = DATOS;', ctx, { timeout: 2000 }); return ctx.D || {}; };
const huella = archivo => fs.existsSync(archivo) ? crypto.createHash('md5').update(fs.readFileSync(archivo)).digest('hex') : '';
const carpetas = base => fs.existsSync(path.join(RAIZ, base))
  ? fs.readdirSync(path.join(RAIZ, base)).sort().map(n => base + '/' + n).filter(c => fs.existsSync(path.join(RAIZ, c, 'datos.js')) && fs.existsSync(path.join(RAIZ, c, 'index.html')))
  : [];

// Datos y foto de portada de cada modelo de muestra, para detectar lo que quedó del ejemplo
const muestras = {};
for (const c of carpetas('modelos')) {
  try { const D = leerDatos(path.join(RAIZ, c, 'datos.js')); if (D.modelo) muestras[D.modelo] = { D, portada: huella(path.join(RAIZ, c, 'fotos', 'portada.webp')) }; }
  catch (e) { console.log('  ⚠ ' + c + ': no se pudo leer datos.js (' + e.message + ')'); }
}

// Reemplazos con FUNCIÓN: un "$" en un nombre no se interpreta como patrón
function reemplazarMeta(html, prop, valor) {
  const re = new RegExp('(<meta\\s+(?:property|name)="' + escRegex(prop) + '"\\s+content=")[^"]*(")');
  return html.replace(re, (m, a, b) => a + esc(valor) + b);
}
function agregarMetaSiFalta(html, prop, valor, despuesDe) {
  if (new RegExp('property="' + escRegex(prop) + '"').test(html)) return reemplazarMeta(html, prop, valor);
  const re = new RegExp('(\\n([ \\t]*)<meta property="' + escRegex(despuesDe) + '"[^>]*>)');
  return html.replace(re, (m, linea, sangria) => linea + '\n' + sangria + '<meta property="' + prop + '" content="' + esc(valor) + '" />');
}
// ¿Aparece este nombre como palabra suelta? (también con tildes al principio, como "Ángela")
const nombra = (texto, n) => new RegExp('(?<![\\p{L}\\p{N}])' + escRegex(n) + '(?![\\p{L}\\p{N}])', 'u').test(texto);

// Archivo de calendario: misma regla que comun.js (termina una hora después del último momento del itinerario)
function armarIcs(D, html) {
  const fecha = new Date(D.fecha || '');
  if (isNaN(fecha.getTime())) return null;
  const m = /([+-])(\d{2}):?(\d{2})$/.exec(String(D.fecha).trim());
  const zona = m ? (m[1] === '-' ? -1 : 1) * (+m[2] * 60 + +m[3]) : -180;
  const local = new Date(fecha.getTime() + zona * 60000);
  const minInicio = local.getUTCHours() * 60 + local.getUTCMinutes();
  const saltos = [...html.replace(/<!--[\s\S]*?-->/g, '').matchAll(/<time[^>]*>\s*(\d{1,2}):(\d{2})/g)].map(x => ((+x[1] * 60 + +x[2]) - minInicio + 1440) % 1440);
  const ultimo = saltos.length ? Math.max(...saltos) : 0;
  const fin = new Date(fecha.getTime() + (ultimo >= 60 && ultimo <= 14 * 60 ? (ultimo + 60) * 60000 : 6 * 3600 * 1000));
  const utc = d => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
  const e = s => String(s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
  const plegar = linea => { const out = []; let cur = '', n = 0; for (const ch of linea) { const b = Buffer.byteLength(ch); if (n + b > 75) { out.push(cur); cur = ' ' + ch; n = 1 + b; } else { cur += ch; n += b; } } out.push(cur); return out.join('\r\n'); };
  const lugar = D.ceremonia || D.fiesta || {};
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Boda Web//Invitacion//ES', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
    'UID:' + utc(fecha) + '-' + crypto.createHash('md5').update(String(D.nombre1) + String(D.nombre2)).digest('hex').slice(0, 12) + '@bodaweb',
    'DTSTAMP:' + utc(new Date()), 'DTSTART:' + utc(fecha), 'DTEND:' + utc(fin),
    'SUMMARY:' + e('Casamiento de ' + D.nombre1 + ' y ' + D.nombre2),
    'DESCRIPTION:' + e(vacio(D.frase) ? '' : D.frase),
    'LOCATION:' + e([lugar.nombre, lugar.direccion].filter(Boolean).join(', ')),
    'END:VEVENT', 'END:VCALENDAR'].map(plegar).join('\r\n') + '\r\n';
}

async function actualizar(c) {
  const dir = path.join(RAIZ, c);
  const D = leerDatos(path.join(dir, 'datos.js'));
  if (vacio(D.nombre1) || vacio(D.nombre2)) { console.log('  ⚠ ' + c + ': faltan los nombres en datos.js; no se tocó nada.'); return 1; }
  let html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  const antes = html;
  let avisos = 0;
  const avisar = t => { console.log('  ⚠ ' + c + ': ' + t); avisos++; };

  // Título: "Nombre & Nombre · <lo que el modelo tenía después del punto>"; si eso era una fecha, la de esta pareja
  const tituloActual = (/<title>([^<]*)<\/title>/.exec(html) || [])[1] || '';
  const sufijo = tituloActual.includes(' · ') ? tituloActual.split(' · ').slice(1).join(' · ').replace(/&amp;/g, '&') : 'Nos casamos';
  const titulo = D.nombre1 + ' & ' + D.nombre2 + ' · ' + (/\d/.test(sufijo) ? (D.fechaTexto || 'Nos casamos') : sufijo);
  html = html.replace(/<title>[^<]*<\/title>/, () => '<title>' + esc(titulo) + '</title>');
  html = reemplazarMeta(html, 'og:title', titulo);

  // Foto para compartir
  let imagen = '';
  const portada = ['portada.webp', 'portada.jpg', 'portada.jpeg', 'portada.png'].map(f => path.join(dir, 'fotos', f)).find(f => fs.existsSync(f));
  if (portada && sharp) {
    try {
      const buf = await sharp(fs.readFileSync(portada)).resize(1200, 630, { fit: 'cover', position: sharp.strategy.attention }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
      fs.writeFileSync(path.join(dir, 'fotos', 'compartir.jpg'), buf);
      imagen = DOMINIO + '/' + c + '/fotos/compartir.jpg';
    } catch (e) { avisar('no se pudo armar compartir.jpg (' + e.message + '); se usa la portada tal cual.'); }
  } else if (portada) {
    console.log('  · ' + c + ': sin la librería sharp no se arma compartir.jpg; se usa la portada tal cual.');
  } else avisar('no hay fotos/portada: la vista previa de WhatsApp va a salir sin foto.');
  if (!imagen && portada) imagen = DOMINIO + '/' + c + '/fotos/' + path.basename(portada);
  html = reemplazarMeta(html, 'og:url', DOMINIO + '/' + c + '/');
  if (imagen) {
    html = reemplazarMeta(html, 'og:image', imagen);
    if (imagen.endsWith('compartir.jpg')) {
      html = agregarMetaSiFalta(html, 'og:image:width', '1200', 'og:image');
      html = agregarMetaSiFalta(html, 'og:image:height', '630', 'og:image:width');
    }
  }

  // Calendario
  const ics = armarIcs(D, html);
  // Sólo se reescribe si cambió algo más que la marca de creación (si no, cada pasada lo daría por modificado)
  const sinMarca = t => String(t).replace(/^DTSTAMP:.*$/m, '');
  const icsArchivo = path.join(dir, 'evento.ics');
  if (ics) { if (!(fs.existsSync(icsArchivo) && sinMarca(fs.readFileSync(icsArchivo, 'utf8')) === sinMarca(ics))) fs.writeFileSync(icsArchivo, ics); }
  else avisar('la fecha de datos.js no se entiende (formato 2027-01-23T18:30:00-03:00): sin cuenta regresiva ni calendario.');

  if (html !== antes) fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log((html !== antes ? '✔ actualizada  ' : '· sin cambios  ') + c + '  →  "' + titulo + '"');

  // Avisos para las invitaciones de parejas reales
  if (c.startsWith('parejas/')) {
    const muestra = muestras[D.modelo];
    if (!muestra) avisar('el "modelo" de datos.js ("' + D.modelo + '") no coincide con ningún modelo: no se puede comparar con el ejemplo.');
    else {
      const M = muestra.D, R = D.regalo || {}, RM = M.regalo || {};
      if (D.nombre1 === M.nombre1 && D.nombre2 === M.nombre2) avisar('los nombres de datos.js son los del ejemplo (' + M.nombre1 + ' y ' + M.nombre2 + ').');
      if (D.fecha === M.fecha) avisar('la fecha de datos.js es la del ejemplo.');
      if (!vacio(R.alias) && R.alias === RM.alias) avisar('el ALIAS para regalos es el del ejemplo (' + RM.alias + '): los invitados transferirían a un alias inventado.');
      if (!vacio(R.titular) && R.titular === RM.titular) avisar('el titular de los regalos es el del ejemplo (' + RM.titular + ').');
      if (!vacio(D.hashtag) && D.hashtag === M.hashtag) avisar('el hashtag es el del ejemplo (' + M.hashtag + ').');
      if (portada && huella(portada) === muestra.portada) avisar('la foto de portada es la de muestra.');
      const texto = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<head[\s\S]*?<\/head>/, '');
      for (const n of [M.nombre1, M.nombre2]) {
        if (n && n !== D.nombre1 && n !== D.nombre2 && nombra(texto, n)) avisar('la página todavía nombra a "' + n + '" (pareja de ejemplo). Revisá la historia y el itinerario en index.html.');
      }
    }
    if (!String(D.whatsapp || '').replace(/\D/g, '')) avisar('falta el WhatsApp en datos.js: las confirmaciones no le van a llegar a nadie.');
    if (/musica-muestra\.mp3/.test(String(D.musica || ''))) avisar('tiene la música de muestra. Poné la de la pareja o dejá musica vacío.');
    if (!/name="robots"\s+content="noindex"/.test(html)) avisar('falta <meta name="robots" content="noindex">: la invitación podría aparecer en Google.');
  }
  return avisos;
}

(async () => {
  const lista = [...carpetas('modelos'), ...carpetas('parejas')];
  let avisos = 0, fallas = 0;
  for (const c of lista) {
    try { avisos += await actualizar(c); }
    catch (e) { fallas++; console.log('  ✖ ' + c + ': no se pudo actualizar (' + e.message + '). Las demás siguen.'); }
  }
  console.log('\n' + lista.length + ' invitaciones revisadas' + (fallas ? ', ' + fallas + ' con error' : '') + (avisos ? ', ' + avisos + ' cosas para revisar (arriba).' : (fallas ? '.' : ', todo en orden.')));
  if (fallas) process.exitCode = 1;
})();
