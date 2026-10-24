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
  function elegirDiseno(nombre) {
    selectedDesign = String(nombre || '').trim();
    if (!designLine) return;
    designLine.hidden = !selectedDesign;
    $('strong', designLine).textContent = selectedDesign;
  }
  $$('.js-elegir').forEach(button => button.addEventListener('click', () => {
    elegirDiseno(button.dataset.design);
    showOrder(button);
  }));
  function showOrder(trigger) {
    closeMenu();
    showDialog(orderDialog);
    setTimeout(() => $('input[name="pareja"]', orderDialog)?.focus(), 50);
  }
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

  $('#year').textContent = String(new Date().getFullYear());
  const disenoEnLaDireccion = new URLSearchParams(location.search).get('diseno');
  if (disenoEnLaDireccion) { elegirDiseno(disenoEnLaDireccion); setTimeout(() => showOrder(), 300); }

  /* ---------- Las secciones aparecen suavemente al bajar ---------- */
  const reveal = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    reveal.forEach(el => io.observe(el));
  } else reveal.forEach(el => el.classList.add('visto'));

  /* ---------- Menú: marca la sección que se está leyendo ---------- */
  const navLinks = $$('.desktop-nav a');
  // 'Inicio' apunta a la cabecera (fija y chica): para marcarlo se observa la portada
  const sections = navLinks.map(link => link.getAttribute('href') === '#inicio' ? $('.hero') : $(link.getAttribute('href'))).filter(Boolean);
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
    const precio = ($('.price')?.textContent || '').replace(/\s+/g, '');
    const summary = [
      'Hola, quiero pedir mi invitación web para boda.',
      'Pareja: ' + String(data.get('pareja')).trim(),
      'WhatsApp: ' + String(data.get('whatsapp')).trim(),
      ...(String(data.get('email') || '').trim() ? ['Email: ' + String(data.get('email')).trim()] : []),
      'Fecha: ' + (String(data.get('fecha') || '').trim() ? fechaLegible(String(data.get('fecha'))) : 'todavía no definida'),
      ...(precio ? ['Precio: ' + precio + ' (todo incluido)'] : []),
      ...(selectedDesign ? ['Diseño: ' + selectedDesign] : []),
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
