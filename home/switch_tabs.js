function loadTabStartup() {

	// Fetch the tab from the local storage
	const tabID = localStorage.getItem("tab");

	// If the tab is not set, set it to "tab1"
	if (tabID === null) { localStorage.setItem("tab", "about"); }

	// Highlight the stored tab
	const tabHTML = document.getElementById(tabID);
	tabHTML.classList.add("text-highlight");

	// Load the content for the tab
	loadTabContent(tabID);
}
loadTabStartup();


function selectTab(tabID) {

	// Fetch the clicked tab
	const tabHTML = document.getElementById(tabID);

	// If the tab is already highlighted, ignore the click
	if (tabHTML.classList.contains("text-highlight")) { return; }

	// Fetch all tabs and remove the highlight
	const tabListHTML = document.getElementsByClassName("tab");
	for (let i = 0; i < tabListHTML.length; i++) {
		tabListHTML[i].classList.remove("text-highlight");
	}

	// Highlight the clicked tab
	tabHTML.classList.add("text-highlight");

	// Save the selected tab to the local storage
	localStorage.setItem("tab", tabID);

	// Load the content for the clicked tab
	loadTabContent(tabID);
}


function loadTabContent(tabID) {}
