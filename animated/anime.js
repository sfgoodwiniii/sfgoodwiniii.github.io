









// Clickable card listener and handler
document.addEventListener("click", function(event) {

    // Ignore click if intro is not finished yet
    if (!introFinished) { return; }

    // if card is a corner card, remove half-brightness filter
    if (CORNER_CARDS.includes(event.target)) {
        event.target.classList.remove("half-brightness");
    }

    // If in a shifted perspective, make the center cards clickable
    const isShiftedPerspective = shiftedTowardUL || shiftedTowardUR || shiftedTowardBL || shiftedTowardBR;
    if (isShiftedPerspective) { CENTER_CARDS.forEach(function(element) {element.classList.add("clickable"); }); }
    else                      { CENTER_CARDS.forEach(function(element) {element.classList.remove("clickable"); }); }

    // Remove clickable from current card
    CORNER_CARDS.forEach(function(element) {element.classList.add("clickable"); });
    event.target.classList.remove("clickable");
});


// When hovering over a corner card, remove half-brightness filter
document.addEventListener("mouseover", function(event) {

    // Ignore click if intro is not finished yet
    if (!introFinished) { return; }

    // If card is in corner cards, remove half-brightness filter
    if (CORNER_CARDS.includes(event.target)) {
        event.target.classList.remove("half-brightness");
    }
});

// If not hovering over a corner card, add half-brightness filter
document.addEventListener("mouseout", function(event) {

    // Ignore click if intro is not finished yet
    if (!introFinished) { return; }

    // If card is card-ul and shiftedTowardUL, return
    if (event.target == CARD_UL && shiftedTowardUL) { return; }
    if (event.target == CARD_UR && shiftedTowardUR) { return; }
    if (event.target == CARD_BL && shiftedTowardBL) { return; }
    if (event.target == CARD_BR && shiftedTowardBR) { return; }

    // If card is in corner cards, remove half-brightness filter
    if (CORNER_CARDS.includes(event.target)) {
        event.target.classList.add("half-brightness");
    }
});




// Card Perspective Shifter
function toggle_shift(type) {

    // Reset to default perspective first
    _shift_reset();

    // Toggle the perspective to the specified type
    switch (type) {
        case "Default": break;
        case "UL": _shift_ul(); break;
        case "UR": _shift_ur(); break;
        case "BL": _shift_bl(); break;
        case "BR": _shift_br(); break;
        default: alert("Error: Invalid shift type");
    }
}


  







function _shift_reset() {
    CORNER_CARDS.forEach(function(element) {element.classList.add("half-brightness"); });

    CARD_UL.classList.remove("ul-on-ul")
    CARD_UR.classList.remove("ur-on-ul")
    CARD_BL.classList.remove("bl-on-ul")
    CARD_BR.classList.remove("br-on-ul")

    CARD_UL.classList.remove("ul-on-ur")
    CARD_UR.classList.remove("ur-on-ur")
    CARD_BL.classList.remove("bl-on-ur")
    CARD_BR.classList.remove("br-on-ur")

    CARD_UL.classList.remove("ul-on-bl")
    CARD_UR.classList.remove("ur-on-bl")
    CARD_BL.classList.remove("bl-on-bl")
    CARD_BR.classList.remove("br-on-bl")

    CARD_UL.classList.remove("ul-on-br")
    CARD_UR.classList.remove("ur-on-br")
    CARD_BL.classList.remove("bl-on-br")
    CARD_BR.classList.remove("br-on-br")

    CARD_CL.classList.remove("center-left-ul")
    CARD_CR.classList.remove("center-right-ul")

    CARD_CL.classList.remove("center-left-ur")
    CARD_CR.classList.remove("center-right-ur")

    CARD_CL.classList.remove("center-left-bl")
    CARD_CR.classList.remove("center-right-bl")

    CARD_CL.classList.remove("center-left-br")
    CARD_CR.classList.remove("center-right-br")

    shiftedTowardUL = false;
    shiftedTowardUR = false;
    shiftedTowardBL = false;
    shiftedTowardBR = false;
}
function _shift_ul() {
    shiftedTowardUL = !shiftedTowardUL;

    CARD_UL.classList.add("ul-on-ul")
    CARD_UR.classList.add("ur-on-ul")
    CARD_BL.classList.add("bl-on-ul")
    CARD_BR.classList.add("br-on-ul")

    CARD_CL.classList.add("center-left-ul")
    CARD_CR.classList.add("center-right-ul")
}
function _shift_ur() {
    shiftedTowardUR = !shiftedTowardUR;

    CARD_UL.classList.add("ul-on-ur")
    CARD_UR.classList.add("ur-on-ur")
    CARD_BL.classList.add("bl-on-ur")
    CARD_BR.classList.add("br-on-ur")

    CARD_CL.classList.add("center-left-ur")
    CARD_CR.classList.add("center-right-ur")
}
function _shift_bl() {
    shiftedTowardBL = !shiftedTowardBL;

    CARD_UL.classList.add("ul-on-bl")
    CARD_UR.classList.add("ur-on-bl")
    CARD_BL.classList.add("bl-on-bl")
    CARD_BR.classList.add("br-on-bl")

    CARD_CL.classList.add("center-left-bl")
    CARD_CR.classList.add("center-right-bl")
}
function _shift_br() {
    shiftedTowardBR = !shiftedTowardBR;

    CARD_UL.classList.add("ul-on-br")
    CARD_UR.classList.add("ur-on-br")
    CARD_BL.classList.add("bl-on-br")
    CARD_BR.classList.add("br-on-br")

    CARD_CL.classList.add("center-left-br")
    CARD_CR.classList.add("center-right-br")
}

