document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  let popupTimer = null;
  let popupSoundPlayed = false;
  const popup = document.createElement('div');
  popup.className = 'inactivity-popup hidden';
  popup.innerHTML = `
    <img src="Mewo.png" alt="Mewo" />
    <div class="inactivity-popup__content">
      <strong>waiting for something to happen?</strong>
    </div>
    <button class="inactivity-popup__close" type="button" aria-label="Close popup">×</button>
  `;
  document.body.appendChild(popup);

  const showPopup = () => {
    popup.classList.remove('hidden');
    if (!popupSoundPlayed) {
      const popupSound = new Audio('whitespace.mp3');
      popupSound.play().catch(() => {});
      popupSoundPlayed = true;
    }
  };

  const hidePopup = () => {
    popup.classList.add('hidden');
  };

  const resetTimer = () => {
    hidePopup();
    if (popupTimer) clearTimeout(popupTimer);
    popupTimer = setTimeout(showPopup, 15 * 60 * 1000);
  };

  ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(eventName => {
    document.addEventListener(eventName, resetTimer, { passive: true });
  });

  popup.querySelector('.inactivity-popup__close').addEventListener('click', hidePopup);
  resetTimer();

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
