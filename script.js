(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const menuButton = $('.mobile-menu-toggle');
  const mobileNav = $('#mobile-nav');
  const previewDialog = $('#preview-dialog');
  const orderDialog = $('#order-dialog');
  const contactDialog = $('#contact-dialog');
  const planField = $('#plan-select');
  const form = $('#order-form');
  let selectedDesign = '';

  function showDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open','');
  }
  function closeDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }
  menuButton?.addEventListener('click', () => {
    const isOpen = !mobileNav.hidden;
    mobileNav.hidden = isOpen;
    menuButton.setAttribute('aria-expanded', String(!isOpen));
  });
  $$('#mobile-nav a').forEach(link => link.addEventListener('click', () => {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
  }));
  $$('.js-preview').forEach(card => card.addEventListener('click', () => {
    selectedDesign = card.dataset.design || '';
    $('#preview-title').textContent = selectedDesign;
    $('#preview-image').src = card.dataset.image || '';
    showDialog(previewDialog);
  }));
  function showOrder(trigger) {
    const plan = trigger?.dataset.plan;
    if (plan) planField.value = plan;
    if (previewDialog.open) closeDialog(previewDialog);
    showDialog(orderDialog);
  }
  $$('.js-start').forEach(button => button.addEventListener('click', () => showOrder(button)));
  $('#preview-choose')?.addEventListener('click', event => showOrder(event.currentTarget));
  $$('[data-close]').forEach(button => button.addEventListener('click', () => closeDialog(button.closest('dialog'))));
  $$('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog(dialog); }));
  $('#year').textContent = String(new Date().getFullYear());
  $$('a[href="#contacto"]').forEach(link => link.addEventListener('click', event => { event.preventDefault(); showDialog(contactDialog); }));
  $('#all-designs')?.addEventListener('click', event => {
    event.preventDefault();
    const cards = $$('.design-card');
    cards.forEach(card => card.classList.add('focus-highlight'));
    cards[0]?.focus();
  });
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const date = data.get('fecha') || '';
    const summary = [
      'Solicitud de invitación web para boda',
      'Pareja: ' + data.get('pareja'),
      'Email: ' + data.get('email'),
      'Fecha: ' + date,
      'Plan: ' + data.get('plan'),
      ...(selectedDesign ? ['Diseño: ' + selectedDesign] : [])
    ].join('\n');
    $('#order-summary').value = summary;
    $('#order-result').hidden = false;
    $('#copy-feedback').textContent = '';
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
