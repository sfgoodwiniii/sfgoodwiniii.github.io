function tabSwitch(ID, executable) {

    // Constants
    const TAB_HTML = document.getElementById(ID);
    const PARENT_HTML = TAB_HTML.parentNode;

    // Only highlight the selected tab
    for (let i = 0; i < PARENT_HTML.children.length; i++) {
        PARENT_HTML.children[i].classList.remove('text-highlight');
    }
    TAB_HTML.classList.add('text-highlight');

    // Execute the function that corresponds to the tab
    executable(ID);
}



// Page Startup
function loadLangStartup() {
    const LANG = fetchLocalStorage("lang", "EN");
    tabSwitch(LANG, switchLanguage);
}