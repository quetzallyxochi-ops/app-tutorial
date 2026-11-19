document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY_LAST_PAGE = 'tutorial_ultima_pagina';
  const STORAGE_KEY_VISITED = 'tutorial_temas_visitados';

  // Nombre del archivo HTML actual (ej. "gestion-sensores.html" o "index.html")
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const params = new URLSearchParams(window.location.search);

  // 1. Restaurar automáticamente el último tema si entras a index.html (salvo que uses ?home=1)
  if (currentPage === 'index.html' && params.get('home') !== '1') {
    try {
      const lastPage = localStorage.getItem(STORAGE_KEY_LAST_PAGE);
      if (lastPage && lastPage !== 'index.html') {
        window.location.replace(lastPage);
        return;
      }
    } catch (err) {
      console.warn('No se pudo leer el último tema guardado:', err);
    }
  }

  // 2. Guardar automáticamente la página actual y el historial de temas visitados
  try {
    localStorage.setItem(STORAGE_KEY_LAST_PAGE, currentPage);
    const visited = JSON.parse(localStorage.getItem(STORAGE_KEY_VISITED) || '[]');
    if (!visited.includes(currentPage)) {
      visited.push(currentPage);
      localStorage.setItem(STORAGE_KEY_VISITED, JSON.stringify(visited));
    }
  } catch (err) {
    console.warn('No se pudo guardar la persistencia local:', err);
  }

  // 3. Resaltar enlace activo en el menú lateral según el archivo actual
  const navLinks = document.querySelectorAll('aside.sidebar a');
  navLinks.forEach(link => {
    const linkHref = (link.getAttribute('href') || '').replace(/^\.\//, '');
    if (linkHref === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 4. Control de menú desplegable móvil
  const headerRight = document.querySelector('header');
  if (headerRight) {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'menu-toggle';
    toggleBtn.innerHTML = '☰';
    const headerLeft = headerRight.querySelector('.header-left');
    if (headerLeft) {
      headerLeft.before(toggleBtn);
    } else {
      headerRight.prepend(toggleBtn);
    }

    const sidebar = document.querySelector('aside.sidebar');
    if (sidebar) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('open');
      });

      // Cerrar sidebar al hacer click fuera en móvil
      document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target) && sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
        }
      });
    }
  }

  // 5. Registrar Service Worker (opcional) para cachear archivos locales sin conexión
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('Service Worker activo para modo offline.'))
      .catch(() => {});
  }

  console.log('Tutorial App inicializada correctamente. Desarrollado con éxito.');
});orial App inicializada correctamente. Desarrollado con éxito.");
});
