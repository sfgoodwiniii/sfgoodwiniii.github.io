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
	document.getElementById("theme").src = "_shared/toolbar/img/moon.png";
	delLightMode();
	setDarkMode();
}
function loadLightMode() {
	console.info("Set Theme: Light mode");
	document.getElementById("theme").src = "_shared/toolbar/img/sun.png";
	delDarkMode();
	setLightMode();
}
function setDarkMode() {
	const head = document.head;
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = "_shared/theme_dark.css";
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
	link.href = "_shared/theme_light.css";
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
function loadDefaultTheme() {

	// If it's the first time, set it to dark
	if (localStorage.getItem("theme") == null) {
		localStorage.setItem("theme", "dark");
	}

	// Fetch the theme from the local storage
	const theme = localStorage.getItem("theme");

	// Load the theme in the page
	if (theme === "dark") { loadDarkMode(); }
	else                  { loadLightMode(); }
}
loadDefaultTheme();