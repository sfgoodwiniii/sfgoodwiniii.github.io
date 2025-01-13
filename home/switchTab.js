// Constants
DEFAULT_TAB = "home".toLowerCase();
TAB_PARENT_ID = "tile-grid-selector";
TAB_TEXT_HIGHLIGHT_CLASS = "sdev__text-highlight";
loadTab();

// Page Startup
function loadTab() {
	const tabID = fetchLocalStorage("tab", DEFAULT_TAB);
	const tabHTML = fetchObjectHTML(TAB_PARENT_ID, tabID);
	highlightHTMLObject(tabHTML, "tab", OPERATION.ADD);
	loadTabContent(tabID);
}

// Switch Tabs
function switchTab(childPseudoID) {

	// If the tab is already highlighted, ignore the click
	if (fetchLocalStorage("tab") === childPseudoID) { return; }

	// Remove the highlight from the previous tab
	const previousTabID = fetchLocalStorage("tab");
	const previousTabHTML = fetchObjectHTML(TAB_PARENT_ID, previousTabID);
	highlightHTMLObject(previousTabHTML, "tab", OPERATION.REMOVE);

	// Highlight the clicked tab
	const tabHTML = fetchObjectHTML(TAB_PARENT_ID, childPseudoID);
	highlightHTMLObject(tabHTML, "tab", OPERATION.ADD);

	// Save the selected tab to the local storage
	localStorage.setItem("tab", childPseudoID);

	// Load the content for the tab
	loadTabContent(childPseudoID);
}

// Load the content for the tab
function loadTabContent(tabID) {
	console.debug("Selected TabID: " + tabID);
}
