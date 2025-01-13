// Public Functions
function sdev_header__startLanguage() {
	const DEFAULT_LANGUAGE = "EN";
	const langID = fetchLocalStorage("lang", DEFAULT_LANGUAGE);
	_sdev_header__highlightSelectedLanguage(langID, OPERATION.ADD);
	_sdev_header__loadLanguageContent(langID);
}
function sdev_header__switchLanguage(langID) {
	// Check if the language is already selected
	const currentLangID = fetchLocalStorage("lang");
	if (currentLangID === langID) { return; }

	// Swap the highlight from the previous language
	_sdev_header__highlightSelectedLanguage(currentLangID, OPERATION.REMOVE);
	_sdev_header__highlightSelectedLanguage(langID, OPERATION.ADD);

	// Save language and load content
	localStorage.setItem("lang", langID);
	_sdev_header__loadLanguageContent(langID);
}

// Private Functions
function _sdev_header__loadLanguageContent(langID) {
	// Page language handler
	try {
		loadLanguageContent(langID);
	} catch (error) {
		console.warn("Implementation of loadLanguageContent(langID) is missing.\nError: " + error);
		_sdev_header__defaultLoadLanguageContent(langID);
	}
}
function _sdev_header__highlightSelectedLanguage(langID, operation) {

	// Parameters
	const LANGUAGE_PARENT_ID = "sdev-header__language-container";

	// Fetch the language HTML object
	const langHTML = fetchObjectHTML(LANGUAGE_PARENT_ID, langID);

	// Add or remove the highlight
	if (operation === OPERATION.ADD) {
		langHTML.setAttribute("aria-current", "language");
	} else if (operation === OPERATION.REMOVE) {
		langHTML.removeAttribute("aria-current");
	}
}
function _sdev_header__defaultLoadLanguageContent(langID) {
	const langIDtoContent = {
		"EN": "English",
		"ES": "Spanish",
		"FR": "French"
	};
	console.log("[header/switchLanguages.js] Selected Language: " + langIDtoContent[langID]);
}

// Startup
sdev_header__startLanguage();