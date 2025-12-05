const checkbox = document.getElementById('toggleDarkMode');
const page = document.body;

function applyTheme(theme) {
  page.classList.remove('dark-mode', 'light-mode');
  page.classList.add(theme);
  localStorage.setItem('theme', theme);
}

const savedMode = localStorage.getItem('theme');
if (savedMode) {
  applyTheme(savedMode);
  if (checkbox) checkbox.checked = savedMode === 'light-mode';
} else {
  applyTheme('dark-mode');
}

if (checkbox) {
  checkbox.addEventListener('change', () => {
    applyTheme(checkbox.checked ? 'light-mode' : 'dark-mode');
  });
}