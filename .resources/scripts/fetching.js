// Fetches a key from the local storage. If it doesn't exist, sets it to the default value specified.
function fetchLocalStorage(key, keyDefaultValue=null) {
    if (localStorage.getItem(key) === null) {
        console.debug("Value for " + key + " not found in the local storage. Setting it to the default value: " + keyDefaultValue);
        localStorage.setItem(key, keyDefaultValue);
    }
    return localStorage.getItem(key);
}

// Fetches the child html object from the parent object using their IDs
function fetchObjectHTML(parentID, childPseudoID) {
    const parentHTML = document.getElementById(parentID);
    const childHTML = Array.from(parentHTML.children).find((child) => child.innerHTML.toLowerCase() === childPseudoID.toLowerCase());
    if (childHTML === undefined) { console.error("Failed to return Child Object with ID: " + childPseudoID + ", from Parent Object with ID: " + parentID); }
    return childHTML;
}