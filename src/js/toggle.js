  (function () {
    const toggleBtn = document.getElementById('nav-toggle-btn');
    const burgerIcon = document.getElementById('burger-icon');
    const xIcon = document.getElementById('x-icon');
    const mobileNav = document.getElementById('nav-links-mobile');

    toggleBtn.addEventListener('click', function () {
      const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
      const nextOpen = !isOpen;

      burgerIcon.classList.toggle('hidden', nextOpen);
      xIcon.classList.toggle('hidden', !nextOpen);
      mobileNav.classList.toggle('hidden', !nextOpen);

      toggleBtn.setAttribute('aria-expanded', String(nextOpen));
    });
  })();