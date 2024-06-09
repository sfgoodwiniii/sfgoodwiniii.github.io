// Page Initialization
function initializePage() {
	manageSideBar(initSideBar());
	manageDarkMode(initDarkMode());
}

// Directory (Sidebar) Manager
function initSideBar() {
	if (localStorage.getItem('show-sidebar') === null) {
		localStorage.setItem('show-sidebar', "true");
	}
	return localStorage.getItem('show-sidebar') === 'true';
}
function toggleSideBar() {
	let showSidebar = localStorage.getItem('show-sidebar') === 'true';
	showSidebar = !showSidebar;
	manageSideBar(showSidebar);
	localStorage.setItem('show-sidebar', showSidebar.toString());
}
function manageSideBar(showSidebar) {
	if (showSidebar) { openSideBar(); }
	else             { closeSideBar(); }
}
function openSideBar() {

	// Find elements
	const sidebar = document.getElementById('sidebar');
	const content = document.getElementById('content');
	const directory = document.getElementById('directory');

	// Change styles
	sidebar.style.transform = "translateX(0)";
	content.style.width = ""
	directory.style.width = "var(--directory-width)";

	// Print message
	console.info("Sidebar opened");
}
function closeSideBar() {

	// Find elements
	const sidebar = document.getElementById('sidebar');
	const content = document.getElementById('content');
	const directory = document.getElementById('directory');

	// Change styles
	sidebar.style.transform = "";
	content.style.width = "100%";
	directory.style.width = ""

	// Print message
	console.log("Sidebar closed");
}

// Dark Mode
function initDarkMode() {
	if (localStorage.getItem('dark-mode') === null) {
		localStorage.setItem('dark-mode', "false");
	}
	return localStorage.getItem('dark-mode') === 'true';
}
function toggleDarkMode() {
	let darkMode = localStorage.getItem('dark-mode') === 'true';
	darkMode = !darkMode;
	manageDarkMode(darkMode);

	// Save the new value
	localStorage.setItem('dark-mode', darkMode.toString());
}
function manageDarkMode(darkMode) {
	if (darkMode) { enableDarkMode(); }
	else                { disableDarkMode(); }
}
function enableDarkMode() {
	document.body.classList.add('dark-mode');
	console.log("Dark mode enabled");
}
function disableDarkMode() {
	document.body.classList.remove('dark-mode');
	console.log("Dark mode disabled");
}















