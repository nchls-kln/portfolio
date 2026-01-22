const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

if (localStorage.getItem('darkMode') === 'true') {
  body.classList.add('dark');
  themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', () => {
  body.classList.toggle('dark');
  localStorage.setItem('darkMode', body.classList.contains('dark'));
});
