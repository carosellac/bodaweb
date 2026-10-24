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
  if (!vacio(D.nombre1) && !vacio(D.nombre2)) {
    document.title = D.nombre1 + ' & ' + D.nombre2 + (vacio(D.fechaTexto) ? '' : ' · ' + D.fechaTexto);
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
      '@media (max-width:1100px){.bw-lado{max-width:260px}}'
    ].join('\n');
    document.head.appendChild(css);
    const marco = document.createElement('div');
    marco.className = 'bw-marco';
    const nombreModelo = vacio(D.modelo) ? '' : String(D.modelo);
    const inicio = location.pathname.replace(/\/modelos\/[^/]+\/?.*$/, '/');
    const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const lado = esMuestra
      ? '<div class="bw-lado"><p class="bw-eyebrow">Diseño de muestra · Boda Web</p>'
        + '<h1 class="bw-titulo">' + esc(nombreModelo || 'Invitación') + '</h1>'
        + '<p class="bw-texto">Así la ven tus invitados en el celular. Arrastrala con el mouse o usá la ruedita para recorrerla completa: cuenta regresiva, mapa, galería y confirmación.</p>'
        + '<div class="bw-acciones"><a class="bw-principal" href="' + inicio + (nombreModelo ? '?diseno=' + encodeURIComponent(nombreModelo) : '') + '">Quiero este diseño</a>'
        + '<a href="' + inicio + '#disenos">Ver otros diseños</a></div></div>'
      : '';
    const flecha = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
    marco.innerHTML = lado + '<div class="bw-caja"><div class="bw-telefono"><iframe title="' + esc(document.title) + '" src="' + esc(location.href) + '"></iframe></div>'
      + '<button type="button" class="bw-flechas" aria-label="Bajar para ver más de la invitación"><span class="bw-circulo"><span>' + flecha + flecha + '</span></span><span>Bajá para ver más</span></button></div>';
    document.body.appendChild(marco);
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
  const parametros = new URLSearchParams(location.search);
  const invitado = String(parametros.get('para') || '').trim().slice(0, 80);
  const lugaresLink = parseInt(parametros.get('lugares'), 10);
  const lugares = lugaresLink >= 1 && lugaresLink <= 30 ? lugaresLink : 0;
  const maxPersonas = lugares || (parseInt(D.maxPersonas, 10) >= 1 ? parseInt(D.maxPersonas, 10) : 12);

  /* ---------- Información útil (opcional): chicos y dónde dormir ----------
     Si en datos.js se completa "ninos" o "alojamiento", aparece una sección con el mismo estilo que la de
     vestimenta de cada modelo. Vacíos = no aparece nada. */
  const infoItems = [['Chicos', D.ninos], ['Dónde dormir', D.alojamiento]].filter(([, t]) => !vacio(t));
  if (infoItems.length) {
    const base = $('section.vestimenta') || $('#regalos');
    if (base) {
      const sec = base.cloneNode(false);
      sec.removeAttribute('id'); sec.removeAttribute('data-si'); sec.hidden = false; sec.classList.add('bw-info');
      const etiquetaBase = base.querySelector('.antetitulo, .etiqueta, .chico');
      if (etiquetaBase) { const e = etiquetaBase.cloneNode(false); e.removeAttribute('data-dato'); e.removeAttribute('data-si'); e.textContent = 'Información útil'; sec.appendChild(e); }
      const tituloBase = base.querySelector('h2');
      const h = tituloBase ? tituloBase.cloneNode(false) : document.createElement('h2');
      h.removeAttribute('data-dato'); h.removeAttribute('data-si'); h.textContent = 'Para que no te falte nada'; sec.appendChild(h);
      const parrafoBase = [...base.querySelectorAll('p')].find(x => !x.matches('.antetitulo, .etiqueta, .chico') && !x.hasAttribute('data-dato'));
      infoItems.forEach(([titulo, texto]) => {
        const pp = parrafoBase ? parrafoBase.cloneNode(false) : document.createElement('p');
        pp.removeAttribute('data-dato'); pp.removeAttribute('data-si');
        pp.innerHTML = '<strong>' + titulo + ':</strong> ' + escapar(texto);
        pp.style.marginTop = '12px';
        sec.appendChild(pp);
      });
      if (base.matches('section.vestimenta')) base.after(sec); else base.before(sec);
    }
  }

  /* ---------- Descripción de las fotos de la galería (para quien usa un lector de pantalla) ---------- */
  $$('[data-galeria] img').forEach((img, i) => {
    if (/^Foto \d+$/.test(img.getAttribute('alt') || '') && !vacio(D.nombre1)) img.alt = 'Foto ' + (i + 1) + ' de ' + D.nombre1 + ' y ' + D.nombre2;
  });

  /* ---------- Mapas: <a data-mapa="ceremonia">Cómo llegar</a> ---------- */
  $$('[data-mapa]').forEach(a => {
    const lugar = leer(a.dataset.mapa) || {};
    const url = !vacio(lugar.mapa) ? lugar.mapa
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
      }
    }
    const s = Math.floor(diff / 1000);
    const valores = { dias: Math.floor(s / 86400), horas: Math.floor((s % 86400) / 3600), minutos: Math.floor((s % 3600) / 60), segundos: s % 60 };
    partes.forEach(([k, els]) => els.forEach(el => { el.textContent = k === 'dias' ? String(valores[k]) : dos(valores[k]); }));
  }
  tic();
  setInterval(tic, 1000);

  /* ---------- Agregar al calendario ----------
     En iPhone, iPad y Mac se entrega un archivo de calendario (.ics) que abre el calendario del
     teléfono; en el resto, Google Calendar. Antes se mandaba a todos a Google Calendar, que en un
     iPhone abre una página web y no el calendario. */
  const esApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent) && !/Android/.test(navigator.userAgent);
  const esIos = /iPhone|iPad|iPod/.test(navigator.userAgent);
  $$('[data-calendario]').forEach(a => {
    if (isNaN(fecha.getTime())) { a.hidden = true; return; }
    const utc = d => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
    // Termina una hora después del último momento del itinerario (ej. despedida a las 03:00 → 04:00);
    // si el itinerario no tiene horas, dura 6 horas
    const minutos = t => { const m = /^(\d{1,2}):(\d{2})/.exec(String(t).trim()); return m ? +m[1] * 60 + +m[2] : null; };
    const inicioAR = new Date(fecha.getTime() - 3 * 3600 * 1000);
    const minInicio = inicioAR.getUTCHours() * 60 + inicioAR.getUTCMinutes();
    const saltos = $$('time').map(t => minutos(t.textContent)).filter(x => x !== null).map(x => (x - minInicio + 1440) % 1440);
    const ultimo = saltos.length ? Math.max(...saltos) : 0;
    const fin = new Date(fecha.getTime() + (ultimo >= 60 && ultimo <= 14 * 60 ? (ultimo + 60) * 60000 : 6 * 3600 * 1000));
    const lugar = D.ceremonia || D.fiesta || {};
    const titulo = 'Casamiento de ' + D.nombre1 + ' y ' + D.nombre2;
    const donde = [lugar.nombre, lugar.direccion].filter(Boolean).join(', ');
    const detalle = vacio(D.frase) ? '' : String(D.frase);
    if (esApple) {
      const esc = s => String(s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
      const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Boda Web//Invitacion//ES', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
        'UID:' + utc(fecha) + '-' + encodeURIComponent((D.nombre1 || '') + (D.nombre2 || '')).replace(/%/g, '') + '@bodaweb',
        'DTSTAMP:' + utc(new Date()), 'DTSTART:' + utc(fecha), 'DTEND:' + utc(fin),
        'SUMMARY:' + esc(titulo), 'DESCRIPTION:' + esc(detalle), 'LOCATION:' + esc(donde), 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
      a.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
      // En el iPhone el enlace abre el calendario directamente; en la Mac se baja el archivo y se abre con un toque
      if (!esIos) a.setAttribute('download', 'casamiento.ics');
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
    if (invitado || lugares) {
      const saludo = document.createElement('p');
      saludo.className = 'bw-para';
      saludo.textContent = (invitado ? '¡Hola, ' + invitado + '! ' : '') + (lugares ? 'Esta invitación es para ' + lugares + (lugares === 1 ? ' persona.' : ' personas.') : '');
      form.insertAdjacentElement('beforebegin', saludo);
      if (invitado && form.elements.nombre && !form.elements.nombre.value) form.elements.nombre.value = invitado;
      if (lugares && campoPersonas) campoPersonas.placeholder = lugares === 1 ? '1' : 'Hasta ' + lugares;
    }
    // En un modelo de muestra no hay número cargado: se avisa qué pasa en la invitación real
    if (esMuestra && !whatsapp && botonConfirmar) {
      const nota = document.createElement('p');
      nota.className = 'bw-nota-muestra';
      nota.textContent = 'En la invitación real, este botón abre WhatsApp con la confirmación ya escrita, lista para mandársela a los novios.';
      botonConfirmar.insertAdjacentElement('beforebegin', nota);
    }
    form.addEventListener('submit', e => {
      e.preventDefault();
      const f = new FormData(form);
      const nombre = String(f.get('nombre') || '').trim();
      const asiste = f.get('asistencia');
      const personas = String(f.get('personas') || '').trim();
      const comida = String(f.get('comida') || '').trim();
      const mensaje = String(f.get('mensaje') || '').trim();
      if (!nombre) { decir('Contanos tu nombre para saber quién confirma.'); form.elements.nombre.focus(); return; }
      if (!asiste) { decir('Decinos si vas a poder venir.'); return; }
      if (asiste === 'si' && personas) {
        const n = Number(personas);
        if (!Number.isInteger(n) || n < 1) { decir('Revisá cuántos vienen: tiene que ser un número.'); form.elements.personas.focus(); return; }
        if (n > maxPersonas) { decir(lugares ? 'Esta invitación es para ' + lugares + (lugares === 1 ? ' persona.' : ' personas.') : 'Si vienen más de ' + maxPersonas + ', escribiles directamente a los novios.'); form.elements.personas.focus(); return; }
      }
      decir('');
      const lineas = [
        '¡Hola! Soy ' + nombre + '.',
        asiste === 'si'
          ? 'Confirmo que voy al casamiento de ' + D.nombre1 + ' y ' + D.nombre2 + '. 🎉'
          : 'Lamentablemente no voy a poder ir al casamiento de ' + D.nombre1 + ' y ' + D.nombre2 + '.',
        ...(asiste === 'si' && personas ? ['Somos ' + personas + (personas === '1' ? ' persona.' : ' personas.')] : []),
        ...(asiste === 'si' && comida ? ['Comida / restricciones: ' + comida] : []),
        ...(mensaje ? ['Mensaje: ' + mensaje] : [])
      ];
      const texto = lineas.join('\n');
      if (resumen) resumen.value = texto;
      if (whatsapp) {
        window.open('https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
        if (resultado) resultado.innerHTML = '<strong>¡Gracias! Te abrimos WhatsApp con la confirmación lista.</strong> Si no se abrió, copiá el texto y mandalo al mismo número.';
      } else if (resultado) {
        resultado.innerHTML = esMuestra
          ? '<strong>Así queda el mensaje.</strong> En la invitación real se abre WhatsApp con este texto ya escrito para los novios.'
          : '<strong>¡Gracias!</strong> Copiá el texto y mandáselo a los novios.';
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
     Se declara en datos.js (musica: 'musica.mp3'). Antes se preguntaba al servidor si existía el
     archivo, y en cada invitación sin música eso dejaba un error de "archivo no encontrado". */
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
    '.bw-para{font-size:1.15em;font-weight:600;margin:0 auto 18px;max-width:560px;text-align:center}',
    '.bw-cerrado{font-size:1.2em;font-style:italic;margin:10px auto 0;max-width:520px;text-align:center}',
    '.bw-nota-muestra{font:500 14px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:inherit;opacity:.8;margin:0 0 12px;padding:10px 14px;border-radius:12px;background:rgba(127,127,127,.12)}',
    '.bw-muestra{position:fixed;left:0;right:0;bottom:0;z-index:60;display:flex;align-items:center;justify-content:center;gap:10px;padding:10px 14px;padding-bottom:calc(10px + env(safe-area-inset-bottom));background:rgba(26,22,20,.94);color:#fff;font:600 14px/1.3 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;transform:translateY(110%);transition:transform .3s ease;box-shadow:0 -8px 24px rgba(0,0,0,.18)}',
    '.bw-muestra.ver{transform:none}',
    '.bw-muestra span{flex:1;min-width:0;text-align:left}',
    '.bw-muestra a{color:#fff;text-decoration:none;padding:11px 16px;border-radius:999px;border:1px solid rgba(255,255,255,.55);white-space:nowrap;min-height:44px;display:inline-flex;align-items:center}',
    '.bw-muestra a.bw-principal{background:#fff;color:#2a2320;border-color:#fff}',
    '.bw-muestra a:focus-visible{outline:2px solid #fff;outline-offset:2px}',
    '@media (max-width:560px){.bw-muestra span{display:none}.bw-muestra{justify-content:stretch}.bw-muestra a{flex:1;justify-content:center}}',
    'body.bw-con-barra{padding-bottom:calc(72px + env(safe-area-inset-bottom))}',
    'body.bw-con-barra .musica{bottom:calc(84px + env(safe-area-inset-bottom))}',
    '@media (prefers-reduced-motion:reduce){.bw-muestra{transition:none}}'
  ].join('\n');
  document.head.appendChild(estilo);

  /* ---------- Modelo de muestra: barra para volver a Boda Web o pedir este diseño ----------
     Aparece recién al bajar (la portada tiene que verse entera) y lleva el nombre del modelo al pedido. */
  if (enMarco) $$('a[href]').forEach(a => { const h = a.getAttribute('href') || ''; if (!h.startsWith('#') && !a.target) a.target = '_top'; });
  if (esMuestra && !enMarco) {
    const inicio = location.pathname.replace(/\/modelos\/[^/]+\/?.*$/, '/');
    const barra = document.createElement('div');
    barra.className = 'bw-muestra';
    barra.setAttribute('role', 'region');
    barra.setAttribute('aria-label', 'Este es un diseño de muestra de Boda Web');
    const nombreModelo = vacio(D.modelo) ? '' : String(D.modelo);
    barra.innerHTML = '<span>Este es un diseño de muestra de Boda Web</span>'
      + '<a href="' + inicio + '#disenos">Ver otros diseños</a>'
      + '<a class="bw-principal" href="' + inicio + (nombreModelo ? '?diseno=' + encodeURIComponent(nombreModelo) : '') + '">Quiero este diseño</a>';
    document.body.appendChild(barra);
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
