function loadLangStartup() {

	// Fetch the language from the local storage
	const langID = localStorage.getItem("lang");

	// If the language is not set, set it to English
	if (langID === null) { localStorage.setItem("lang", "EN"); }

	// Highlight the stored language
	const langHTML = document.getElementById(langID);
	langHTML.classList.add("text-highlight");

	// Load the content for the language
	loadLangContent(langID);
}
loadLangStartup();


function selectLang(langID) {

	// Fetch the clicked language
	const langHTML = document.getElementById(langID);

	// If the language is already highlighted, ignore the click
	if (langHTML.classList.contains("text-highlight")) { return; }

	// Fetch all languages and remove the highlight
	const langListHTML = document.getElementsByClassName("lang");
	for (let i = 0; i < langListHTML.length; i++) {
		langListHTML[i].classList.remove("text-highlight");
	}

	// Highlight the clicked language
	langHTML.classList.add("text-highlight");

	// Save the selected language to the local storage
	localStorage.setItem("lang", langID);

	// Load the content for the clicked language
	loadLangContent(langID);
}


function loadLangContent(langID) {}