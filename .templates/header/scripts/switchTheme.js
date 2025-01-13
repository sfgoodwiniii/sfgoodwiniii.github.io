// Public Functions
function sdev_header__startTheme() {
	const DEFAULT_THEME = "dark";
	const themeID = fetchLocalStorage("theme", DEFAULT_THEME);
	_sdev_header__loadThemeContent(themeID)
}
function sdev_header__switchTheme(themeID) {
	// Check if the theme is already selected
	const currentThemeID = fetchLocalStorage("theme");
	if (currentThemeID === themeID) { return; }

	// Save theme and load content
	localStorage.setItem("theme", themeID);
	_sdev_header__loadThemeContent(themeID);
}

// Private Functions
function _sdev_header__loadThemeContent(themeID) {
	// Header theme handler
	const linkHTML = document.getElementById("sdev-header__page-theme")
	      linkHTML.href = "/.resources/styles/theme_" + themeID + ".css";

	// Page theme handler
	try {
		loadThemeContent(themeID);
	} catch (error) {
		console.warn("Implementation of loadThemeContent(themeID) is missing.\nError: " + error);
		_sdev_header_loadThemeDebugPrint(themeID);
	}
}
function _sdev_header_loadThemeDebugPrint(themeID) {
	const themeIDtoContent = {
		"dark": "Dark",
		"light": "Light"
	};
	console.log("header/switchTheme.js] Selected Theme: " + themeIDtoContent[themeID]);
}

// Startup
sdev_header__startTheme();



// Dark-Light Integration (REMOVE LATER)
// This is the old toggle solution for the dark-light theme. It is not recommended to use this solution.
// Later it will be replaced with a gear settings menu on the side to select the theme.
function sdev_header__toggleTheme() {
	const currentThemeID = fetchLocalStorage("theme");
	const newThemeID = currentThemeID === "dark" ? "light" : "dark";
	_sdev_header__loadThemeContent(newThemeID);
	localStorage.setItem("theme", newThemeID);

	const THEME_TOGGLE_HTML = document.getElementById("sdev-header__theme-icon");
	const PAGE_BODY_HTML = document.getElementsByTagName("body")[0];
	if (newThemeID === "dark") {
		THEME_TOGGLE_HTML.src = "/.templates/header/images/moon.png";
		THEME_TOGGLE_HTML.style.filter = "invert(100%)";
		PAGE_BODY_HTML.style.transition = "var(--theme-transition, 0.25s)";
	} else if (newThemeID === "light") {
		THEME_TOGGLE_HTML.src = "/.templates/header/images/sun.png";
		THEME_TOGGLE_HTML.style.filter = "invert(0%)";
		PAGE_BODY_HTML.style.transition = "var(--theme-transition, 0.25s)";
	}
}

const THEME_TOGGLE_HTML = document.getElementById("sdev-header__theme-icon");
const themeID = fetchLocalStorage("theme");
if (themeID === "dark") {
	THEME_TOGGLE_HTML.src = "/.templates/header/images/moon.png";
	THEME_TOGGLE_HTML.style.filter = "invert(100%)";
} else if (themeID === "light") {
	THEME_TOGGLE_HTML.src = "/.templates/header/images/sun.png";
	THEME_TOGGLE_HTML.style.filter = "invert(0%)";
}