// Public Functions
function sdev_header__startTheme() {

	// Fetch the stored theme
	const DEFAULT_THEME = "dark";
	const themeID = fetchLocalStorage("theme", DEFAULT_THEME);

	// Load the content for the theme
	_sdev_header__loadThemeContent(themeID)
}
function sdev_header__switchTheme(themeID) {

	// Fetch the current theme
	const currentThemeID = fetchLocalStorage("theme");

	// Load the content for the theme
	_sdev_header__loadThemeContent(themeID);
}

// Private Functions
function _sdev_header__loadThemeContent(themeID) {

	// Load the content for the theme
	_sdev_header__themeLinkReplace(themeID);

	// Print the selected theme
	_sdev_header__themeDebugPrint(themeID);
}
function _sdev_header__themeLinkReplace(themeID) {
	const linkHTML = document.getElementById("sdev-header__page-theme")
	      linkHTML.href = "/.resources/styles/theme_" + themeID + ".css";
}
function _sdev_header__themeDebugPrint(themeID) {
	const themeIDtoContent = {
		"dark": "Dark",
		"light": "Light",
	};
	console.debug("[switchTheme.js] Selected Theme: " + themeIDtoContent[themeID]);
}

// Startup
sdev_header__startTheme();



// Dark-Light Integration (REMOVE LATER)
function sdev_header__toggleTheme() {
	const currentThemeID = fetchLocalStorage("theme");
	const newThemeID = currentThemeID === "dark" ? "light" : "dark";
	sdev_header__switchTheme(newThemeID);
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