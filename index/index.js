function loadHeader() {
	loadDefaultLanguage();
	loadDefaultTheme();
	setTimeout(() => {
		document.documentElement.style.setProperty("--transition", "cubic-bezier(0.4, 0, 0.2, 1) 0.25s");
	}, 100);
}
function loadDefaultLanguage() {

	// If it's the first time, set it to English
	if (localStorage.getItem("lang") == null) {
		localStorage.setItem("lang", "EN");
	}

	// Fetch the language from the local storage
	const lang = localStorage.getItem("lang");

	// Set the dropdown to the selected language
	document.getElementById("language").value = lang;

	// Load the language in the page (skips if it's English)
	loadLanguage(lang);
}
function loadDefaultTheme() {

	// If it's the first time, set it to light
	if (localStorage.getItem("theme") == null) {
		localStorage.setItem("theme", "light");
	}

	// Fetch the theme from the local storage
	const theme = localStorage.getItem("theme");

	// Load the theme in the page
	if (theme === "dark") { loadDarkMode(); }
	else                  { loadLightMode(); }
}

function changeLanguage() {

	// Fetch the language from the dropdown
	const lang = document.getElementById("language").value;

	// Save it to the local storage
	localStorage.setItem("lang", lang);

	// Load the language in the page
	loadLanguage(lang);
}
function loadLanguage(lang) {
	fetch("index/lang/" + lang + ".json")
		.then(response => response.json())
		.then(data => {
			// Set the language in the page
			document.getElementById("home").innerText = data["header.middle.home"];
			document.getElementById("professional").innerText = data["header.middle.professional"];
			document.getElementById("personal").innerText = data["header.middle.personal"];
			document.getElementById("portfolio").innerText = data["header.middle.portfolio"];
			document.getElementById("contact").innerText = data["header.middle.contact"];
			document.getElementById("theme").alt = data["header.right.theme"];
		})
		.catch(error => {
			console.error("Error: " + error);
		});
	console.info("Set Language: " + lang);
}

function changeTheme() {

	// Fetch the theme from the local storage
	const theme = localStorage.getItem("theme");

	// Change the theme
	if (theme === "dark") {

		// Swap the theme in the local storage
		localStorage.setItem("theme", "light");

		// Load the light mode
		loadLightMode();
	}
	else {

		// Swap the theme in the local storage
		localStorage.setItem("theme", "dark");

		// Load the dark mode
		loadDarkMode();
	}
}
function loadDarkMode() {
	console.info("Set Theme: Dark mode");
	document.getElementById("theme").src = "index/assets/moon.png";
	delLightMode();
	setDarkMode();
}
function loadLightMode() {
	console.info("Set Theme: Light mode");
	document.getElementById("theme").src = "index/assets/sun.png";
	delDarkMode();
	setLightMode();
}
function setDarkMode() {
	const head = document.head;
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = "index/theme_dark.css";
	head.appendChild(link);
}
function delDarkMode() {
	const head = document.head;
	const links = head.getElementsByTagName("link");
	for (let i = 0; i < links.length; i++) {
		if (links[i].href.includes("theme_dark.css")) {
			head.removeChild(links[i]);
		}
	}
}
function setLightMode() {
	const head = document.head;
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = "index/theme_light.css";
	head.appendChild(link);
}
function delLightMode() {
	const head = document.head;
	const links = head.getElementsByTagName("link");
	for (let i = 0; i < links.length; i++) {
		if (links[i].href.includes("theme_light.css")) {
			head.removeChild(links[i]);
		}
	}
}

function easterEgg() {
	const audio = new Audio('index/assets/favicon.mp3');
	const L = 0.25; const R = 1.25;
	audio.playbackRate = Math.random() * (R - L) + L;
	audio.play().then(r => {}).catch(e => {});
}
