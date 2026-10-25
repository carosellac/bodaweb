/* =====================================================================
   COMPORTAMIENTO COMÚN DE LAS INVITACIONES
   Acá no hay nada que completar: los datos de la pareja van en datos.js.
   Este archivo es IDÉNTICO en todos los modelos (si se corrige algo, copiarlo a todos). Hace:
   · escribe nombres, fechas y lugares donde el HTML dice data-dato="…"
   · cuenta regresiva · botón "Agregar al calendario" (Google, o el calendario del iPhone/Mac)
   · enlaces a Google Maps · copiar alias / CBU · galería ampliada · confirmación por WhatsApp
   · música (si en datos.js se completa "musica")
   · en los modelos de MUESTRA (carpeta modelos/) agrega una barra para volver a Boda Web o pedir ese diseño
   · en la COMPUTADORA muestra la invitación dentro de un celular (la versión de celular, tal cual)
   ===================================================================== */
(() => {
  'use strict';
  const D = (typeof DATOS !== 'undefined' ? DATOS : window.DATOS) || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const leer = clave => String(clave || '').split('.').reduce((o, k) => (o == null ? undefined : o[k]), D);
  const vacio = v => v === undefined || v === null || String(v).trim() === '';
  // ¿Es un modelo de muestra? (vive en /modelos/…). Las invitaciones reales van en otra carpeta.
  const esMuestra = /\/modelos\/[^/]+\/?/.test(location.pathname);
  const parametros = new URLSearchParams(location.search);
  const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const mayus = t => String(t).charAt(0).toUpperCase() + String(t).slice(1);
  const sinTildes = t => String(t).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const lista = arr => arr.length <= 1 ? arr.join('') : arr.slice(0, -1).join(', ') + ' y ' + arr[arr.length - 1];
  // Para qué evento es: casamiento (por defecto) o 15 años ("evento: 'quince'" en datos.js): ahí hay UN solo nombre
  const esQuince = D.evento === 'quince';

  /* ---------- Probar el diseño con sus nombres (sólo en los modelos de MUESTRA) ----------
     ?nombre1=Ana&nombre2=Bruno&fecha=2027-10-16 muestra el modelo con esos nombres y esa fecha, en el momento.
     También cambian las iniciales, el hashtag, el alias de muestra y los nombres escritos en la historia.
     En una invitación real (fuera de /modelos/) no hace nada. */
  const prueba = (() => {
    if (!esMuestra) return null;
    const limpio = v => String(v || '').replace(/[<>{}]/g, '').replace(/\s+/g, ' ').trim().slice(0, 30);
    const n1 = limpio(parametros.get('nombre1')), n2 = limpio(parametros.get('nombre2'));
    if (!n1 || (!n2 && !esQuince)) return null;
    const f = String(parametros.get('fecha') || '');
    const valida = /^\d{4}-\d{2}-\d{2}$/.test(f) && !isNaN(new Date(f + 'T12:00:00Z').getTime());
    return { n1, n2, fecha: valida ? f : '', viejo1: String(D.nombre1 || ''), viejo2: String(D.nombre2 || '') };
  })();
  if (prueba) {
    const { n1, n2, viejo1, viejo2 } = prueba;
    const pegado = t => mayus(sinTildes(t).replace(/[^A-Za-z0-9]/g, ''));
    D.nombre1 = n1; if (!esQuince) D.nombre2 = n2;
    const ini = /^(\S)([\s\S]*?)(\S)$/u.exec(String(D.iniciales || ''));
    if (!esQuince && ini) D.iniciales = n1.charAt(0).toUpperCase() + ini[2] + n2.charAt(0).toUpperCase();
    if (!vacio(D.hashtag)) D.hashtag = esQuince ? '#Los15De' + pegado(n1) : '#' + [n1, n2].map(pegado).join('Y');
    if (D.regalo) {
      if (!vacio(D.regalo.alias)) D.regalo.alias = esQuince ? sinTildes(n1).toUpperCase().replace(/[^A-Z0-9]/g, '') + '.MIS15' : [n1, n2].map(t => sinTildes(t).toUpperCase().replace(/[^A-Z0-9]/g, '')).join('.') + '.BODA';
      if (!vacio(D.regalo.titular)) D.regalo.titular = String(D.regalo.titular).replace(viejo1, n1).replace(viejo2, n2);
    }
    if (prueba.fecha && /T\d/.test(String(D.fecha))) {
      D.fecha = prueba.fecha + String(D.fecha).slice(10);
      const [a, mo, di] = prueba.fecha.split('-').map(Number);
      const dia = DIAS[new Date(Date.UTC(a, mo - 1, di)).getUTCDay()], mes = MESES[mo - 1];
      const larga = mayus(dia) + ' ' + di + ' de ' + mes + ' de ' + a;
      if (!vacio(D.fechaTexto)) D.fechaTexto = /^\d{2}\.\d{2}\.\d{4}$/.test(D.fechaTexto) ? String(di).padStart(2, '0') + '.' + String(mo).padStart(2, '0') + '.' + a : larga;
      if (!vacio(D.fechaCorta)) {
        const fc = String(D.fechaCorta);
        const conDia = DIAS.some(x => sinTildes(fc.toLowerCase()).startsWith(sinTildes(x)));
        D.fechaCorta = conDia ? larga + (fc.includes(' · ') ? ' · ' + fc.split(' · ').slice(1).join(' · ') : '') : di + ' ' + mes + ' ' + a;
      }
      if (!vacio(D.fechaDia)) D.fechaDia = mayus(dia);
      if (!vacio(D.fechaNumero)) D.fechaNumero = String(di);
      if (!vacio(D.fechaMes)) D.fechaMes = mayus(mes);
      if (!vacio(D.confirmarHasta)) { const h = new Date(Date.UTC(a, mo - 1, di) - 30 * 864e5); D.confirmarHasta = h.getUTCDate() + ' de ' + MESES[h.getUTCMonth()] + ' de ' + h.getUTCFullYear(); }
    }
  }

  /* ---------- Colores: cada diseño puede venir en otras paletas ----------
     En datos.js "paleta" (o ?paleta= en las muestras) elige una de las que define su estilo.css. */
  const paleta = String((esMuestra && parametros.get('paleta')) || D.paleta || '').replace(/[^a-z0-9-]/g, '').slice(0, 20);
  if (paleta) document.documentElement.dataset.paleta = paleta;
  const nombrePaleta = () => { const v = getComputedStyle(document.documentElement).getPropertyValue('--bw-paleta-nombre').trim().replace(/^["']|["']$/g, ''); return paleta && v ? v : ''; };
  // Las paletas de este diseño (las declara su estilo.css en --bw-paletas: "slug|Nombre|fondo|acento;…")
  const paletas = (() => {
    const v = getComputedStyle(document.documentElement).getPropertyValue('--bw-paletas').trim().replace(/^["']|["']$/g, '');
    return v ? v.split(';').map(x => { const [slug, nombre, c1, c2] = x.split('|').map(t => (t || '').trim()); return { slug, nombre, c1, c2 }; })
      .filter(x => /^[a-z0-9-]+$/.test(x.slug) && x.nombre && /^#[0-9a-f]{3,8}$/i.test(x.c1) && /^#[0-9a-f]{3,8}$/i.test(x.c2)) : [];
  })();
  const paletaActual = paletas.some(x => x.slug === paleta) ? paleta : 'original';
  const urlConPaleta = slug => {
    const q = new URLSearchParams(location.search);
    if (slug === 'original') q.delete('paleta'); else q.set('paleta', slug);
    q.delete('entrada');
    const t = q.toString();
    return location.pathname + (t ? '?' + t : '');
  };
  const htmlColores = () => paletas.length < 2 ? '' : '<div class="bw-colores"><p class="bw-colores-titulo">Elegí los colores</p><div class="bw-colores-lista">'
    + paletas.map(x => '<a class="bw-color' + (x.slug === paletaActual ? ' activo" aria-current="true' : '') + '" href="' + escapar(urlConPaleta(x.slug)) + '">'
      + '<span class="bw-color-muestra" aria-hidden="true"><i style="background-color:' + x.c1 + '"></i><i style="background-color:' + x.c2 + '"></i></span>' + escapar(x.nombre) + '</a>').join('')
    + '</div></div>';

  /* ---------- Muestras: link al pedido (con el diseño, sus nombres, la fecha y el color) y "Probalo con sus nombres" ---------- */
  const inicioSitio = location.pathname.replace(/\/modelos\/[^/]+\/?.*$/, '/');
  const linkPedido = nombreModelo => {
    const q = new URLSearchParams();
    if (nombreModelo) q.set('diseno', nombreModelo);
    if (prueba) { q.set('pareja', esQuince ? prueba.n1 + ' (15 años)' : prueba.n1 + ' y ' + prueba.n2); if (prueba.fecha) q.set('fecha', prueba.fecha); }
    const color = nombrePaleta(); if (color) q.set('color', color);
    const t = q.toString();
    return inicioSitio + (t ? '?' + t : '');
  };
  const hoyISO = () => { const h = new Date(); h.setMinutes(h.getMinutes() - h.getTimezoneOffset()); return h.toISOString().slice(0, 10); };
  const formProbar = () => '<form class="bw-probar-form" novalidate>'
    + '<p class="bw-probar-titulo">' + (esQuince ? 'Probalo con su nombre' : 'Probalo con sus nombres') + '</p>'
    + (esQuince
      ? '<div class="bw-probar-fila bw-probar-uno"><input name="nombre1" maxlength="30" placeholder="Su nombre" aria-label="Nombre de la quinceañera" autocomplete="off" value="' + (prueba ? escapar(prueba.n1) : '') + '" /></div>'
      : '<div class="bw-probar-fila"><input name="nombre1" maxlength="30" placeholder="Nombre" aria-label="Primer nombre" autocomplete="off" value="' + (prueba ? escapar(prueba.n1) : '') + '" />'
        + '<span aria-hidden="true">&amp;</span><input name="nombre2" maxlength="30" placeholder="Nombre" aria-label="Segundo nombre" autocomplete="off" value="' + (prueba ? escapar(prueba.n2) : '') + '" /></div>')
    + '<label class="bw-probar-fecha">' + (esQuince ? 'Fecha de la fiesta' : 'Fecha del casamiento') + ' <span>(opcional)</span><input type="date" name="fecha" min="' + hoyISO() + '" value="' + (prueba && prueba.fecha ? prueba.fecha : '') + '" /></label>'
    + '<p class="bw-probar-error" role="alert" hidden></p>'
    + '<button type="submit">' + (esQuince ? 'Ver con su nombre' : 'Ver con sus nombres') + '</button></form>';
  const activarProbar = f => f.addEventListener('submit', e => {
    e.preventDefault();
    const n1 = f.elements.nombre1.value.trim(), n2 = esQuince ? '' : f.elements.nombre2.value.trim(), fe = f.elements.fecha.value;
    const err = f.querySelector('.bw-probar-error');
    if (esQuince && !n1) { err.textContent = 'Escribí su nombre.'; err.hidden = false; f.elements.nombre1.focus(); return; }
    if (!esQuince && (!n1 || !n2)) { err.textContent = 'Escribí los dos nombres.'; err.hidden = false; (n1 ? f.elements.nombre2 : f.elements.nombre1).focus(); return; }
    const q = new URLSearchParams(esQuince ? { nombre1: n1 } : { nombre1: n1, nombre2: n2 });
    if (fe) q.set('fecha', fe);
    if (paleta) q.set('paleta', paleta);
    (window.top || window).location.href = location.pathname + '?' + q.toString();
  });

  /* ---------- Textos según el evento (casamiento o 15 años) ---------- */
  const quienes = () => esQuince || vacio(D.nombre2) ? String(D.nombre1 || '') : D.nombre1 + ' y ' + D.nombre2;
  const elEvento = () => esQuince ? 'los 15 de ' + D.nombre1 : 'el casamiento de ' + quienes();
  const anfitriones = () => esQuince ? String(D.nombre1 || '') : 'los novios';

  /* ---------- Textos: <span data-dato="nombre1"></span> ---------- */
  const escapar = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  $$('[data-dato]').forEach(el => {
    const v = leer(el.dataset.dato);
    if (vacio(v)) return;
    // El alias se puede partir sólo después de un punto ("VALEN.NICO." / "BODA"), nunca en el medio de una palabra
    if (el.dataset.dato === 'regalo.alias') el.innerHTML = escapar(v).replace(/\./g, '.<wbr>');
    else el.textContent = v;
  });
  /* Un bloque con data-si="regalo.alias" se esconde si ese dato está vacío */
  $$('[data-si]').forEach(el => { if (vacio(leer(el.dataset.si))) el.hidden = true; });
  if (!vacio(D.nombre1) && (!vacio(D.nombre2) || esQuince)) {
    document.title = (esQuince ? (D.nombre1 + ' · Mis 15') : (D.nombre1 + ' & ' + D.nombre2)) + (vacio(D.fechaTexto) ? '' : ' · ' + D.fechaTexto);
  }
  /* En la prueba con sus nombres, los nombres de la pareja de ejemplo escritos a mano en la página también cambian */
  if (prueba) {
    try {
      const cambios = [[prueba.viejo1, prueba.n1], [prueba.viejo2, prueba.n2]].filter(([v, n]) => v && n && v !== n)
        .map(([v, n]) => [new RegExp('(^|[^\\p{L}\\p{N}])' + v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\p{L}\\p{N}])', 'gu'), n]);
      const cambiar = t => cambios.reduce((acc, [re, n]) => acc.replace(re, (m, antes) => antes + n), t);
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement && n.parentElement.closest('script,style,textarea') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
      for (let n = w.nextNode(); n; n = w.nextNode()) { const t = cambiar(n.nodeValue); if (t !== n.nodeValue) n.nodeValue = t; }
      $$('[alt],[aria-label],[title]').forEach(el => ['alt', 'aria-label', 'title'].forEach(a => { const v = el.getAttribute(a); if (v) { const t = cambiar(v); if (t !== v) el.setAttribute(a, t); } }));
    } catch (_) { /* navegador viejo: quedan los nombres del ejemplo en la historia, el resto ya cambió */ }
  }

  /* ---------- Computadora: la invitación se muestra DENTRO DE UN CELULAR ----------
     La invitación es para el celular (ahí la abren los invitados), así que en la compu se ve la misma
     versión, sin adaptaciones: un iframe del ancho de un teléfono carga esta misma página, que adentro
     se dibuja exactamente como en un celular. La marca "bw-escritorio" la pone el <head> (pantalla de
     900px o más, con mouse, y sin ?vista=compu); adentro del iframe la marca es "bw-en-marco".
     En los modelos de MUESTRA, al costado del celular van "Quiero este diseño" y "Ver otros diseños". */
  const raiz = document.documentElement;
  const enMarco = raiz.classList.contains('bw-en-marco');
  if (raiz.classList.contains('bw-escritorio')) {
    const color = (document.querySelector('meta[name="theme-color"]')?.content || '#f6f1ec').trim();
    const hex = /^#([0-9a-f]{6})$/i.test(color) ? color : '#f6f1ec';
    const lum = (() => { const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; })();
    const oscuro = lum < 0.25;
    const css = document.createElement('style');
    css.textContent = [
      '.bw-marco{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;gap:clamp(32px,6vw,96px);padding:24px;box-sizing:border-box;background:radial-gradient(120% 90% at 50% 0%,' + hex + ' 0%,' + hex + ' 35%,' + (oscuro ? '#05070c' : '#e9e2db') + ' 100%);font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:' + (oscuro ? '#f3efe8' : '#2a2320') + ';z-index:2147483000}',
      '.bw-marco *{box-sizing:border-box}',
      '.bw-lado{max-width:340px;display:grid;gap:16px}',
      // Los estilos de cada invitación (h1, p, a…) no pueden colarse en el panel: todo va explícito
      '.bw-marco .bw-lado,.bw-marco .bw-lado *{color:' + (oscuro ? '#f3efe8' : '#2a2320') + '!important;text-shadow:none!important;text-transform:none!important;font-style:normal!important;letter-spacing:normal!important;background-image:none!important}',
      '.bw-marco .bw-lado p{margin:0!important;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif!important}',
      '.bw-marco .bw-lado p.bw-eyebrow{letter-spacing:.22em!important;text-transform:uppercase!important;font-size:12px!important;font-weight:700!important}',
      '.bw-marco h1.bw-titulo{margin:0!important;padding:0!important;font:500 clamp(34px,3.2vw,46px)/1.05 "Cormorant Garamond",Georgia,"Times New Roman",serif!important}',
      '.bw-marco .bw-acciones a.bw-principal{color:' + (oscuro ? '#0b0f18' : '#fff') + '!important;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif!important}',
      '.bw-marco .bw-acciones a{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif!important}',
      '.bw-eyebrow{font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;opacity:.75}',
      '.bw-titulo{margin:0;font:500 clamp(34px,3.2vw,46px)/1.05 "Cormorant Garamond",Georgia,"Times New Roman",serif}',
      '.bw-texto{font-size:16px;line-height:1.55;opacity:.85}',
      '.bw-acciones{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px}',
      '.bw-acciones a{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 22px;border-radius:999px;font-weight:700;font-size:15px;text-decoration:none;border:1.5px solid currentColor;color:inherit;transition:transform .2s}',
      '.bw-acciones a:hover{transform:translateY(-2px)}',
      '.bw-acciones a.bw-principal{background:' + (oscuro ? '#f3efe8' : '#2a2320') + ';border-color:transparent;color:' + (oscuro ? '#0b0f18' : '#fff') + '}',
      '.bw-acciones a:focus-visible{outline:2px solid currentColor;outline-offset:3px}',
      // El celular mide SIEMPRE 390×844 (un iPhone real: así la invitación se arma igual que en un teléfono)
      // y se achica entero con --bw-escala cuando la pantalla es más baja
      '.bw-caja{flex:none;width:calc(414px * var(--bw-escala,1));height:calc(868px * var(--bw-escala,1));position:relative}',
      '.bw-telefono{position:absolute;top:0;left:0;width:414px;height:868px;padding:12px;border-radius:56px;background:#16161a;box-shadow:0 40px 90px rgba(0,0,0,.35),0 0 0 2px #2c2c33,inset 0 0 0 2px #000;transform:scale(var(--bw-escala,1));transform-origin:0 0}',
      '.bw-telefono iframe{display:block;width:390px;height:844px;border:0;border-radius:44px;background:#fff}',
      '.bw-ayuda{font-size:13px;opacity:.65}',
      '.bw-marco .bw-titulo small{display:block!important;font:600 13px/1.4 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif!important;letter-spacing:.12em!important;text-transform:uppercase!important;opacity:.7;margin-top:6px}',
      '.bw-marco .bw-probar-form{display:grid;gap:8px;padding:14px;border-radius:16px;background:' + (oscuro ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.7)') + ';border:1px solid ' + (oscuro ? 'rgba(255,255,255,.18)' : 'rgba(42,35,32,.12)') + '}',
      '.bw-marco .bw-probar-titulo{font-weight:700!important;font-size:15px!important}',
      '.bw-marco .bw-probar-fila{display:grid;grid-template-columns:1fr auto 1fr;gap:6px;align-items:center}',
      '.bw-marco .bw-probar-uno{grid-template-columns:1fr}',
      '.bw-marco .bw-probar-form input{width:100%;min-width:0;font:15px system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;padding:10px 12px;border-radius:10px;border:1px solid ' + (oscuro ? 'rgba(255,255,255,.3)' : 'rgba(42,35,32,.25)') + ';background:' + (oscuro ? 'rgba(0,0,0,.25)' : '#fff') + ';color:inherit}',
      '.bw-marco .bw-probar-fecha{display:grid;gap:4px;font-size:13px;font-weight:600}',
      '.bw-marco .bw-probar-fecha span{font-weight:400;opacity:.7}',
      '.bw-marco .bw-probar-error{font-size:13px!important;color:' + (oscuro ? '#ffb4a8' : '#b03a2e') + '!important}',
      '.bw-marco .bw-probar-form button{min-height:44px;border-radius:999px;border:1.5px solid currentColor;background:transparent;color:inherit;font:700 14px system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;cursor:pointer}',
      '.bw-marco .bw-probar-form button:hover{background:' + (oscuro ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.06)') + '}',
      // Flechitas al costado del celular: avisan que la invitación sigue para abajo
      '.bw-flechas{position:absolute;left:100%;bottom:20%;margin-left:32px;display:flex;flex-direction:column;align-items:center;gap:10px;padding:8px;border:0;background:none;color:inherit;font:700 14px/1.25 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;text-align:center;cursor:pointer;transition:opacity .4s;width:120px}',
      '.bw-flechas .bw-circulo{display:grid;place-items:center;width:64px;height:64px;border-radius:50%;border:2px solid currentColor}',
      '.bw-flechas .bw-circulo>span{display:block;animation:bw-bajar 1.6s ease-in-out infinite}',
      '.bw-flechas svg{width:30px;height:30px;display:block}',
      '.bw-flechas svg+svg{margin-top:-18px;opacity:.5}',
      '.bw-flechas:hover .bw-circulo{background:' + (oscuro ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.06)') + '}',
      '.bw-flechas.bw-oculta{opacity:0;pointer-events:none}',
      '.bw-flechas:focus-visible{outline:2px solid currentColor;outline-offset:4px;border-radius:16px}',
      '@keyframes bw-bajar{0%,100%{transform:translateY(0)}50%{transform:translateY(10px)}}',
      // Si no hay lugar al costado, van sobre la parte de abajo del celular, en una pastilla oscura
      '@media (max-width:1150px){.bw-flechas{left:50%;bottom:calc(36px * var(--bw-escala,1));margin-left:0;width:auto;transform:translateX(-50%);flex-direction:row;gap:8px;padding:10px 18px 10px 12px;border-radius:999px;background:rgba(20,18,16,.78);color:#fff;box-shadow:0 8px 24px rgba(0,0,0,.25);white-space:nowrap}.bw-flechas .bw-circulo{width:auto;height:auto;border:0}.bw-flechas svg{width:22px;height:22px}.bw-flechas svg+svg{margin-top:-14px}}',
      '@media (prefers-reduced-motion:reduce){.bw-flechas .bw-circulo>span{animation:none!important}}',
      // El selector de colores (en la compu la página de afuera no carga los estilos de la invitación)
      '.bw-marco .bw-colores{display:grid;gap:8px}',
      '.bw-marco .bw-colores-titulo{font-weight:700!important;font-size:15px!important}',
      '.bw-marco .bw-colores-lista{display:flex;flex-wrap:wrap;gap:6px}',
      '.bw-marco .bw-color{display:inline-flex;align-items:center;gap:7px;min-height:38px;padding:4px 12px 4px 4px;border-radius:999px;border:1px solid ' + (oscuro ? 'rgba(255,255,255,.3)' : 'rgba(42,35,32,.25)') + ';text-decoration:none;font:600 13px/1.2 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}',
      '.bw-marco .bw-color:hover{border-color:currentColor}',
      '.bw-marco .bw-color.activo{border:2px solid currentColor;padding:3px 11px 3px 3px}',
      '.bw-marco .bw-color-muestra{display:inline-flex;width:28px;height:28px;border-radius:50%;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(0,0,0,.18);transform:rotate(-45deg)}',
      '.bw-marco .bw-color-muestra i{display:block;flex:1}',
      // Pantallas bajas: el texto de ayuda se va para que entre todo el panel
      '@media (max-height:800px){.bw-marco .bw-texto{display:none}.bw-lado{gap:12px!important}}',
      '@media (max-width:1100px){.bw-lado{max-width:260px}}'
    ].join('\n');
    document.head.appendChild(css);
    const marco = document.createElement('div');
    marco.className = 'bw-marco';
    const nombreModelo = vacio(D.modelo) ? '' : String(D.modelo);
    const inicio = location.pathname.replace(/\/modelos\/[^/]+\/?.*$/, '/');
    const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const lado = esMuestra
      ? '<div class="bw-lado"><p class="bw-eyebrow">' + (prueba ? 'Así se vería su invitación' : 'Diseño de muestra · Boda Web') + '</p>'
        + '<h1 class="bw-titulo">' + esc(nombreModelo || 'Invitación') + (nombrePaleta() ? ' <small>' + esc(nombrePaleta()) + '</small>' : '') + '</h1>'
        + '<p class="bw-texto">Así la ven tus invitados en el celular. Arrastrala con el mouse o usá la ruedita para recorrerla completa.</p>'
        + htmlColores()
        + formProbar()
        + '<div class="bw-acciones"><a class="bw-principal" href="' + esc(linkPedido(nombreModelo)) + '">Quiero este diseño</a>'
        + '<a href="' + inicio + '#disenos">Ver otros diseños</a></div></div>'
      : '';
    const flecha = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
    marco.innerHTML = lado + '<div class="bw-caja"><div class="bw-telefono"><iframe title="' + esc(document.title) + '" src="' + esc(location.href) + '"></iframe></div>'
      + '<button type="button" class="bw-flechas" aria-label="Bajar para ver más de la invitación"><span class="bw-circulo"><span>' + flecha + flecha + '</span></span><span>Bajá para ver más</span></button></div>';
    document.body.appendChild(marco);
    const fp = marco.querySelector('.bw-probar-form'); if (fp) activarProbar(fp);
    const escalar = () => marco.style.setProperty('--bw-escala', String(Math.min(1, (window.innerHeight - 40) / 868)));
    escalar();
    window.addEventListener('resize', escalar);
    // La ruedita del mouse fuera del celular también lo hace bajar
    const frame = marco.querySelector('iframe');
    // Las flechitas: al tocarlas baja una pantalla; se esconden cuando la persona ya empezó a bajar
    const flechas = marco.querySelector('.bw-flechas');
    flechas.addEventListener('click', () => { try { const w = frame.contentWindow; w.scrollBy({ top: w.innerHeight * 0.8, behavior: 'smooth' }); } catch (_) {} });
    frame.addEventListener('load', () => {
      try {
        const w = frame.contentWindow;
        const revisar = () => { const fin = w.scrollY + w.innerHeight >= w.document.documentElement.scrollHeight - 40; flechas.classList.toggle('bw-oculta', w.scrollY > 120 || fin); };
        w.addEventListener('scroll', revisar, { passive: true }); revisar();
      } catch (_) {}
    });
    marco.addEventListener('wheel', e => { if (e.target === frame) return; try { frame.contentWindow.scrollBy(0, e.deltaY); e.preventDefault(); } catch (_) {} }, { passive: false });
    // Si la ventana se achica a tamaño celular (o se agranda), se recarga para mostrar la versión que corresponde
    try { matchMedia('(min-width:900px) and (hover:hover)').addEventListener('change', () => location.reload()); } catch (_) {}
    return;
  }

  /* ---------- Link personalizado para cada invitado ----------
     Agregando al final de la dirección ?para=Familia%20Gómez&lugares=4 la invitación saluda por el nombre,
     deja el nombre ya escrito en la confirmación y avisa para cuántas personas es. Sin eso, todo igual. */
  const invitado = String(parametros.get('para') || '').replace(/[<>]/g, '').trim().slice(0, 80);
  // ?nombres=Juan,Sofía,Mateo: cada integrante aparece en la invitación y se marca quién viene
  const nombresLink = String(parametros.get('nombres') || '').split(',').map(t => t.replace(/[<>]/g, '').trim().slice(0, 40)).filter(Boolean).slice(0, 20);
  const lugaresLink = parseInt(parametros.get('lugares'), 10);
  const lugares = lugaresLink >= 1 && lugaresLink <= 30 ? lugaresLink : nombresLink.length;
  const maxPersonas = lugares || (parseInt(D.maxPersonas, 10) >= 1 ? parseInt(D.maxPersonas, 10) : 12);

  /* ---------- Secciones agregadas: copian el estilo de una sección del propio modelo ----------
     (la de vestimenta o, si no tiene, la de regalos), así cada diseño las muestra con su letra y sus colores. */
  const limpiar = el => ['id', 'data-si', 'data-dato', 'aria-labelledby', 'aria-describedby'].forEach(a => el.removeAttribute(a));
  const baseSeccion = $('section.vestimenta') || $('#regalos');
  const parrafoBase = baseSeccion && [...baseSeccion.querySelectorAll('p')].find(x => !x.matches('.antetitulo, .etiqueta, .chico') && !x.hasAttribute('data-dato') && !x.closest('.datos-regalo'));
  const parrafo = html => { const pp = parrafoBase ? parrafoBase.cloneNode(false) : document.createElement('p'); limpiar(pp); pp.innerHTML = html; return pp; };
  function seccionNueva(etiqueta, titulo, clase) {
    if (!baseSeccion) return null;
    const sec = baseSeccion.cloneNode(false);
    limpiar(sec); sec.hidden = false; sec.classList.add('bw-extra', clase);
    const etiquetaBase = baseSeccion.querySelector('.antetitulo, .etiqueta, .chico');
    if (etiquetaBase) { const e = etiquetaBase.cloneNode(false); limpiar(e); e.textContent = etiqueta; sec.appendChild(e); }
    const tituloBase = baseSeccion.querySelector('h2');
    const h = tituloBase ? tituloBase.cloneNode(false) : document.createElement('h2');
    limpiar(h); h.textContent = titulo; sec.appendChild(h);
    return sec;
  }
  // Las secciones nuevas van una detrás de otra: después de la de vestimenta, o antes de la de regalos
  let ultimaExtra = null;
  const ubicar = sec => { if (ultimaExtra) ultimaExtra.after(sec); else if (baseSeccion.matches('section.vestimenta')) baseSeccion.after(sec); else baseSeccion.before(sec); ultimaExtra = sec; };
  const copiarTexto = async (texto, boton) => {
    const original = boton.textContent;
    try { await navigator.clipboard.writeText(texto); boton.textContent = '¡Copiado!'; }
    catch { window.prompt('Copiá el texto:', texto); }
    setTimeout(() => { boton.textContent = original; }, 1800);
  };

  /* Información útil (opcional): chicos, dónde dormir, traslados, menú y notas. Vacíos = no aparece nada. */
  const infoItems = [['Chicos', D.ninos], ['Dónde dormir', D.alojamiento], ['Traslados', D.traslado], ['Menú', D.menu], ['Para tener en cuenta', D.notas]].filter(([, t]) => !vacio(t));
  if (infoItems.length && baseSeccion) {
    const sec = seccionNueva('Información útil', 'Para que no te falte nada', 'bw-info');
    infoItems.forEach(([titulo, texto]) => { const pp = parrafo('<strong>' + titulo + ':</strong> ' + escapar(texto)); pp.style.marginTop = '12px'; sec.appendChild(pp); });
    ubicar(sec);
  }

  /* Sugerí una canción: el invitado propone un tema para la fiesta y les llega por WhatsApp ("sugerirCanciones: false" la apaga) */
  const whatsappNovios = String(D.whatsapp || '').replace(/\D/g, '');
  if (D.sugerirCanciones !== false && baseSeccion) {
    const sec = seccionNueva('Música', '¿Qué canción no puede faltar?', 'bw-canciones');
    sec.appendChild(parrafo('Contanos qué tema querés bailar en la fiesta.'));
    const f = document.createElement('form');
    f.className = 'bw-cancion'; f.noValidate = true;
    f.innerHTML = '<label>Tu nombre<input name="quien" maxlength="60" autocomplete="name" placeholder="Tu nombre" /></label>'
      + '<label>Canción y artista<input name="tema" maxlength="120" placeholder="Ej. Persiana americana, Soda Stereo" /></label>'
      + '<p class="bw-cancion-aviso" role="status" hidden></p>'
      + '<button type="submit" class="boton">' + (whatsappNovios ? 'Sugerir por WhatsApp' : 'Sugerir canción') + '</button>';
    sec.appendChild(f);
    if (invitado) f.elements.quien.value = invitado;
    f.addEventListener('submit', e => {
      e.preventDefault();
      const aviso = $('.bw-cancion-aviso', f);
      const quien = f.elements.quien.value.trim(), tema = f.elements.tema.value.trim();
      if (!tema) { aviso.textContent = 'Escribí la canción que querés sugerir.'; aviso.hidden = false; f.elements.tema.focus(); return; }
      const texto = '¡Hola! ' + (quien ? 'Soy ' + quien + '. ' : '') + 'Para la fiesta les sugiero esta canción: ' + tema + ' 🎶';
      guardarEnPanel('cancion', { quien, tema });
      if (whatsappNovios) { window.open('https://wa.me/' + whatsappNovios + '?text=' + encodeURIComponent(texto), '_blank', 'noopener'); aviso.textContent = '¡Gracias! Te abrimos WhatsApp con tu sugerencia.'; }
      else aviso.textContent = esMuestra ? 'En la invitación real, se abre WhatsApp con este mensaje: «' + texto + '»' : '¡Gracias! Mandales este mensaje: «' + texto + '»';
      aviso.hidden = false;
      f.elements.tema.value = '';
    });
    ubicar(sec);
  }

  /* Compartí tus fotos con el hashtag ("compartirFotos: false" la apaga). Va después de la galería. */
  const etiquetaFotos = String(D.hashtag || '').replace(/^#/, '').replace(/[^\p{L}\p{N}_]/gu, '');
  if (etiquetaFotos && D.compartirFotos !== false && baseSeccion) {
    const sec = seccionNueva('Fotos', 'Compartí tus fotos', 'bw-fotos');
    sec.appendChild(parrafo('Subí tus fotos y videos de la fiesta con <strong>#' + escapar(etiquetaFotos) + '</strong> para que todos podamos verlos.'));
    const acciones = document.createElement('div');
    acciones.className = 'bw-acciones-extra';
    acciones.innerHTML = '<button type="button" class="boton">Copiar el hashtag</button>'
      + '<a class="boton boton-linea" href="https://www.instagram.com/explore/tags/' + encodeURIComponent(etiquetaFotos) + '/" target="_blank" rel="noopener">Ver en Instagram</a>';
    acciones.querySelector('button').addEventListener('click', e => copiarTexto('#' + etiquetaFotos, e.currentTarget));
    sec.appendChild(acciones);
    const galeria = $('#galeria');
    if (galeria) galeria.after(sec); else ubicar(sec);
  }

  /* ---------- Descripción de las fotos de la galería (para quien usa un lector de pantalla) ---------- */
  $$('[data-galeria] img').forEach((img, i) => {
    if (/^Foto \d+$/.test(img.getAttribute('alt') || '') && !vacio(D.nombre1)) img.alt = 'Foto ' + (i + 1) + ' de ' + quienes();
  });

  /* ---------- Mapas: <a data-mapa="ceremonia">Cómo llegar</a> ---------- */
  $$('[data-mapa]').forEach(a => {
    const lugar = leer(a.dataset.mapa) || {};
    const url = !vacio(lugar.mapa) && /^https?:\/\//i.test(String(lugar.mapa).trim()) ? String(lugar.mapa).trim()
      : !vacio(lugar.direccion) ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent([lugar.nombre, lugar.direccion].filter(Boolean).join(', '))
      : '';
    if (!url) { a.hidden = true; return; }
    a.href = url; a.target = '_blank'; a.rel = 'noopener';
  });

  /* ---------- Cuenta regresiva ---------- */
  const fecha = new Date(D.fecha || '');
  const dos = n => String(n).padStart(2, '0');
  const partes = ['dias', 'horas', 'minutos', 'segundos'].map(k => [k, $$('[data-cuenta="' + k + '"]')]);
  function tic() {
    if (isNaN(fecha.getTime())) return;
    let diff = fecha.getTime() - Date.now();
    if (diff <= 0) { diff = 0; $$('[data-cuenta-regresiva]').forEach(el => el.classList.add('llego')); }
    // Pasado el día de la boda la invitación agradece en vez de seguir diciendo "¡Llegó el gran día!"
    if (Date.now() - fecha.getTime() > 20 * 3600 * 1000 && !tic.despues) {
      tic.despues = true;
      $$('.cuenta-llego').forEach(el => { el.textContent = vacio(D.textoDespues) ? '¡Gracias por acompañarnos!' : String(D.textoDespues); });
      const f = $('#confirmacion');
      if (f) {
        const aviso = document.createElement('p');
        aviso.className = 'bw-cerrado';
        aviso.textContent = 'La confirmación ya cerró. ¡Gracias a todos los que nos acompañaron!';
        f.hidden = true; f.after(aviso);
        // Lo que habla de confirmar ya no corresponde
        $$('[data-si="confirmarHasta"], .confirmar-plazo, .bw-para, .bw-canciones').forEach(el => { el.hidden = true; });
      }
    }
    // Pasada la boda la cuenta queda en cero: no hace falta seguir recalculándola cada segundo
    if (tic.despues && tic.reloj) { clearInterval(tic.reloj); tic.reloj = 0; }
    const s = Math.floor(diff / 1000);
    const valores = { dias: Math.floor(s / 86400), horas: Math.floor((s % 86400) / 3600), minutos: Math.floor((s % 3600) / 60), segundos: s % 60 };
    partes.forEach(([k, els]) => els.forEach(el => { el.textContent = k === 'dias' ? String(valores[k]) : dos(valores[k]); }));
  }
  tic.reloj = setInterval(tic, 1000);
  tic();

  /* ---------- Agregar al calendario ----------
     En iPhone, iPad y Mac se entrega un archivo de calendario (.ics) que abre el calendario del
     teléfono; en el resto, Google Calendar. Antes se mandaba a todos a Google Calendar, que en un
     iPhone abre una página web y no el calendario. */
  const esIpad = /Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 0;  // las Mac no tienen pantalla táctil
  const esIos = /iPhone|iPad|iPod/.test(navigator.userAgent) || esIpad;
  const esApple = (esIos || /Macintosh/.test(navigator.userAgent)) && !/Android/.test(navigator.userAgent);
  // Diferencia horaria escrita en la fecha (ej. -03:00); si no hay, la de Argentina
  const zona = (() => { const m = /([+-])(\d{2}):?(\d{2})$/.exec(String(D.fecha || '').trim()); return m ? (m[1] === '-' ? -1 : 1) * (+m[2] * 60 + +m[3]) : -180; })();
  $$('[data-calendario]').forEach(a => {
    if (isNaN(fecha.getTime())) { a.hidden = true; return; }
    const utc = d => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
    // Termina una hora después del último momento del itinerario (ej. despedida a las 03:00 → 04:00);
    // si el itinerario no tiene horas, dura 6 horas
    const minutos = t => { const m = /^(\d{1,2}):(\d{2})/.exec(String(t).trim()); return m ? +m[1] * 60 + +m[2] : null; };
    const inicioLocal = new Date(fecha.getTime() + zona * 60000);
    const minInicio = inicioLocal.getUTCHours() * 60 + inicioLocal.getUTCMinutes();
    const saltos = $$('time').map(t => minutos(t.textContent)).filter(x => x !== null).map(x => (x - minInicio + 1440) % 1440);
    const ultimo = saltos.length ? Math.max(...saltos) : 0;
    const fin = new Date(fecha.getTime() + (ultimo >= 60 && ultimo <= 14 * 60 ? (ultimo + 60) * 60000 : 6 * 3600 * 1000));
    const lugar = D.ceremonia || D.fiesta || {};
    const titulo = mayus(elEvento());
    const donde = [lugar.nombre, lugar.direccion].filter(Boolean).join(', ');
    const detalle = vacio(D.frase) ? '' : String(D.frase);
    if (esApple) {
      const esc = s => String(s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
      // Los renglones de un archivo de calendario no pueden pasar de 75 bytes: se pliegan
      const plegar = linea => { const enc = new TextEncoder(); const out = []; let cur = '', n = 0; for (const ch of linea) { const b = enc.encode(ch).length; if (n + b > 75) { out.push(cur); cur = ' ' + ch; n = 1 + b; } else { cur += ch; n += b; } } out.push(cur); return out.join('\r\n'); };
      const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Boda Web//Invitacion//ES', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
        'UID:' + utc(fecha) + '-' + encodeURIComponent((D.nombre1 || '') + (D.nombre2 || '')).replace(/%/g, '') + '@bodaweb',
        'DTSTAMP:' + utc(new Date()), 'DTSTART:' + utc(fecha), 'DTEND:' + utc(fin),
        'SUMMARY:' + esc(titulo), 'DESCRIPTION:' + esc(detalle), 'LOCATION:' + esc(donde), 'END:VEVENT', 'END:VCALENDAR'].map(plegar).join('\r\n');
      a.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
      // En el iPhone/iPad el enlace abre el calendario directamente; en la Mac se baja el archivo y se abre con un toque
      if (!esIos) a.setAttribute('download', 'casamiento.ics');
      // Si está publicado el archivo evento.ics (lo arma actualizar-invitaciones.js) se usa ése: un archivo real
      // lo abren también los navegadores que no aceptan el calendario armado en el momento
      fetch('evento.ics', { method: 'HEAD', cache: 'no-store' }).then(r => { if (r.ok && /calendar/i.test(r.headers.get('content-type') || '')) a.href = 'evento.ics'; }).catch(() => {});
      return;
    }
    const p = new URLSearchParams({ action: 'TEMPLATE', text: titulo, dates: utc(fecha) + '/' + utc(fin), details: detalle, location: donde });
    a.href = 'https://calendar.google.com/calendar/render?' + p.toString();
    a.target = '_blank'; a.rel = 'noopener';
  });

  /* ---------- Copiar alias / CBU ---------- */
  $$('[data-copiar]').forEach(btn => {
    const texto = leer(btn.dataset.copiar);
    if (vacio(texto)) { btn.hidden = true; return; }
    const original = btn.textContent;
    btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(String(texto)); btn.textContent = '¡Copiado!'; }
      catch { window.prompt('Copiá el dato:', String(texto)); }
      setTimeout(() => { btn.textContent = original; }, 1800);
    });
  });

  /* ---------- Galería ampliada ---------- */
  const visor = $('#visor');
  if (visor) {
    const imgVisor = $('img', visor);
    const fotos = $$('[data-galeria] img');
    let actual = 0;
    const mostrar = i => {
      actual = (i + fotos.length) % fotos.length;
      imgVisor.src = fotos[actual].currentSrc || fotos[actual].src;
      imgVisor.alt = fotos[actual].alt || '';
      if (!visor.open) visor.showModal();
    };
    fotos.forEach((img, i) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => mostrar(i));
    });
    $('[data-visor-anterior]', visor)?.addEventListener('click', () => mostrar(actual - 1));
    $('[data-visor-siguiente]', visor)?.addEventListener('click', () => mostrar(actual + 1));
    $('[data-visor-cerrar]', visor)?.addEventListener('click', () => visor.close());
    visor.addEventListener('click', e => { if (e.target === visor) visor.close(); });
    document.addEventListener('keydown', e => {
      if (!visor.open) return;
      if (e.key === 'ArrowLeft') mostrar(actual - 1);
      if (e.key === 'ArrowRight') mostrar(actual + 1);
    });
  }

  /* ---------- Panel de los novios: cada confirmación y cada canción quedan guardadas ----------
     Si en datos.js está "panel" ({ invitacion: 'ana-y-bruno' }), además de WhatsApp la respuesta se guarda y
     los novios la ven en /panel/. Sin "panel", todo funciona como siempre (sólo WhatsApp). Si guardar falla,
     el invitado no se entera: el WhatsApp ya salió. */
  const PANEL_URL = 'https://PROYECTO.supabase.co';
  const PANEL_CLAVE = 'CLAVE_PUBLICA';
  function guardarEnPanel(tipo, datos) {
    const inv = D.panel && String(D.panel.invitacion || '').trim();
    if (!inv || esMuestra || /PROYECTO|CLAVE_PUBLICA/.test(PANEL_URL + PANEL_CLAVE)) return;
    try {
      fetch(PANEL_URL + '/rest/v1/rpc/registrar_respuesta', {
        method: 'POST', keepalive: true,
        headers: { 'Content-Type': 'application/json', apikey: PANEL_CLAVE, Authorization: 'Bearer ' + PANEL_CLAVE },
        body: JSON.stringify({ p_invitacion: inv, p_tipo: tipo, p_datos: datos })
      }).catch(() => {});
    } catch (_) {}
  }

  /* ---------- Confirmación de asistencia ---------- */
  const form = $('#confirmacion');
  if (form) {
    const whatsapp = String(D.whatsapp || '').replace(/\D/g, '');
    const error = $('[data-error]', form);
    const resultado = $('[data-resultado]', form);
    const resumen = $('[data-resumen]', form);
    const decir = msg => { if (!error) return; error.textContent = msg; error.hidden = !msg; };
    const botonConfirmar = $('[data-boton-confirmar]', form);
    if (botonConfirmar && !whatsapp) botonConfirmar.textContent = 'Preparar mi confirmación';
    const campoPersonas = form.elements.personas;
    if (campoPersonas) campoPersonas.max = String(maxPersonas);
    if ((invitado || lugares) && !tic.despues) {
      const saludo = document.createElement('p');
      saludo.className = 'bw-para';
      saludo.textContent = (invitado ? '¡Hola, ' + invitado + '! ' : '')
        + (nombresLink.length ? 'Esta invitación es para ' + lista(nombresLink) + '.' : lugares ? 'Esta invitación es para ' + lugares + (lugares === 1 ? ' persona.' : ' personas.') : '');
      form.insertAdjacentElement('beforebegin', saludo);
      if (invitado && form.elements.nombre && !form.elements.nombre.value) form.elements.nombre.value = invitado;
      if (lugares && campoPersonas) campoPersonas.placeholder = lugares === 1 ? '1' : 'Hasta ' + lugares;
    }

    // ---- Campos que se agregan según datos.js y el link. Copian los del propio formulario, así toman su estilo ----
    const grupoAsistencia = form.querySelector('fieldset');
    const nuevoGrupo = (leyenda, nombre, tipo, opciones) => {
      if (!grupoAsistencia || !grupoAsistencia.querySelector('.opcion')) return null;
      const fs = grupoAsistencia.cloneNode(true);
      const lg = fs.querySelector('legend'); if (lg) lg.textContent = leyenda;
      const molde = fs.querySelector('.opcion');
      fs.querySelectorAll('.opcion').forEach(o => o.remove());
      opciones.forEach(([valor, texto, marcado]) => {
        const o = molde.cloneNode(true); const inp = o.querySelector('input');
        inp.type = tipo; inp.name = nombre; inp.value = valor; inp.checked = !!marcado; inp.removeAttribute('required');
        const sp = o.querySelector('span'); if (sp) sp.textContent = texto; else o.append(texto);
        fs.appendChild(o);
      });
      fs.classList.add('bw-extra-campo');
      return fs;
    };
    let despuesDeAsistencia = grupoAsistencia;
    const agregarTrasAsistencia = el => { if (el && despuesDeAsistencia) { despuesDeAsistencia.after(el); despuesDeAsistencia = el; } };
    // Quiénes vienen (link con ?nombres=)
    if (nombresLink.length) {
      agregarTrasAsistencia(nuevoGrupo('¿Quiénes vienen?', 'quienes', 'checkbox', nombresLink.map(n => [n, n, true])));
      if (campoPersonas && campoPersonas.closest('label')) campoPersonas.closest('label').hidden = true;
    }
    // A qué evento va ("confirmarPorEvento: true" en datos.js, cuando hay ceremonia y fiesta)
    const porEvento = D.confirmarPorEvento === true && D.ceremonia && D.fiesta;
    if (porEvento) {
      const h = l => vacio(l && l.hora) ? '' : ' · ' + l.hora + ' hs';
      agregarTrasAsistencia(nuevoGrupo('¿A qué vas a ir?', 'eventos', 'checkbox', [['ceremonia', (esQuince ? 'La misa' : 'La ceremonia') + h(D.ceremonia), true], ['fiesta', 'La fiesta' + h(D.fiesta), true]]));
    }
    // Chicos ("preguntarChicos: true") y traslado (si hay "traslado" en datos.js): después de personas y comida
    let despuesDeDatos = (campoPersonas && campoPersonas.closest('.dos-columnas')) || (campoPersonas && campoPersonas.closest('label')) || despuesDeAsistencia;
    const agregarTrasDatos = el => { if (el && despuesDeDatos) { despuesDeDatos.after(el); despuesDeDatos = el; } };
    if (D.preguntarChicos === true && campoPersonas && campoPersonas.closest('label')) {
      const lab = campoPersonas.closest('label').cloneNode(true);
      lab.hidden = false; lab.classList.add('bw-extra-campo');
      const inp = lab.querySelector('input'); inp.name = 'chicos'; inp.min = '0'; inp.max = '15'; inp.placeholder = '0'; inp.value = '';
      [...lab.childNodes].filter(n => n.nodeType === 3 && n.nodeValue.trim()).forEach(n => { n.nodeValue = '¿Cuántos chicos vienen?'; });
      agregarTrasDatos(lab);
    }
    if (!vacio(D.traslado)) agregarTrasDatos(nuevoGrupo('¿Vas a usar el traslado?', 'traslado', 'radio', [['si', 'Sí, lo voy a usar'], ['no', 'No, voy por mi cuenta']]));
    // Si no viene, esos campos no hacen falta
    const extras = () => $$('.bw-extra-campo', form);
    form.addEventListener('change', e => { if (e.target.name === 'asistencia') extras().forEach(el => { el.hidden = e.target.value === 'no'; }); });

    // En un modelo de muestra no hay número cargado: se avisa qué pasa en la invitación real
    if (esMuestra && !whatsapp && botonConfirmar) {
      const nota = document.createElement('p');
      nota.className = 'bw-nota-muestra';
      nota.textContent = 'En la invitación real, este botón abre WhatsApp con la confirmación ya escrita, lista para mandársela a ' + anfitriones() + '.';
      botonConfirmar.insertAdjacentElement('beforebegin', nota);
    }
    form.addEventListener('submit', e => {
      e.preventDefault();
      const f = new FormData(form);
      const nombre = String(f.get('nombre') || '').trim();
      const asiste = f.get('asistencia');
      let personas = String(f.get('personas') || '').trim();
      const comida = String(f.get('comida') || '').trim();
      const mensaje = String(f.get('mensaje') || '').trim();
      const vienen = f.getAll('quienes').map(String);
      const eventos = f.getAll('eventos').map(String);
      const chicos = String(f.get('chicos') || '').trim();
      const traslado = f.get('traslado');
      if (!nombre) { decir('Contanos tu nombre para saber quién confirma.'); form.elements.nombre.focus(); return; }
      if (!asiste) { decir('Decinos si vas a poder venir.'); return; }
      if (asiste === 'si') {
        if (nombresLink.length) {
          if (!vienen.length) { decir('Marcá quiénes vienen.'); return; }
          personas = String(vienen.length);
        }
        if (porEvento && !eventos.length) { decir('Marcá a qué vas a ir: la ceremonia, la fiesta o las dos.'); return; }
        if (personas) {
          const n = Number(personas);
          if (!Number.isInteger(n) || n < 1) { decir('Revisá cuántos vienen: tiene que ser un número.'); form.elements.personas.focus(); return; }
          if (n > maxPersonas) { decir(lugares ? 'Esta invitación es para ' + lugares + (lugares === 1 ? ' persona.' : ' personas.') : 'Si vienen más de ' + maxPersonas + ', escribiles directamente a ' + anfitriones() + '.'); form.elements.personas.focus(); return; }
        }
        if (chicos && (!Number.isInteger(Number(chicos)) || Number(chicos) < 0)) { decir('Revisá cuántos chicos vienen: tiene que ser un número.'); form.elements.chicos.focus(); return; }
      }
      decir('');
      const si = asiste === 'si';
      // "a el casamiento" → "al casamiento"; y si vienen varios, se habla en plural
      const aEvento = ('a ' + elEvento()).replace(/^a el /, 'al ');
      const varios = si && (nombresLink.length ? vienen.length : Number(personas || 1)) > 1;
      const lineas = [
        '¡Hola! Soy ' + nombre + '.',
        si ? (varios ? 'Confirmo que vamos ' : 'Confirmo que voy ') + aEvento + '. 🎉' : 'Lamentablemente no voy a poder ir ' + aEvento + '.',
        ...(si && nombresLink.length ? ['Vamos ' + vienen.length + ': ' + lista(vienen) + '.'] : si && personas ? ['Somos ' + personas + (personas === '1' ? ' persona.' : ' personas.')] : []),
        ...(si && porEvento ? [(varios ? 'Vamos' : 'Voy') + (eventos.length === 2 ? (esQuince ? ' a la misa y a la fiesta.' : ' a la ceremonia y a la fiesta.') : ' sólo a la ' + (esQuince && eventos[0] === 'ceremonia' ? 'misa' : eventos[0]) + '.')] : []),
        ...(si && chicos && Number(chicos) > 0 ? ['Chicos: ' + chicos + '.'] : []),
        ...(si && traslado ? [traslado === 'si' ? (varios ? 'Vamos a usar el traslado.' : 'Voy a usar el traslado.') : (varios ? 'No usamos el traslado.' : 'No uso el traslado.')] : []),
        ...(si && comida ? ['Comida / restricciones: ' + comida] : []),
        ...(mensaje ? ['Mensaje: ' + mensaje] : [])
      ];
      const texto = lineas.join('\n');
      if (resumen) resumen.value = texto;
      guardarEnPanel('confirmacion', { nombre, asiste: si, personas: si ? Number(personas || 1) : 0, quienes: si ? vienen : [], eventos: si ? eventos : [], chicos: si ? Number(chicos || 0) : 0, traslado: si ? (traslado || '') : '', comida: si ? comida : '', mensaje, invitado });
      if (whatsapp) {
        window.open('https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
        if (resultado) resultado.innerHTML = '<strong>¡Gracias! Te abrimos WhatsApp con la confirmación lista.</strong> Si no se abrió, copiá el texto y mandalo al mismo número.';
      } else if (resultado) {
        resultado.innerHTML = esMuestra
          ? '<strong>Así queda el mensaje.</strong> En la invitación real se abre WhatsApp con este texto ya escrito para ' + escapar(anfitriones()) + '.'
          : '<strong>¡Gracias!</strong> Copiá el texto y mandáselo a ' + escapar(anfitriones()) + '.';
      }
      $('[data-listo]', form)?.removeAttribute('hidden');
      $('[data-listo]', form)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
    $('[data-copiar-resumen]', form)?.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(resumen.value); $('[data-copiado]', form).textContent = '¡Copiado!'; }
      catch { resumen.select(); $('[data-copiado]', form).textContent = 'Seleccioná y copiá el texto.'; }
    });
  }

  /* ---------- Música de fondo ----------
     Se declara en datos.js (musica: 'musica.mp3'). Si hay música, la invitación abre con una pantalla de
     bienvenida: "Entrar con música" / "Entrar sin música". Así la música arranca aunque el celular no deje
     reproducirla sola, y abrir la invitación se siente como abrir un sobre. Se muestra una vez por visita. */
  const audio = $('#musica');
  const botonMusica = $('[data-musica]');
  if (audio && botonMusica) {
    const archivo = vacio(D.musica) ? '' : String(D.musica).trim();
    botonMusica.hidden = !archivo;
    if (archivo) {
      audio.src = archivo;
      // Si el archivo no existe o no se puede leer, el botón se esconde en vez de quedar sin hacer nada
      audio.addEventListener('error', () => { botonMusica.hidden = true; });
      const pintar = () => { botonMusica.classList.toggle('sonando', !audio.paused); botonMusica.setAttribute('aria-label', audio.paused ? 'Reproducir música' : 'Pausar música'); };
      botonMusica.addEventListener('click', () => { if (audio.paused) audio.play().catch(() => {}); else audio.pause(); });
      audio.addEventListener('play', pintar);
      audio.addEventListener('pause', pintar);
      pintar();

      const claveEntrada = 'bw-entrada:' + location.pathname;
      let yaEntro = false;
      try { yaEntro = sessionStorage.getItem(claveEntrada) === '1'; } catch (_) {}
      // Las herramientas automáticas (capturas, pruebas) entran directo, salvo que pidan verla con ?entrada
      if (!yaEntro && !tic.despues && (!navigator.webdriver || parametros.has('entrada'))) {
        const cs = getComputedStyle(document.body);
        const h1 = $('h1') ? getComputedStyle($('h1')) : cs;
        const fondo = cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)' ? cs.backgroundColor : '#ffffff';
        const capa = document.createElement('div');
        capa.className = 'bw-entrada';
        capa.setAttribute('role', 'dialog'); capa.setAttribute('aria-modal', 'true'); capa.setAttribute('aria-labelledby', 'bw-entrada-nombres');
        capa.style.setProperty('--bw-fondo', fondo);
        capa.style.color = cs.color;
        const nombres = esQuince || vacio(D.nombre2) ? escapar(D.nombre1 || '') : escapar(D.nombre1) + ' <span>&amp;</span> ' + escapar(D.nombre2);
        capa.innerHTML = '<div class="bw-entrada-caja">'
          + '<p class="bw-entrada-pre">' + (esQuince ? 'Bienvenidos a la invitación de los 15 de' : 'Bienvenidos a la invitación de') + '</p>'
          + '<p class="bw-entrada-nombres" id="bw-entrada-nombres">' + nombres + '</p>'
          + '<p class="bw-entrada-nota">La música es parte de la invitación</p>'
          + '<button type="button" class="boton bw-entrada-con"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/></svg>Entrar con música</button>'
          + '<button type="button" class="bw-entrada-sin">Entrar sin música</button></div>';
        const nombresEl = capa.querySelector('.bw-entrada-nombres');
        nombresEl.style.fontFamily = h1.fontFamily; nombresEl.style.color = h1.color;
        document.body.appendChild(capa);
        document.documentElement.classList.add('bw-con-entrada');
        const entrar = conMusica => {
          try { sessionStorage.setItem(claveEntrada, '1'); } catch (_) {}
          if (conMusica) audio.play().catch(() => {});
          capa.classList.add('bw-saliendo');
          document.documentElement.classList.remove('bw-con-entrada');
          setTimeout(() => capa.remove(), 450);
          document.removeEventListener('keydown', teclas);
        };
        const teclas = e => { if (e.key === 'Escape') entrar(false); };
        document.addEventListener('keydown', teclas);
        capa.querySelector('.bw-entrada-con').addEventListener('click', () => entrar(true));
        capa.querySelector('.bw-entrada-sin').addEventListener('click', () => entrar(false));
        setTimeout(() => capa.querySelector('.bw-entrada-con').focus({ preventScroll: true }), 50);
      }
    }
  }

  /* ---------- Las secciones aparecen suavemente al bajar ---------- */
  const reveal = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visto'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    reveal.forEach(el => io.observe(el));
  } else reveal.forEach(el => el.classList.add('visto'));

  /* ---------- Crédito del pie ---------- */
  $$('[data-credito]').forEach(el => { if (D.credito === false) el.hidden = true; });

  /* ---------- Adentro del celular de la compu: se arrastra con el mouse, como con el dedo ----------
     Agarrar y arrastrar baja (o sube) la invitación, y al soltar sigue con envión, como en un teléfono.
     No cuesta nada mientras nadie arrastra: sólo escucha el mouse. Un arrastre no cuenta como "toque"
     en un botón, y sobre los campos del formulario el mouse funciona normal (para escribir y seleccionar). */
  if (enMarco && window.matchMedia && matchMedia('(pointer:fine)').matches) {
    let arrastre = null, movio = false, vel = 0, anim = 0, sinClickHasta = 0;
    const bajar = dy => window.scrollBy({ top: dy, behavior: 'instant' });
    const frenar = () => { cancelAnimationFrame(anim); anim = 0; };
    document.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      movio = false;
      if (e.target.closest('input,textarea,select,dialog[open]')) return;
      frenar();
      arrastre = { y: e.clientY, inicio: e.clientY, t: performance.now(), id: e.pointerId }; movio = false; vel = 0;
    });
    window.addEventListener('pointermove', e => {
      if (!arrastre) return;
      if (e.buttons === 0) { soltar(); return; }
      if (!movio) {
        if (Math.abs(e.clientY - arrastre.inicio) < 6) return;
        movio = true; raiz.classList.add('bw-arrastrando');
        try { raiz.setPointerCapture(arrastre.id); } catch (_) {}
        window.getSelection()?.removeAllRanges();
      }
      const ahora = performance.now(), dt = Math.max(8, ahora - arrastre.t), dy = e.clientY - arrastre.y;
      bajar(-dy);
      vel = 0.7 * (-dy / dt) + 0.3 * vel;
      arrastre.y = e.clientY; arrastre.t = ahora;
      e.preventDefault();
    });
    function soltar() {
      if (!arrastre) return;
      const ultimo = arrastre; arrastre = null;
      raiz.classList.remove('bw-arrastrando');
      if (movio) sinClickHasta = performance.now() + 100;
      try { raiz.releasePointerCapture(ultimo.id); } catch (_) {}
      if (!movio || performance.now() - ultimo.t > 120) return;
      let v = vel * 16;
      const paso = () => { v *= 0.95; if (Math.abs(v) < 0.4) { anim = 0; return; } bajar(v); anim = requestAnimationFrame(paso); };
      anim = requestAnimationFrame(paso);
    }
    window.addEventListener('pointerup', soltar);
    window.addEventListener('pointercancel', soltar);
    window.addEventListener('wheel', frenar, { passive: true });
    // Sólo se anula el click que el navegador dispara justo al soltar un arrastre
    document.addEventListener('click', e => { if (performance.now() < sinClickHasta) { e.preventDefault(); e.stopPropagation(); } }, true);
    document.addEventListener('dragstart', e => { if (!e.target.closest('input,textarea')) e.preventDefault(); });
  }

  /* ---------- Estilos que comparten todos los modelos (zona tocable del crédito, nota y barra de muestra) ---------- */
  const estilo = document.createElement('style');
  estilo.textContent = [
    '.credito a{display:inline-block;padding:12px 6px;margin:-12px -6px;text-decoration:underline;text-underline-offset:3px}',
    'html.bw-en-marco{cursor:grab}',
    'html.bw-en-marco input,html.bw-en-marco textarea,html.bw-en-marco select{cursor:auto}',
    'html.bw-arrastrando,html.bw-arrastrando *{cursor:grabbing!important;user-select:none!important;-webkit-user-select:none!important}',
    // Entrada con o sin música
    '.bw-entrada{position:fixed;inset:0;z-index:120;display:grid;place-items:center;padding:24px;background:var(--bw-fondo,#fff);text-align:center;transition:opacity .45s ease,visibility .45s}',
    '.bw-entrada:before{content:"";position:absolute;inset:0;background:radial-gradient(70% 50% at 50% 40%,rgba(255,255,255,.35),transparent 70%);pointer-events:none}',
    '.bw-entrada.bw-saliendo{opacity:0;visibility:hidden}',
    'html.bw-con-entrada,html.bw-con-entrada body{overflow:hidden}',
    '.bw-entrada-caja{position:relative;display:grid;gap:14px;justify-items:center;max-width:420px;animation:bw-aparece .7s ease both}',
    '.bw-entrada-pre{margin:0;font-size:15px;letter-spacing:.06em;opacity:.8}',
    '.bw-entrada-nombres{margin:0 0 6px;font-size:clamp(40px,12vw,64px);line-height:1.1}',
    '.bw-entrada-nombres span{font-size:.6em;opacity:.8}',
    '.bw-entrada-nota{margin:0;font-size:14px;opacity:.75}',
    '.bw-entrada .boton{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-width:240px;margin-top:4px}',
    '.bw-entrada-sin{background:none;border:0;color:inherit;font:inherit;font-size:15px;text-decoration:underline;text-underline-offset:4px;opacity:.85;padding:12px;cursor:pointer}',
    '@keyframes bw-aparece{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}',
    // Sugerí una canción y compartí tus fotos
    '.bw-cancion{display:grid;gap:12px;max-width:480px;margin:18px auto 0;text-align:left}',
    '.bw-cancion label{display:grid;gap:6px;font-size:14px;font-weight:600}',
    '.bw-cancion input{font:inherit;font-size:16px;font-weight:400;padding:12px 14px;border-radius:12px;border:1.5px solid rgba(127,127,127,.4);background:transparent;color:inherit;width:100%;min-height:48px}',
    '.bw-cancion input::placeholder{color:inherit;opacity:.5}',
    '.bw-cancion .boton{justify-self:stretch;width:100%}',
    '.bw-cancion-aviso{margin:0;font-size:15px;line-height:1.45;padding:10px 14px;border-radius:12px;background:rgba(127,127,127,.12)}',
    '.bw-acciones-extra{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:18px}',
    // Probalo con sus nombres (ventana del celular)
    '.bw-probar-dialogo{border:0;border-radius:20px;padding:26px 20px 20px;width:min(92vw,380px);background:#fffdfb;color:#2a2320;box-shadow:0 24px 60px rgba(0,0,0,.3);font:15px/1.4 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}',
    '.bw-probar-dialogo::backdrop{background:rgba(20,16,14,.55)}',
    '.bw-probar-cerrar{position:absolute;top:6px;right:6px;width:44px;height:44px;border:0;background:none;font-size:26px;line-height:1;cursor:pointer;color:inherit}',
    '.bw-probar-dialogo .bw-probar-form{display:grid;gap:12px}',
    '.bw-probar-dialogo .bw-probar-titulo{margin:0;font-weight:700;font-size:18px}',
    '.bw-probar-dialogo .bw-probar-fila{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:center}',
    '.bw-probar-dialogo .bw-probar-uno{grid-template-columns:1fr}',
    '.bw-probar-dialogo input{width:100%;min-width:0;font:16px system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;padding:12px;border-radius:12px;border:1px solid rgba(42,35,32,.3);background:#fff;color:#2a2320;min-height:48px}',
    '.bw-probar-dialogo .bw-probar-fecha{display:grid;gap:6px;font-weight:600;font-size:14px}',
    '.bw-probar-dialogo .bw-probar-fecha span{font-weight:400;opacity:.7}',
    '.bw-probar-dialogo .bw-probar-error{margin:0;color:#b03a2e;font-size:14px}',
    '.bw-probar-dialogo button[type=submit]{min-height:48px;border-radius:999px;border:0;background:#2a2320;color:#fff;font:700 15px system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;cursor:pointer}',
    '.bw-colores{display:grid;gap:8px;margin-top:16px;padding-top:16px;border-top:1px solid rgba(42,35,32,.12)}',
    '.bw-colores-titulo{margin:0;font-weight:700;font-size:15px}',
    '.bw-colores-lista{display:flex;flex-wrap:wrap;gap:8px}',
    '.bw-color{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:6px 14px 6px 6px;border-radius:999px;border:1px solid rgba(42,35,32,.25);color:inherit;text-decoration:none;font:600 14px/1.2 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}',
    '.bw-color.activo{border:2px solid currentColor;padding:5px 13px 5px 5px}',
    '.bw-color-muestra{display:inline-flex;width:30px;height:30px;border-radius:50%;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(0,0,0,.18);transform:rotate(-45deg)}',
    '.bw-color-muestra i{flex:1}',
    '.bw-para{font-size:1.15em;font-weight:600;margin:0 auto 18px;max-width:560px;text-align:center}',
    '.bw-cerrado{font-size:1.2em;font-style:italic;margin:10px auto 0;max-width:520px;text-align:center}',
    '.bw-nota-muestra{font:500 14px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:inherit;opacity:.8;margin:0 0 12px;padding:10px 14px;border-radius:12px;background:rgba(127,127,127,.12)}',
    '.bw-muestra{position:fixed;left:0;right:0;bottom:0;z-index:60;display:flex;align-items:center;justify-content:center;gap:10px;padding:10px 14px;padding-bottom:calc(10px + env(safe-area-inset-bottom));background:rgba(26,22,20,.94);color:#fff;font:600 14px/1.3 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;transform:translateY(110%);transition:transform .3s ease;box-shadow:0 -8px 24px rgba(0,0,0,.18)}',
    '.bw-muestra.ver{transform:none}',
    '.bw-muestra span{flex:1;min-width:0;text-align:left}',
    '.bw-muestra a{color:#fff;text-decoration:none;padding:11px 16px;border-radius:999px;border:1px solid rgba(255,255,255,.55);white-space:nowrap;min-height:44px;display:inline-flex;align-items:center}',
    '.bw-muestra a.bw-principal{background:#fff;color:#2a2320;border-color:#fff}',
    '.bw-muestra a:focus-visible{outline:2px solid #fff;outline-offset:2px}',
    '.bw-muestra .bw-volver{gap:6px}',
    '.bw-muestra button{font:inherit;color:#fff;background:transparent;padding:11px 16px;border-radius:999px;border:1px solid rgba(255,255,255,.55);white-space:nowrap;min-height:44px;cursor:pointer}',
    '.bw-muestra button:focus-visible{outline:2px solid #fff;outline-offset:2px}',
    '@media (max-width:560px){.bw-muestra>span{display:none}.bw-muestra{justify-content:stretch;gap:8px;padding-left:10px;padding-right:10px}.bw-muestra a,.bw-muestra button{flex:1;justify-content:center;padding-left:8px;padding-right:8px}.bw-muestra .bw-volver{flex:0 0 44px;padding:0}.bw-muestra .bw-volver b{display:none}}',
    '.bw-muestra .bw-volver b{font-weight:600}',
    'body.bw-con-barra{padding-bottom:calc(72px + env(safe-area-inset-bottom))}',
    'body.bw-con-barra .musica{bottom:calc(84px + env(safe-area-inset-bottom))}',
    '@media (prefers-reduced-motion:reduce){.bw-muestra{transition:none}}'
  ].join('\n');
  document.head.appendChild(estilo);

  /* ---------- Modelo de muestra: barra para volver a Boda Web o pedir este diseño ----------
     Aparece recién al bajar (la portada tiene que verse entera) y lleva el nombre del modelo al pedido. */
  if (enMarco) $$('a[href]').forEach(a => { const h = a.getAttribute('href') || ''; if (!h.startsWith('#') && !a.target && !a.hasAttribute('download') && !a.hasAttribute('data-calendario')) a.target = '_top'; });
  if (esMuestra && !enMarco) {
    const inicio = location.pathname.replace(/\/modelos\/[^/]+\/?.*$/, '/');
    const barra = document.createElement('div');
    barra.className = 'bw-muestra';
    barra.setAttribute('role', 'region');
    barra.setAttribute('aria-label', 'Este es un diseño de muestra de Boda Web');
    const nombreModelo = vacio(D.modelo) ? '' : String(D.modelo);
    barra.innerHTML = '<span>' + (prueba ? 'Así se vería su invitación' : 'Este es un diseño de muestra de Boda Web') + '</span>'
      + '<a class="bw-volver" href="' + inicio + '#disenos" aria-label="Ver otros diseños"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg><b>Otros diseños</b></a>'
      + '<button type="button" class="bw-abrir-probar">' + (paletas.length > 1 ? (esQuince ? 'Nombre y colores' : 'Nombres y colores') : esQuince ? (prueba ? 'Cambiar nombre' : 'Con su nombre') : prueba ? 'Cambiar nombres' : 'Con sus nombres') + '</button>'
      + '<a class="bw-principal" href="' + escapar(linkPedido(nombreModelo)) + '">Quiero este</a>';
    document.body.appendChild(barra);
    const dlg = document.createElement('dialog');
    dlg.className = 'bw-probar-dialogo';
    dlg.setAttribute('aria-label', esQuince ? 'Probalo con su nombre' : paletas.length > 1 ? 'Probalo con sus nombres y sus colores' : 'Probalo con sus nombres');
    dlg.innerHTML = '<button type="button" class="bw-probar-cerrar" aria-label="Cerrar">×</button>' + formProbar() + htmlColores();
    document.body.appendChild(dlg);
    activarProbar(dlg.querySelector('form'));
    dlg.querySelector('.bw-probar-cerrar').addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
    barra.querySelector('.bw-abrir-probar').addEventListener('click', () => { dlg.showModal(); setTimeout(() => dlg.querySelector('input').focus(), 50); });
    document.body.classList.add('bw-con-barra');
    let visible = false;
    const revisar = () => {
      const mostrar = window.scrollY > window.innerHeight * 0.5;
      if (mostrar !== visible) { visible = mostrar; barra.classList.toggle('ver', mostrar); }
    };
    window.addEventListener('scroll', revisar, { passive: true });
    revisar();
  }
})();
