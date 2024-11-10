// Constants
DEFAULT_LANGUAGE = "EN";
LANGUAGE_PARENT_ID = "sdev-header__language";
LANGUAGE_TEXT_HIGHLIGHT_CLASS = "sdev__text-highlight";
loadLangStartup();

// Page Startup
function loadLangStartup() {

	// Add the highlight to the current language
	const langID = fetchLocalStorage("lang", DEFAULT_LANGUAGE);
	const langHTML = fetchObjectHTML(LANGUAGE_PARENT_ID, langID);
		  langHTML.classList.add(LANGUAGE_TEXT_HIGHLIGHT_CLASS);

	// Load the content for the language
	loadLangContent(langID);
}

// Switch Language
function switchLanguage(langID) {

	// If the language is already highlighted, ignore the click
	if (fetchLocalStorage("lang") === langID) { return; }

	// Remove the highlight from the previous language
	const previousLangID = fetchLocalStorage("lang");
	const previousLangHTML = fetchObjectHTML(LANGUAGE_PARENT_ID, previousLangID);
		  previousLangHTML.classList.remove(LANGUAGE_TEXT_HIGHLIGHT_CLASS);

	// Highlight the clicked language
	const langHTML = fetchObjectHTML(LANGUAGE_PARENT_ID, langID);
		  langHTML.classList.add(LANGUAGE_TEXT_HIGHLIGHT_CLASS);

	// Save the selected language to the local storage
	localStorage.setItem("lang", langID);

	// Load the content for the language
	loadLangContent(langID);
}

// [TODO Add Actual Code] Load the content for the language
function loadLangContent(langID) {
	const langIDtoContent = {
		"EN": "English",
		"ES": "Spanish",
		"FR": "French"
	};
	console.debug("Selected Language: " + langIDtoContent[langID]);
}
