// Constants
PARENT = "sdev-header__language";
DEFAULT_LANGUAGE = "EN";
TEXT_HIGHLIGHT_CLASS = "sdev-header__text-highlight";
loadLangStartup();

// Page Startup
function loadLangStartup() {

	// Fetch the language from the local storage
	const langID = fetchLocalStorage("lang", DEFAULT_LANGUAGE);

	// Highlight the stored language
	const langHTML = fetchObjectHTML(PARENT, langID);
		  langHTML.classList.add(TEXT_HIGHLIGHT_CLASS);

	// Load the content for the language
	loadLangContent(langID);
}

// Switch Language
function switchLanguage(langID) {

	// If the language is already highlighted, ignore the click
	if (fetchLocalStorage("lang") === langID) { return; }

	// Remove the highlight from the previous language
	const previousLangID = fetchLocalStorage("lang");
	const previousLangHTML = fetchObjectHTML(PARENT, previousLangID);
		  previousLangHTML.classList.remove(TEXT_HIGHLIGHT_CLASS);

	// Highlight the clicked language
	const langHTML = fetchObjectHTML(PARENT, langID);
		  langHTML.classList.add(TEXT_HIGHLIGHT_CLASS);

	// Save the selected language to the local storage
	localStorage.setItem("lang", langID);

	// Load the content for the language
	loadLangContent(langID);
}

// [TODO Add Actual Code] Load the content for the language
function loadLangContent(langID) {
	const langIDtoContent = {
		"EN": "English",
		"FR": "French"
	};
	console.debug("Selected Language: " + langIDtoContent[langID]);
}
