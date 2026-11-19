document.addEventListener('DOMContentLoaded', () => {
  // 1. Resaltar enlace activo en el menú lateral según el archivo actual
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('aside.sidebar a');

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
      link.classList.add('active');
    }
  });

  // 2. Control de menú desplegable móvil
  const headerRight = document.querySelector('header');
  if (headerRight) {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'menu-toggle';
    toggleBtn.innerHTML = '☰';
    headerRight.querySelector('.header-left').before(toggleBtn);

    const sidebar = document.querySelector('aside.sidebar');
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // Cerrar sidebar al hacer click fuera en móvil
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target) && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    });
  }

  // 3. Mejora interactiva para tarjetas de recursos rápidos
  console.log("Tutorial App inicializada correctamente. Desarrollado con éxito.");
});