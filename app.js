// Inicialización del dataLayer para GA4 / GTM
window.dataLayer = window.dataLayer || [];

document.addEventListener('DOMContentLoaded', () => {
  initUTMTracking();
  initCategoryFilters();
  initCardSelectionTriggers();
  initCardDetailsToggle();
  initFAQAccordion();
  initFormHandling();
  initAnalyticsTracking();
});

// Despliega o contrae las características detalladas de cada tarjeta
function initCardDetailsToggle() {
  const moreButtons = document.querySelectorAll('.btn-text-more');

  moreButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const detailsPanel = document.getElementById(targetId);
      if (!detailsPanel) return;

      const isHidden = detailsPanel.hasAttribute('hidden');

      if (isHidden) {
        detailsPanel.removeAttribute('hidden');
        button.textContent = 'Ver menos (-)';
        button.setAttribute('aria-expanded', 'true');
      } else {
        detailsPanel.setAttribute('hidden', '');
        button.textContent = 'Ver más (+)';
        button.setAttribute('aria-expanded', 'false');
      }

      const cardTitle = button.closest('.product-card')?.querySelector('.card-title')?.textContent.trim() || 'tarjeta';
      window.dataLayer.push({
        event: 'card_details_toggle',
        card_name: cardTitle,
        action: isHidden ? 'expand' : 'collapse'
      });
    });
  });
}

// Captura parámetros UTM de la URL para conservarlos en el envío del formulario
function initUTMTracking() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  utmKeys.forEach(key => {
    const paramValue = urlParams.get(key);
    if (paramValue) {
      sessionStorage.setItem(key, paramValue);
    }

    const storedValue = sessionStorage.getItem(key) || 'organico_directo';
    const inputElement = document.getElementById(key);
    if (inputElement) {
      inputElement.value = storedValue;
    }
  });

  const timestampInput = document.getElementById('form_timestamp');
  if (timestampInput) {
    timestampInput.value = new Date().toISOString();
  }
}

// Desplazamiento al formulario desde botónes principales
function initCardSelectionTriggers() {
  const cardTriggers = document.querySelectorAll('.select-card-trigger, #hero-cta-main, #hero-cta-secondary');
  const cardSelect = document.getElementById('lead_card');

  cardTriggers.forEach(button => {
    button.addEventListener('click', () => {
      const selectedCardName = button.getAttribute('data-card-name') || button.getAttribute('data-card');

      if (selectedCardName && cardSelect) {
        for (let i = 0; i < cardSelect.options.length; i++) {
          if (cardSelect.options[i].text.includes(selectedCardName) || cardSelect.options[i].value.includes(selectedCardName)) {
            cardSelect.selectedIndex = i;
            break;
          }
        }
      }

      window.dataLayer.push({
        event: 'card_selected_click',
        card_name: selectedCardName,
        cta_location: button.id || 'product_grid'
      });
    });
  });
}

// Filtro rápido de tarjetas por categoría
function initCategoryFilters() {
  const filterButtons = document.querySelectorAll('.category-pill');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      productCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || cardCategories.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      window.dataLayer.push({
        event: 'filter_category_click',
        filter_applied: filterValue
      });
    });
  });
}

// Acordeón de preguntas frecuentes
function initFAQAccordion() {
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const contentId = trigger.getAttribute('aria-controls');
      const contentPanel = document.getElementById(contentId);
      const parentItem = trigger.closest('.faq-item');

      trigger.setAttribute('aria-expanded', !isExpanded);
      if (contentPanel) {
        contentPanel.hidden = isExpanded;
      }
      if (parentItem) {
        parentItem.classList.toggle('active', !isExpanded);
      }

      if (!isExpanded) {
        window.dataLayer.push({
          event: 'faq_opened',
          faq_question: trigger.querySelector('span').innerText.trim()
        });
      }
    });
  });
}

