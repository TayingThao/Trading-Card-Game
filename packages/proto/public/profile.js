const checkbox = document.getElementById('toggleDarkMode');
const page = document.body;

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        page.classList.remove('dark-mode');
        page.classList.add('light-mode');
    } else {
        page.classList.remove('light-mode');
        page.classList.add('dark-mode');
    }
});