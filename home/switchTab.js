// Constants
SELECTOR = "tile-grid-selector";
DEFAULT = "home".toLowerCase();
loadTab();

// Helper Functions
function fetchLocalStorage(key, defaultValue=null) {
	if (localStorage.getItem(key) === null) {
		console.debug("Value for" + key + " not found in the local storage. Setting it to the default value: " + defaultValue);
		localStorage.setItem(key, defaultValue);
		return defaultValue;
	}
	return localStorage.getItem(key);
}
function fetchObjectHTML(parentID, childPseudoID) {
	const parentHTML = document.getElementById(parentID);
	const childHTML = Array.from(parentHTML.children).find((child) => child.innerHTML.toLowerCase() === childPseudoID.toLowerCase());
	if (childHTML === undefined) { console.error("Failed to return Child Object with ID: " + childPseudoID + ", from Parent Object with ID: " + parentID); }
	return childHTML;
}

// Page Startup
function loadTab() {

	// Fetch the tab from the local storage
	const tabID = fetchLocalStorage("tab", DEFAULT);

	// Highlight the stored tab
	const tabHTML = fetchObjectHTML(SELECTOR, tabID);
		  tabHTML.classList.add("text-highlight");

	// Load the content for the tab
	loadTabContent(tabID);
}

// Switch Tabs
function switchTab(childPseudoID) {

	// Convert the tabID to lowercase
	childPseudoID = childPseudoID.toLowerCase();

	// If the tab is already highlighted, ignore the click
	if (localStorage.getItem("tab") === childPseudoID) { return; }

	// Remove the highlight from the previous tab
	const previousTabID = fetchLocalStorage("tab");
	const previousTabHTML = fetchObjectHTML(SELECTOR, previousTabID);
		  previousTabHTML.classList.remove("text-highlight");

	// Highlight the clicked tab
	const tabHTML = fetchObjectHTML(SELECTOR, childPseudoID);
		  tabHTML.classList.add("text-highlight");

	// Save the selected tab to the local storage
	localStorage.setItem("tab", childPseudoID);

	// Load the content for the tab
	loadTabContent(childPseudoID);
}

// Load the content for the tab
function loadTabContent(tabID) {
	console.debug("Selected TabID: " + tabID);
}
