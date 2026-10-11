/* =====================================================================
   COMPORTAMIENTO COMÚN DE LAS INVITACIONES
   Acá no hay nada que completar: los datos de la pareja van en datos.js.
   Este archivo es idéntico en los seis modelos. Hace:
   · escribe nombres, fechas y lugares donde el HTML dice data-dato="…"
   · cuenta regresiva · botón "Agregar al calendario" · enlaces a Google Maps
   · copiar alias / CBU · galería ampliada · confirmación por WhatsApp · música
   ===================================================================== */
(() => {
  'use strict';
  const D = (typeof DATOS !== 'undefined' ? DATOS : window.DATOS) || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const leer = clave => String(clave || '').split('.').reduce((o, k) => (o == null ? undefined : o[k]), D);
  const vacio = v => v === undefined || v === null || String(v).trim() === '';

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

  /* ---------- Agregar al calendario (Google Calendar) ---------- */
  $$('[data-calendario]').forEach(a => {
    if (isNaN(fecha.getTime())) { a.hidden = true; return; }
    const utc = d => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
    const fin = new Date(fecha.getTime() + 6 * 3600 * 1000);
    const lugar = D.ceremonia || D.fiesta || {};
    const p = new URLSearchParams({
      action: 'TEMPLATE',
      text: 'Casamiento de ' + D.nombre1 + ' y ' + D.nombre2,
      dates: utc(fecha) + '/' + utc(fin),
      details: vacio(D.frase) ? '' : D.frase,
      location: [lugar.nombre, lugar.direccion].filter(Boolean).join(', ')
    });
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
        resultado.innerHTML = '<strong>¡Gracias!</strong> Copiá el texto y mandáselo a los novios.';
      }
      $('[data-listo]', form)?.removeAttribute('hidden');
      $('[data-listo]', form)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
    $('[data-copiar-resumen]', form)?.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(resumen.value); $('[data-copiado]', form).textContent = '¡Copiado!'; }
      catch { resumen.select(); $('[data-copiado]', form).textContent = 'Seleccioná y copiá el texto.'; }
    });
  }

  /* ---------- Música de fondo ---------- */
  const audio = $('#musica');
  const botonMusica = $('[data-musica]');
  if (audio && botonMusica) {
    botonMusica.hidden = true;
    fetch(audio.getAttribute('src'), { method: 'HEAD' }).then(r => { if (r.ok) botonMusica.hidden = false; }).catch(() => {});
    const pintar = () => { botonMusica.classList.toggle('sonando', !audio.paused); botonMusica.setAttribute('aria-label', audio.paused ? 'Reproducir música' : 'Pausar música'); };
    botonMusica.addEventListener('click', () => { if (audio.paused) audio.play().catch(() => {}); else audio.pause(); });
    audio.addEventListener('play', pintar);
    audio.addEventListener('pause', pintar);
    pintar();
  }

  /* ---------- Las secciones aparecen suavemente al bajar ---------- */
  const reveal = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visto'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    reveal.forEach(el => io.observe(el));
  } else reveal.forEach(el => el.classList.add('visto'));

  /* ---------- Crédito del pie ---------- */
  $$('[data-credito]').forEach(el => { if (D.credito === false) el.hidden = true; });
})();
