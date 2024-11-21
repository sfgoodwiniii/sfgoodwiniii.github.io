function sdev_header__favicon() {
	const audio = new Audio("/.templates/header/audio/favicon.mp3");
	const L = 0.25; const R = 1.25;
	audio.playbackRate = Math.random() * (R - L) + L;
	audio.play().then(r => {}).catch(e => {});
	console.debug("Favicon audio played.");
}