// Validaciones y simulación de envío del formulario
function initFormHandling() {
  const form = document.getElementById('lead-form');
  const successCard = document.getElementById('form-success-card');
  const resetBtn = document.getElementById('btn-success-reset');
  const submitBtn = document.getElementById('btn-submit-lead');

  let formStarted = false;

  form.addEventListener('focusin', () => {
    if (!formStarted) {
      formStarted = true;
      window.dataLayer.push({
        event: 'form_start',
        form_name: 'solicitud_tarjeta_digital'
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = validateForm(form);

    if (!isValid) {
      window.dataLayer.push({
        event: 'form_error',
        form_name: 'solicitud_tarjeta_digital'
      });
      return;
    }

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const formData = {
      card: document.getElementById('lead_card').value,
      fullname: document.getElementById('lead_fullname').value.trim(),
      phone: document.getElementById('lead_phone').value.trim(),
      dpi: document.getElementById('lead_dpi').value.trim(),
      email: document.getElementById('lead_email').value.trim(),
      income: document.getElementById('lead_income').value,
      utm_source: document.getElementById('utm_source').value,
      utm_medium: document.getElementById('utm_medium').value,
      utm_campaign: document.getElementById('utm_campaign').value
    };

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      document.getElementById('success-user-name').innerText = formData.fullname.split(' ')[0] || 'cliente';
      document.getElementById('success-card-name').innerText = formData.card;

      form.classList.add('hidden');
      successCard.classList.remove('hidden');

      // Macroconversión principal
      window.dataLayer.push({
        event: 'generate_lead',
        event_category: 'Conversión Ventas Digitales',
        event_label: formData.card,
        lead_data: {
          product_selected: formData.card,
          income_tier: formData.income,
          utm_source: formData.utm_source,
          utm_medium: formData.utm_medium,
          utm_campaign: formData.utm_campaign
        }
      });
    }, 1200);
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.classList.remove('hidden');
      successCard.classList.add('hidden');
      formStarted = false;
      initUTMTracking();
    });
  }
}

// Validaciones de formato del form
function validateForm(form) {
  let valid = true;

  const nameInput = document.getElementById('lead_fullname');
  const nameError = document.getElementById('error_fullname');
  if (!nameInput.value.trim() || nameInput.value.trim().length < 5) {
    showError(nameInput, nameError);
    valid = false;
  } else {
    clearError(nameInput, nameError);
  }

  const phoneInput = document.getElementById('lead_phone');
  const phoneError = document.getElementById('error_phone');
  const phoneRegex = /^[2-7]\d{7}$/;
  if (!phoneRegex.test(phoneInput.value.trim())) {
    showError(phoneInput, phoneError);
    valid = false;
  } else {
    clearError(phoneInput, phoneError);
  }

  const dpiInput = document.getElementById('lead_dpi');
  const dpiError = document.getElementById('error_dpi');
  const dpiRegex = /^\d{13}$/;
  if (!dpiRegex.test(dpiInput.value.trim())) {
    showError(dpiInput, dpiError);
    valid = false;
  } else {
    clearError(dpiInput, dpiError);
  }

  const emailInput = document.getElementById('lead_email');
  const emailError = document.getElementById('error_email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    showError(emailInput, emailError);
    valid = false;
  } else {
    clearError(emailInput, emailError);
  }

  const incomeInput = document.getElementById('lead_income');
  const incomeError = document.getElementById('error_income');
  if (!incomeInput.value) {
    showError(incomeInput, incomeError);
    valid = false;
  } else {
    clearError(incomeInput, incomeError);
  }

  const termsInput = document.getElementById('lead_terms');
  const termsError = document.getElementById('error_terms');
  if (!termsInput.checked) {
    termsError.classList.add('visible');
    valid = false;
  } else {
    termsError.classList.remove('visible');
  }

  return valid;
}

function showError(input, errorElement) {
  input.classList.add('input-error');
  if (errorElement) errorElement.classList.add('visible');
}

function clearError(input, errorElement) {
  input.classList.remove('input-error');
  if (errorElement) errorElement.classList.remove('visible');
}

// Clics secundarios a WhatsApp y CTA de cabecera
function initAnalyticsTracking() {
  const whatsappBtn = document.getElementById('btn-whatsapp-float');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      window.dataLayer.push({
        event: 'whatsapp_click',
        channel: 'soporte_ventas_digitales'
      });
    });
  }
}
