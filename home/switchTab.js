// Constants
PARENT = "tile-grid-selector";
DEFAULT_TAB = "home".toLowerCase();
TEXT_HIGHLIGHT_CLASS = "text-highlight";
loadTab();


// TODO THIS IS BROKEN, FIX IT


// Page Startup
function loadTab() {

	// Fetch the tab from the local storage
	const tabID = fetchLocalStorage("tab", DEFAULT_TAB);

	// Highlight the stored tab
	const tabHTML = fetchObjectHTML(PARENT, tabID);
		  tabHTML.classList.add(TEXT_HIGHLIGHT_CLASS);

	// Load the content for the tab
	loadTabContent(tabID);
}

// Switch Tabs
function switchTab(childPseudoID) {

	// Convert the tabID to lowercase
	childPseudoID = childPseudoID.toLowerCase();

	// If the tab is already highlighted, ignore the click
	if (fetchLocalStorage("tab") === childPseudoID) { return; }

	// Remove the highlight from the previous tab
	const previousTabID = fetchLocalStorage("tab");
	const previousTabHTML = fetchObjectHTML(PARENT, previousTabID);
		  previousTabHTML.classList.remove(TEXT_HIGHLIGHT_CLASS);

	// Highlight the clicked tab
	const tabHTML = fetchObjectHTML(PARENT, childPseudoID);
		  tabHTML.classList.add(TEXT_HIGHLIGHT_CLASS);

	// Save the selected tab to the local storage
	localStorage.setItem("tab", childPseudoID);

	// Load the content for the tab
	loadTabContent(childPseudoID);
}

// Load the content for the tab
function loadTabContent(tabID) {
	console.debug("Selected TabID: " + tabID);
}
