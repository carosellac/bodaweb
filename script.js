/* =====================================================================
   DATOS DE CONTACTO — lo único que hay que completar para que la web venda.
   · whatsapp: número con código de país y sin espacios ni símbolos.
     Argentina: 549 + código de área sin 0 + número sin 15. Ej. '5492246530085'.
   · instagram: solo el usuario, sin la @. Ej. 'bodaweb'.
   · email: casilla a la que pueden escribir. Ej. 'hola@bodaweb.com'.
   Lo que quede vacío no se muestra en la web. El formulario envía por WhatsApp
   si hay número; si no, por email; si no hay ninguno, deja copiar el pedido.
   ===================================================================== */
const CONTACTO = {
  whatsapp: '',
  instagram: '',
  email: ''
};

/* =====================================================================
   MEDICIÓN DE VISITAS (opcional). Pegá acá el ID de Google Analytics
   (empieza con G-) y el contador se activa solo. Vacío = no se mide nada.
   ===================================================================== */
const ANALITICA = {
  google: ''
};

(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const menuButton = $('.mobile-menu-toggle');
  const mobileNav = $('#mobile-nav');
  const orderDialog = $('#order-dialog');
  const form = $('#order-form');
  let selectedDesign = '';
  let selectedColor = '';

  /* ---------- Contacto: enlaces del pie y canal del formulario ---------- */
  const whatsapp = String(CONTACTO.whatsapp || '').replace(/\D/g, '');
  const instagram = String(CONTACTO.instagram || '').trim().replace(/^@/, '');
  const email = String(CONTACTO.email || '').trim();
  const enlaces = {
    whatsapp: whatsapp ? 'https://wa.me/' + whatsapp : '',
    instagram: instagram ? 'https://instagram.com/' + encodeURIComponent(instagram) : '',
    email: email ? 'mailto:' + email : ''
  };
  $$('[data-contacto]').forEach(link => {
    const href = enlaces[link.dataset.contacto];
    if (!href) { link.remove(); return; }
    link.hidden = false;
    link.href = href;
    if (!href.startsWith('mailto:')) { link.target = '_blank'; link.rel = 'noopener'; }
  });
  const canal = whatsapp ? 'whatsapp' : email ? 'email' : 'copiar';
  const submitButton = $('#form-submit');
  if (submitButton) {
    submitButton.textContent = canal === 'whatsapp' ? 'Enviar por WhatsApp' : canal === 'email' ? 'Enviar por email' : 'Preparar mi pedido';
  }
  if (ANALITICA.google && /^G-[A-Z0-9]+$/i.test(ANALITICA.google.trim())) {
    const id = ANALITICA.google.trim();
    const s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id; document.head.appendChild(s);
    window.dataLayer = window.dataLayer || []; window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date()); window.gtag('config', id, { anonymize_ip: true });
  }
  /* ---------- Botón flotante de WhatsApp (sólo si hay número cargado arriba) ---------- */
  if (enlaces.whatsapp && !$('.wa-flotante')) {
    const flotante = document.createElement('a');
    flotante.className = 'wa-flotante';
    flotante.href = enlaces.whatsapp + '?text=' + encodeURIComponent('¡Hola! Quiero consultar por una invitación web.');
    flotante.target = '_blank'; flotante.rel = 'noopener';
    flotante.setAttribute('aria-label', 'Escribinos por WhatsApp');
    flotante.innerHTML = '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 12a8.5 8.5 0 0 1-12.4 7.5L3 21l1.5-5.1A8.5 8.5 0 1 1 20.5 12Z"/><path d="M9 8c-.7-.4-1.3.3-1.3 1.2 0 2.2 3.4 5.8 5.8 6.6.9.3 2-.2 2.4-1.1l-2.2-1.2-1 .9a8 8 0 0 1-3.1-3.1l.9-1Z"/></svg><span>Consultanos</span>';
    document.body.appendChild(flotante);
  }
  const faqMas = $('#faq-mas');
  if (faqMas && enlaces.whatsapp) { const a = $('a', faqMas); a.href = enlaces.whatsapp; a.target = '_blank'; a.rel = 'noopener'; faqMas.hidden = false; }

  /* ---------- Ventanas ---------- */
  function showDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') { if (!dialog.open) dialog.showModal(); }
    else dialog.setAttribute('open', '');
  }
  function closeDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }
  function closeMenu() {
    if (!mobileNav || !menuButton) return;
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
  }
  menuButton?.addEventListener('click', () => {
    const isOpen = !mobileNav.hidden;
    mobileNav.hidden = isOpen;
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
    if (!isOpen) $('a', mobileNav)?.focus();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && mobileNav && !mobileNav.hidden) { closeMenu(); menuButton?.focus(); } });
  document.addEventListener('click', event => { if (mobileNav && !mobileNav.hidden && !event.target.closest('.site-header')) closeMenu(); });
  $$('#mobile-nav a').forEach(link => link.addEventListener('click', closeMenu));

  /* ---------- Diseño elegido: "Quiero este" en la tarjeta, o ?diseno=… en la dirección ---------- */
  const designLine = $('#order-design');
  function elegirDiseno(nombre, color) {
    selectedDesign = String(nombre || '').trim().slice(0, 80);
    selectedColor = selectedDesign ? String(color || '').trim().slice(0, 40) : '';
    if (!designLine) return;
    designLine.hidden = !selectedDesign;
    $('strong', designLine).textContent = selectedDesign + (selectedColor ? ' · ' + selectedColor : '');
  }
  $$('.js-elegir').forEach(button => button.addEventListener('click', () => {
    elegirDiseno(button.dataset.design, button.dataset.color);
    showOrder(button);
  }));
  function showOrder(trigger) {
    closeMenu();
    showDialog(orderDialog);
    // El cursor va al primer dato que falta (si vienen de probar un diseño, los nombres ya están)
    setTimeout(() => { const vacio = ['pareja', 'whatsapp'].map(n => form?.elements?.[n]).find(f => f && !f.value.trim()); (vacio || $('input[name="pareja"]', orderDialog))?.focus(); }, 50);
  }

  /* ---------- Impresos a juego: abre el pedido con la casilla ya marcada ---------- */
  $$('.js-impresos').forEach(button => button.addEventListener('click', () => {
    if (form?.elements?.impresos) form.elements.impresos.checked = true;
    showOrder(button);
  }));

  /* ---------- Probalo con sus nombres: abre el diseño elegido con los dos nombres y la fecha ---------- */
  const probar = $('#probar-form');
  if (probar) {
    const hoy = new Date(); hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
    probar.elements.fecha.min = hoy.toISOString().slice(0, 10);
    const error = $('#probar-error');
    probar.addEventListener('submit', event => {
      event.preventDefault();
      const n1 = probar.elements.nombre1.value.trim(), n2 = probar.elements.nombre2.value.trim(), fecha = probar.elements.fecha.value;
      const falta = !n1 ? probar.elements.nombre1 : !n2 ? probar.elements.nombre2 : null;
      [probar.elements.nombre1, probar.elements.nombre2].forEach(f => { const mal = f === falta; f.classList.toggle('invalid', mal); f.setAttribute('aria-invalid', String(mal)); });
      if (falta) { error.textContent = 'Escribí los dos nombres para verla.'; error.hidden = false; falta.focus(); return; }
      if (fecha && probar.elements.fecha.validity.rangeUnderflow) { error.textContent = 'Esa fecha ya pasó: elegí otra o dejala vacía.'; error.hidden = false; probar.elements.fecha.focus(); return; }
      error.hidden = true;
      const diseno = /^[a-z]+$/.test(probar.elements.diseno.value) ? probar.elements.diseno.value : 'rosa';
      const q = new URLSearchParams({ nombre1: n1, nombre2: n2 });
      if (fecha) q.set('fecha', fecha);
      location.href = '/modelos/' + diseno + '/?' + q.toString();
    });
    probar.addEventListener('input', event => { if (event.target.classList?.contains('invalid') && event.target.value.trim()) { event.target.classList.remove('invalid'); event.target.setAttribute('aria-invalid', 'false'); } });
  }

  /* ---------- Colores de cada diseño en su tarjeta ---------- */
  $$('.design-card').forEach(card => {
    const grupo = $('.design-colores', card);
    if (!grupo) return;
    const img = $('.design-image img', card);
    const enlaces = $$('a.design-image, a.design-card-link', card);
    const base = enlaces.map(a => (a.getAttribute('href') || '').split('?')[0]);
    const elegir = $('.js-elegir', card);
    const nombre = $('.design-color-nombre', card);
    grupo.addEventListener('click', event => {
      const boton = event.target.closest('.design-color');
      if (!boton) return;
      $$('.design-color', grupo).forEach(b => b.setAttribute('aria-pressed', String(b === boton)));
      if (img && boton.dataset.img) img.src = boton.dataset.img;
      const paleta = boton.dataset.paleta || '';
      enlaces.forEach((a, i) => a.setAttribute('href', base[i] + (paleta ? '?paleta=' + encodeURIComponent(paleta) : '')));
      if (nombre) nombre.textContent = boton.dataset.nombre || '';
      if (elegir) elegir.dataset.color = paleta ? (boton.dataset.nombre || '') : '';
    });
  });
  $$('.js-start').forEach(button => button.addEventListener('click', event => {
    event.preventDefault();
    showOrder(button);
  }));
  $$('[data-close]').forEach(button => button.addEventListener('click', () => closeDialog(button.closest('dialog'))));
  // Se cierra solo al tocar FUERA del recuadro: un toque en el margen interior no la cierra.
  $$('dialog').forEach(dialog => dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    const dentro = event.clientX >= r.left && event.clientX <= r.right && event.clientY >= r.top && event.clientY <= r.bottom;
    if (!dentro) closeDialog(dialog);
  }));

  const anio = $('#year'); if (anio) anio.textContent = String(new Date().getFullYear());

  /* ---------- Las secciones aparecen suavemente al bajar ---------- */
  const reveal = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    reveal.forEach(el => io.observe(el));
  } else reveal.forEach(el => el.classList.add('visto'));

  /* ---------- Menú: marca la sección que se está leyendo ---------- */
  const navLinks = $$('.desktop-nav a');
  // 'Inicio' apunta a la cabecera (fija y chica): para marcarlo se observa la portada
  // Sólo los enlaces a secciones de ESTA página (#…); en las otras páginas el menú apunta a /#… y no se marca
  const sections = navLinks.filter(link => (link.getAttribute('href') || '').startsWith('#')).map(link => link.getAttribute('href') === '#inicio' ? $('.hero') : $(link.getAttribute('href'))).filter(Boolean);
  const idDe = s => s.classList.contains('hero') ? 'inicio' : s.id;
  if (sections.length && 'IntersectionObserver' in window) {
    const visible = new Map();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => visible.set(idDe(e.target), e.isIntersecting ? e.intersectionRatio : 0));
      let best = null;
      sections.forEach(s => { if ((visible.get(idDe(s)) || 0) > (best ? visible.get(idDe(best)) : 0)) best = s; });
      if (!best) return;
      navLinks.forEach(link => link.classList.toggle('current', link.getAttribute('href') === '#' + idDe(best)));
    }, { rootMargin: '-80px 0px -45% 0px', threshold: [0, 0.2, 0.5, 1] });
    sections.forEach(s => observer.observe(s));
  }

  /* ---------- Formulario ---------- */
  const fieldLabels = { pareja: 'los nombres de la pareja', whatsapp: 'tu WhatsApp', email: 'tu email' };
  // Un WhatsApp argentino sin el 0 ni el 15 tiene 10 dígitos; con el 549 adelante, 13. Se acepta ese rango.
  const whatsappValido = v => { const d = String(v || '').replace(/\D/g, ''); return d.length >= 10 && d.length <= 13; };
  const fechaField = form?.elements?.fecha;
  if (fechaField) { const hoy = new Date(); hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset()); fechaField.min = hoy.toISOString().slice(0, 10); }
  // Desde una muestra ("Quiero este"): ?diseno=…&pareja=…&fecha=…&color=… llegan ya cargados en el pedido
  const enLaDireccion = new URLSearchParams(location.search);
  if (enLaDireccion.get('diseno')) {
    elegirDiseno(enLaDireccion.get('diseno'), enLaDireccion.get('color'));
    const pareja = String(enLaDireccion.get('pareja') || '').trim().slice(0, 100);
    if (pareja && form?.elements?.pareja) form.elements.pareja.value = pareja;
    const fecha = String(enLaDireccion.get('fecha') || '');
    if (fechaField && /^\d{4}-\d{2}-\d{2}$/.test(fecha) && fecha >= fechaField.min) fechaField.value = fecha;
    setTimeout(() => showOrder(), 300);
  }
  function fechaLegible(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    return m ? m[3] + '/' + m[2] + '/' + m[1] : iso || '';
  }
  function validar() {
    const faltan = [];
    for (const name of ['pareja', 'whatsapp', 'email']) {
      const field = form.elements[name];
      // El email es opcional: sólo se revisa si lo escribieron
      const ok = name === 'email' ? (!field.value.trim() || field.checkValidity())
        : name === 'whatsapp' ? whatsappValido(field.value)
        : (field.value.trim() && field.checkValidity());
      field.classList.toggle('invalid', !ok);
      field.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok) faltan.push(field);
    }
    // La fecha es opcional, pero si la cargan no puede ser pasada
    const fechaPasada = fechaField && fechaField.value && fechaField.validity.rangeUnderflow;
    fechaField?.classList.toggle('invalid', !!fechaPasada);
    fechaField?.setAttribute('aria-invalid', fechaPasada ? 'true' : 'false');
    const errorBox = $('#form-error');
    const primero = faltan[0] || (fechaPasada ? fechaField : null);
    if (primero) {
      errorBox.textContent = faltan.length
        ? (primero.value.trim() && primero.name === 'email' ? 'Revisá tu email: parece incompleto.'
          : primero.value.trim() && primero.name === 'whatsapp' ? 'Revisá tu WhatsApp: tiene que tener el código de área y el número, sin el 0 ni el 15.'
          : 'Falta completar ' + faltan.map(f => fieldLabels[f.name]).join(' y ') + '.')
        : 'La fecha de la boda ya pasó: revisala.';
      errorBox.hidden = false;
      primero.setAttribute('aria-describedby', 'form-error');
      primero.focus();
      return false;
    }
    errorBox.hidden = true;
    return true;
  }
  form?.addEventListener('input', event => {
    const field = event.target;
    const otraVezBien = field.name === 'whatsapp' ? whatsappValido(field.value) : field.name === 'email' ? (!field.value.trim() || field.checkValidity()) : (field.checkValidity() && (field.value.trim() || field.name === 'fecha'));
    if (field.classList?.contains('invalid') && otraVezBien) {
      field.classList.remove('invalid');
      field.setAttribute('aria-invalid', 'false');
      field.removeAttribute('aria-describedby');
    }
    // Si cambian algo después de preparar el pedido, el resumen viejo deja de valer
    $('#order-result').hidden = true;
    $('#copy-feedback').textContent = '';
  });
  orderDialog?.addEventListener('close', () => { $('#order-result').hidden = true; });
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!validar()) return;
    const data = new FormData(form);
    // El precio sale de la pantalla de Precio: así está escrito en UN solo lugar
    const precio = (($('[data-precio]') || $('.price'))?.textContent || '').replace(/\s+/g, '');
    const summary = [
      /15 años/.test(selectedDesign) ? 'Hola, quiero pedir una invitación web para unos 15 años.' : 'Hola, quiero pedir mi invitación web para boda.',
      (/15 años/.test(selectedDesign) ? 'Nombre: ' : 'Pareja: ') + String(data.get('pareja')).trim(),
      'WhatsApp: ' + String(data.get('whatsapp')).trim(),
      ...(String(data.get('email') || '').trim() ? ['Email: ' + String(data.get('email')).trim()] : []),
      'Fecha: ' + (String(data.get('fecha') || '').trim() ? fechaLegible(String(data.get('fecha'))) : 'todavía no definida'),
      ...(precio ? ['Precio: ' + precio + ' (todo incluido)'] : []),
      ...(selectedDesign ? ['Diseño: ' + selectedDesign] : []),
      ...(selectedColor ? ['Colores: ' + selectedColor] : []),
      ...(form.elements.impresos?.checked ? ['También quiero los impresos a juego (cartel de bienvenida, menú y números de mesa).'] : []),
      ...(String(data.get('mensaje') || '').trim() ? ['Mensaje: ' + String(data.get('mensaje')).trim()] : [])
    ].join('\n');
    $('#order-summary').value = summary;
    $('#copy-feedback').textContent = '';
    const resultText = $('#order-result-text');
    if (canal === 'whatsapp') {
      window.open(enlaces.whatsapp + '?text=' + encodeURIComponent(summary), '_blank', 'noopener');
      resultText.innerHTML = '<strong>Te abrimos WhatsApp con tu pedido.</strong> Si no se abrió, copialo y mandánoslo al mismo número.';
    } else if (canal === 'email') {
      window.location.href = enlaces.email + '?subject=' + encodeURIComponent('Pedido de invitación web para boda') + '&body=' + encodeURIComponent(summary);
      resultText.innerHTML = '<strong>Te abrimos tu correo con el pedido listo.</strong> Si no se abrió, copialo y mandánoslo a ' + email + '.';
    } else {
      resultText.innerHTML = '<strong>Tu pedido está listo.</strong> Copialo y mandánoslo por el medio que prefieras.';
    }
    $('#order-result').hidden = false;
    resultText.focus({ preventScroll: true });
    $('#order-result').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
  $('#copy-summary')?.addEventListener('click', async () => {
    const input = $('#order-summary');
    try {
      await navigator.clipboard.writeText(input.value);
      $('#copy-feedback').textContent = '¡Copiado!';
    } catch {
      input.select();
      $('#copy-feedback').textContent = 'Seleccioná y copiá el texto.';
    }
  });
})();
