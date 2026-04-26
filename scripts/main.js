(function () {
  const dropdown = document.querySelector('[data-dropdown]');
  const toggle = document.querySelector('[data-menu-toggle]');

  if (toggle && dropdown) {
    toggle.addEventListener('click', function () {
      dropdown.classList.toggle('open');
      toggle.setAttribute('aria-expanded', dropdown.classList.contains('open') ? 'true' : 'false');
    });

    document.addEventListener('click', function (event) {
      if (!event.target.closest('.nav-wrap')) {
        dropdown.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const path = window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '');
  document.querySelectorAll('[data-nav]').forEach((link) => {
    const href = link.getAttribute('href');
    const absolute = new URL(href, window.location.href);
    const targetPath = absolute.pathname.replace(/index\.html$/, '').replace(/\/$/, '');
    if (path === targetPath) link.classList.add('active');
  });

  const newsletter = document.querySelector('[data-newsletter]');
  if (newsletter) {
    const emailInput = newsletter.querySelector('input[type="email"]');
    const status = newsletter.querySelector('.form-status');

    const existing = localStorage.getItem('saintfcloud_newsletter_email');
    if (existing && status) {
      status.textContent = `SUBSCRIBED: ${existing}`;
      status.className = 'form-status success';
    }

    newsletter.addEventListener('submit', function (event) {
      event.preventDefault();
      const email = emailInput.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!valid) {
        status.textContent = 'ENTER A VALID EMAIL ADDRESS';
        status.className = 'form-status error';
        return;
      }
      localStorage.setItem('saintfcloud_newsletter_email', email);
      status.textContent = 'SUBSCRIPTION COMPLETE';
      status.className = 'form-status success';
      newsletter.reset();
    });
  }

  const popup = document.querySelector('[data-popup]');
  const closeBtn = document.querySelector('[data-popup-close]');
  if (popup && closeBtn) {
    const seen = localStorage.getItem('saintfcloud_welcome_seen');
    if (!seen) popup.classList.add('open');

    closeBtn.addEventListener('click', function () {
      popup.classList.remove('open');
      localStorage.setItem('saintfcloud_welcome_seen', 'yes');
    });
  }
})();
