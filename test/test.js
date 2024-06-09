function toggleDarkMode() {
	const darkMode = document.body.classList.toggle('dark-mode');
	localStorage.setItem('dark-mode', darkMode);
	// const darkMode = localStorage.getItem('dark-mode') === 'true';
	// if (darkMode) {
	// 	document.body.classList.add('dark-mode');
	// }
}

function initialize() {
	const sidebar = document.getElementById('sidebar');
	const content = document.getElementById('content');
	const displacement = "calc(-1 * var(--directory-width) - var(--universal-margin))";
	sidebar.style.transform = "translateX(" + displacement + ")";
	content.style.transform = "translateX(" + displacement + ")";
	// make content wider to fill the gap


}










let showSidebar = false;
function toggleSideBar() {
	showSidebar = !showSidebar;
	displaySidebar(showSidebar);
	console.log(showSidebar);
}
function displaySidebar(showSidebar) {
	const sidebar = document.getElementById('sidebar');
	const directory = document.getElementById('directory');

	if (showSidebar) {  // When the sidebar goes from hidden to shown

		// Sidebar
		sidebar.style.width = "var(--directory-width)";
		sidebar.style.margin = "0 var(--universal-margin) 0 0";
		sidebar.style.borderRadius = "var(--universal-radius)";
		sidebar.style.padding = "calc(var(--universal-radius))";

		// Directory
		directory.style.width = "var(--directory-width)";
	}
	else {
		// Sidebar
		sidebar.style.width = "0";
		sidebar.style.margin = "0";
		sidebar.style.borderRadius = "0";
		sidebar.style.padding = "0";

		// Directory
		directory.style.width = "var(--directory-height)";
	}
}