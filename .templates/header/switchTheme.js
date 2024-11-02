// Constants
PARENT = "sdev-header__theme";
DEFAULT_THEME = "dark";
THEME_ICON_HTML = document.getElementById("sdev-header__theme-icon");
loadThemeStartup();

// Page Startup
function loadThemeStartup() {

	// Fetch the theme from the local storage
	const theme = fetchLocalStorage("theme", "light");

	// Load the theme in the page
	if (theme === "dark") { loadDarkMode(); }
	else                  { loadLightMode(); }
}

// Switch Theme
function switchTheme() {

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

// Load Themes
function loadDarkMode() {
	console.debug("Selected Theme: Dark");
	THEME_ICON_HTML.src = "/.resources/images/moon.png";
	THEME_ICON_HTML.style.filter = "invert(100%)";
	delLightMode();
	setDarkMode();
}
function loadLightMode() {
	console.debug("Selected Theme: Light");
	THEME_ICON_HTML.src = "/.resources/images/sun.png";
	THEME_ICON_HTML.style.filter = "invert(0%)";
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
