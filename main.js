document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.querySelector('.theme-toggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    if (toggle) toggle.querySelector('.theme-toggle__label').textContent = '☾';
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const isLight = body.classList.contains('light-mode');
      toggle.querySelector('.theme-toggle__label').textContent = isLight ? '☾' : '☀︎';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  const passcodeForm = document.getElementById('passcode-form');
  const passcodeInput = document.getElementById('passcode-input');
  const passcodeMessage = document.getElementById('passcode-message');
  const privateContent = document.getElementById('private-content');
  const passcodePrompt = document.getElementById('passcode-prompt');

  if (passcodeForm && passcodeInput && passcodeMessage && privateContent && passcodePrompt) {
    passcodeForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const entered = passcodeInput.value.trim();
      const correctPasscode = 'UCSD';

      if (entered.toLowerCase() === correctPasscode.toLowerCase()) {
        passcodePrompt.classList.add('hidden');
        passcodeForm.classList.add('hidden');
        passcodeMessage.textContent = 'Access granted.';
        privateContent.classList.remove('hidden');
      } else {
        passcodeMessage.textContent = 'Incorrect passcode. Try again.';
        privateContent.classList.add('hidden');
      }
    });
  }

  document.querySelectorAll('nav ul.nav a, nav a.brand').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const id = href.slice(1);
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', href);
        }
      }
    });
  });
});
