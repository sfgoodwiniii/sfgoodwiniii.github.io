function loadHeader() {
    loadDefaultLanguage();
    loadDefaultTheme();
    setTimeout(() => {
        document.documentElement.style.setProperty("--transition", "cubic-bezier(0.4, 0, 0.2, 1) 0.25s");
    }, 100);
}

function easterEgg() {
    const audio = new Audio('_header/assets/favicon.mp3');
    const L = 0.25; const R = 1.25;
    audio.playbackRate = Math.random() * (R - L) + L;
    audio.play().then(r => {}).catch(e => {});
}