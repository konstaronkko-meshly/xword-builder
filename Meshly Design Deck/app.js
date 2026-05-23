/* ============================================================
   pages.js — router. Page builders live in pages-*.js modules
   that register themselves onto window.MPages.
   ============================================================ */
(function () {
  const host = document.getElementById('page-host');
  const pages = window.MPages || {};

  const links = document.querySelectorAll('.sidebar__link');

  function render(name) {
    if (!pages[name]) name = 'overview';
    host.innerHTML = pages[name]();

    links.forEach(l => l.classList.toggle('is-active', l.dataset.page === name));

    host.querySelectorAll('[data-go]').forEach(el => {
      el.addEventListener('click', () => navigate(el.dataset.go));
    });

    window.scrollTo(0, 0);
  }

  function navigate(name) {
    location.hash = name;
  }

  links.forEach(l => {
    l.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(l.dataset.page);
    });
  });

  window.addEventListener('hashchange', () => {
    render(location.hash.replace('#', '') || 'overview');
  });

  render(location.hash.replace('#', '') || 'overview');
})();
