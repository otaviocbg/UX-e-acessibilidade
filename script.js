const themeToggle = document.getElementById('theme-toggle');
const status = document.getElementById('status');

function updateButton(isHighContrast) {
  if (!themeToggle) {
    return;
  }

  themeToggle.textContent = isHighContrast ? 'Desativar alto contraste' : 'Ativar alto contraste';
  themeToggle.setAttribute('aria-pressed', String(isHighContrast));
}

function applyTheme(isHighContrast) {
  document.body.classList.toggle('high-contrast', isHighContrast);
  updateButton(isHighContrast);
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersHighContrast = window.matchMedia('(prefers-contrast: more)').matches;
  const shouldUseHighContrast = savedTheme === 'high-contrast' || (!savedTheme && prefersHighContrast);

  applyTheme(shouldUseHighContrast);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isHighContrast = document.body.classList.toggle('high-contrast');
    localStorage.setItem('theme', isHighContrast ? 'high-contrast' : 'default');
    updateButton(isHighContrast);

    if (status) {
      status.textContent = isHighContrast ? 'Modo de alto contraste ativado.' : 'Modo de alto contraste desativado.';
    }
  });
}

initializeTheme();