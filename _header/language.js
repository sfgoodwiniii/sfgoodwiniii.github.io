function loadDefaultLanguage() {

    // If it's the first time, set it to English
    if (localStorage.getItem("lang") == null) {
        localStorage.setItem("lang", "EN");
    }

    // Fetch the language from the local storage
    const lang = localStorage.getItem("lang");

    // Set the dropdown to the selected language
    document.getElementById("language").value = lang;

    // Load the language in the page (skips if it's English)
    loadLanguage(lang);
}
function changeLanguage() {

    // Fetch the language from the dropdown
    const lang = document.getElementById("language").value;

    // Save it to the local storage
    localStorage.setItem("lang", lang);

    // Load the language in the page
    loadLanguage(lang);
}
function loadLanguage(lang) {
    fetch("_header/lang/" + lang + ".json")
        .then(response => response.json())
        .then(data => {
            // Set the language in the page
            document.getElementById("home").innerText = data["header.middle.home"];
            document.getElementById("professional").innerText = data["header.middle.professional"];
            document.getElementById("personal").innerText = data["header.middle.personal"];
            document.getElementById("portfolio").innerText = data["header.middle.portfolio"];
            document.getElementById("contact").innerText = data["header.middle.contact"];
            document.getElementById("theme").alt = data["header.right.theme"];
        })
        .catch(error => {
            console.error("Error: " + error);
        });
    console.info("Set Language: " + lang);
}