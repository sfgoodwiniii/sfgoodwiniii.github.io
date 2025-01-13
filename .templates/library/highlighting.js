const OPERATION = {
    ADD: "add",
    REMOVE: "remove"
}


function highlightSelectedHTMLObject(htmlObject, key) {
    htmlObject.setAttribute("aria-current", key);
}
function unhighlightSelectedHTMLObject(htmlObject) {
    htmlObject.removeAttribute("aria-current");
}