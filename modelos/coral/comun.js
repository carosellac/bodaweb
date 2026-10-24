/* =====================================================================
   COMPORTAMIENTO COMÚN DE LAS INVITACIONES
   Acá no hay nada que completar: los datos de la pareja van en datos.js.
   Este archivo es IDÉNTICO en todos los modelos (si se corrige algo, copiarlo a todos). Hace:
   · escribe nombres, fechas y lugares donde el HTML dice data-dato="…"
   · cuenta regresiva · botón "Agregar al calendario" (Google, o el calendario del iPhone/Mac)
   · enlaces a Google Maps · copiar alias / CBU · galería ampliada · confirmación por WhatsApp
   · música (si en datos.js se completa "musica")
   · en los modelos de MUESTRA (carpeta modelos/) agrega una barra para volver a Boda Web o pedir ese diseño
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
  $$('[data-dato]').forEach(el => { const v = leer(el.dataset.dato); if (!vacio(v)) el.textContent = v; });
  /* Un bloque con data-si="regalo.alias" se esconde si ese dato está vacío */
  $$('[data-si]').forEach(el => { if (vacio(leer(el.dataset.si))) el.hidden = true; });
  if (!vacio(D.nombre1) && !vacio(D.nombre2)) {
    document.title = D.nombre1 + ' & ' + D.nombre2 + (vacio(D.fechaTexto) ? '' : ' · ' + D.fechaTexto);
  }

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
    const fin = new Date(fecha.getTime() + 6 * 3600 * 1000);
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

  /* ---------- Estilos que comparten todos los modelos (zona tocable del crédito, nota y barra de muestra) ---------- */
  const estilo = document.createElement('style');
  estilo.textContent = [
    '.credito a{display:inline-block;padding:12px 6px;margin:-12px -6px;text-decoration:underline;text-underline-offset:3px}',
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
  if (esMuestra) {
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
