// Constants
const OPERATION = {
	ADD: "add",
	REMOVE: "remove"
}

// Public Functions
function sdev_header__startLanguage() {

	// Fetch the stored language
	const DEFAULT_LANGUAGE = "EN";
	const langID = fetchLocalStorage("lang", DEFAULT_LANGUAGE);

	// Add the highlight to the stored language
	_sdev_header__languageHighlight(langID, OPERATION.ADD);

	// Load the content for the language
	_sdev_header__loadLangContent(langID);
}
function sdev_header__switchLanguage(langID) {

	// Fetch the current language
	const currentLangID = fetchLocalStorage("lang");

	// If the language is the same, then return
	if (currentLangID === langID) { return; }

	// Swap the highlight from the previous language
	_sdev_header__languageHighlight(currentLangID, OPERATION.REMOVE);
	_sdev_header__languageHighlight(langID, OPERATION.ADD);

	// Save the selected language to the local storage
	localStorage.setItem("lang", langID);

	// Load the content for the language
	_sdev_header__loadLangContent(langID);
}

// Private Functions
function _sdev_header__loadLangContent(langID) {
	try {
		loadLangContent(langID);
	} catch (error) {
		console.error("Implementation of loadLangContent(langID) is missing.\nError: " + error);
		_sdev_header__languageDebugPrint(langID);
	}
}
function _sdev_header__languageHighlight(langID, operation) {

	// Parameters
	const LANGUAGE_PARENT_ID = "sdev-header__language";
	const LANGUAGE_TEXT_HIGHLIGHT_CLASS = "sdev__text-highlight";

	// Fetch the language HTML object
	const langHTML = fetchObjectHTML(LANGUAGE_PARENT_ID, langID);

	// Add or remove the highlight
	if (operation === OPERATION.ADD) {
		langHTML.classList.add(LANGUAGE_TEXT_HIGHLIGHT_CLASS);
	} else if (operation === OPERATION.REMOVE) {
		langHTML.classList.remove(LANGUAGE_TEXT_HIGHLIGHT_CLASS);
	}
}
function _sdev_header__languageDebugPrint(langID) {
	const langIDtoContent = {
		"EN": "English",
		"ES": "Spanish",
		"FR": "French"
	};
	console.debug("[switchLanguages.js] Selected Language: " + langIDtoContent[langID]);
}

// Startup
sdev_header__startLanguage();