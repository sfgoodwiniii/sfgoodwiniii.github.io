// Constants
DEFAULT_TAB = "home".toLowerCase();
TAB_PARENT_ID = "tile-grid-selector";
TAB_TEXT_HIGHLIGHT_CLASS = "sdev__text-highlight";
loadTab();

// Page Startup
function loadTab() {

	// Add the highlight to the current tab
	const tabID = fetchLocalStorage("tab", DEFAULT_TAB);
	const tabHTML = fetchObjectHTML(TAB_PARENT_ID, tabID);
	      tabHTML.classList.add(TAB_TEXT_HIGHLIGHT_CLASS);

	// Load the content for the tab
	loadTabContent(tabID);
}

// Switch Tabs
function switchTab(childPseudoID) {

	// If the tab is already highlighted, ignore the click
	if (fetchLocalStorage("tab") === childPseudoID) { return; }

	// Remove the highlight from the previous tab
	const previousTabID = fetchLocalStorage("tab");
	const previousTabHTML = fetchObjectHTML(TAB_PARENT_ID, previousTabID);
	      previousTabHTML.classList.remove(TAB_TEXT_HIGHLIGHT_CLASS);

	// Highlight the clicked tab
	const tabHTML = fetchObjectHTML(TAB_PARENT_ID, childPseudoID);
	      tabHTML.classList.add(TAB_TEXT_HIGHLIGHT_CLASS);

	// Save the selected tab to the local storage
	localStorage.setItem("tab", childPseudoID);

	// Load the content for the tab
	loadTabContent(childPseudoID);
}

// Load the content for the tab
function loadTabContent(tabID) {
	console.debug("Selected TabID: " + tabID);
}
