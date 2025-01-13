// [TODO Add Actual Code] Load the content
function loadLanguageContent(langID) {
    const langIDtoContent = {
        "EN": "English",
        "ES": "Spanish",
        "FR": "French"
    };
    console.log("[HOME] Selected Language: " + langIDtoContent[langID]);
}
function loadThemeContent(themeID) {
    const themeIDtoContent = {
        "dark": "Dark",
        "light": "Light"
    };
    console.log("[HOME] Selected Theme: " + themeIDtoContent[themeID]);
}