function toggleDarkMode() {
  const darkMode = document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark-mode', darkMode);
}

