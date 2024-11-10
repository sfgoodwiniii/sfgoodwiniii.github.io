// Constants
DEFAULT_THEME = "dark";
THEME_TOGGLE_HTML = document.getElementById("sdev-header__theme-icon");
PAGE_BODY_HTML = document.getElementsByTagName("body")[0];
loadThemeStartup();

// Page Startup
function loadThemeStartup() {
	const theme = fetchLocalStorage("theme", DEFAULT_THEME);
	if (theme === "dark") { loadDarkMode();  }
	else                  { loadLightMode(); }
}

// Switch Theme
function switchTheme() {

	// Fetch the theme from the local storage
	const current_theme = fetchLocalStorage("theme");

	// Change the theme
	if (current_theme === "dark") {
		localStorage.setItem("theme", "light");  // Swap the theme in the local storage
		loadLightMode();                         // Load the light mode
		PAGE_BODY_HTML.style.transition = "var(--theme-transition, 0.25s)";
	}
	else if (current_theme === "light") {
		localStorage.setItem("theme", "dark");  // Swap the theme in the local storage
		loadDarkMode();                         // Load the dark mode
		PAGE_BODY_HTML.style.transition = "var(--theme-transition, 0.25s)";
	}
	else {
		console.error("Invalid Theme: " + current_theme);
	}
}

// Load Themes
function loadDarkMode() {
	console.debug("Selected Theme: Dark");
	THEME_TOGGLE_HTML.src = "/.resources/images/moon.png";
	THEME_TOGGLE_HTML.style.filter = "invert(100%)";
	delLightMode();
	setDarkMode();
}
function loadLightMode() {
	console.debug("Selected Theme: Light");
	THEME_TOGGLE_HTML.src = "/.resources/images/sun.png";
	THEME_TOGGLE_HTML.style.filter = "invert(0%)";
	delDarkMode();
	setLightMode();
}

// Set / Remove Themes
function setDarkMode() {
	const head = document.head;
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = "/.resources/styles/theme_dark.css";
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
	link.href = "/.resources/styles/theme_light.css";
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
