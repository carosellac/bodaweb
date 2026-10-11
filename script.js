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

(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const menuButton = $('.mobile-menu-toggle');
  const mobileNav = $('#mobile-nav');
  const previewDialog = $('#preview-dialog');
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
    submitButton.textContent = canal === 'whatsapp' ? 'Enviar por WhatsApp' : canal === 'email' ? 'Enviar por email' : 'Preparar mi solicitud';
  }

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
  });
  $$('#mobile-nav a').forEach(link => link.addEventListener('click', closeMenu));

  $$('.js-preview').forEach(card => card.addEventListener('click', () => {
    selectedDesign = card.dataset.design || '';
    $('#preview-title').textContent = selectedDesign;
    const image = $('#preview-image');
    image.src = card.dataset.image || '';
    image.alt = 'Vista previa ampliada del diseño ' + selectedDesign;
    showDialog(previewDialog);
  }));
  function showOrder(trigger) {
    if (previewDialog?.open) closeDialog(previewDialog);
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
  const fieldLabels = { pareja: 'los nombres de la pareja', email: 'tu email', fecha: 'la fecha del casamiento' };
  function fechaLegible(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    return m ? m[3] + '/' + m[2] + '/' + m[1] : iso || '';
  }
  function validar() {
    const faltan = [];
    for (const name of ['pareja', 'email', 'fecha']) {
      const field = form.elements[name];
      const ok = field.value.trim() && field.checkValidity();
      field.classList.toggle('invalid', !ok);
      if (!ok) faltan.push(field);
    }
    const errorBox = $('#form-error');
    if (faltan.length) {
      const primero = faltan[0];
      errorBox.textContent = primero.value.trim() && primero.name === 'email'
        ? 'Revisa tu email: parece incompleto.'
        : 'Falta completar ' + faltan.map(f => fieldLabels[f.name]).join(', ') + '.';
      errorBox.hidden = false;
      primero.focus();
      return false;
    }
    errorBox.hidden = true;
    return true;
  }
  form?.addEventListener('input', event => {
    if (event.target.classList?.contains('invalid') && event.target.checkValidity() && event.target.value.trim()) {
      event.target.classList.remove('invalid');
    }
  });
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!validar()) return;
    const data = new FormData(form);
    const summary = [
      'Hola, quiero pedir mi invitación web para boda.',
      'Pareja: ' + String(data.get('pareja')).trim(),
      'Email: ' + String(data.get('email')).trim(),
      'Fecha: ' + fechaLegible(String(data.get('fecha'))),
      'Precio: $ 55.000 (todo incluido)',
      ...(selectedDesign ? ['Diseño: ' + selectedDesign] : [])
    ].join('\n');
    $('#order-summary').value = summary;
    $('#copy-feedback').textContent = '';
    const resultText = $('#order-result-text');
    if (canal === 'whatsapp') {
      window.open(enlaces.whatsapp + '?text=' + encodeURIComponent(summary), '_blank', 'noopener');
      resultText.innerHTML = '<strong>Te abrimos WhatsApp con tu solicitud.</strong> Si no se abrió, cópiala y envíanosla al mismo número.';
    } else if (canal === 'email') {
      window.location.href = enlaces.email + '?subject=' + encodeURIComponent('Solicitud de invitación web para boda') + '&body=' + encodeURIComponent(summary);
      resultText.innerHTML = '<strong>Te abrimos tu correo con la solicitud lista.</strong> Si no se abrió, cópiala y envíanosla a ' + email + '.';
    } else {
      resultText.innerHTML = '<strong>Tu solicitud está lista.</strong> Cópiala y envíanosla por el medio que prefieras.';
    }
    $('#order-result').hidden = false;
    $('#order-result').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
  $('#copy-summary')?.addEventListener('click', async () => {
    const input = $('#order-summary');
    try {
      await navigator.clipboard.writeText(input.value);
      $('#copy-feedback').textContent = '¡Copiado!';
    } catch {
      input.select();
      $('#copy-feedback').textContent = 'Selecciona y copia el texto.';
    }
  });
})();
