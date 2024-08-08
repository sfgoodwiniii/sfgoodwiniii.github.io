function header() {
	const audio = new Audio(".resources/audio/header.mp3");
	const L = 0.25; const R = 1.25;
	audio.playbackRate = Math.random() * (R - L) + L;
	audio.play().then(r => {}).catch(e => {});
}