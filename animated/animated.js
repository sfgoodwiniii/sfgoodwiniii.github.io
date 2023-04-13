// Card class
class Card {
    constructor(id, defaultX, defaultY, height, width) {

        // Set the card's properties
        this.id = id;
        this.width = width;
        this.height = height;
        this.currentX = `${defaultX}`;
        this.currentY = `${defaultY}`;
        this.defaultX = `${defaultX} + 50% - ${width}/2`;
        this.defaultY = `${defaultY} * (-1) + 50% - ${height}/2`;

        // Finalize card creation
        this.moveCardAbs("0px", "0px", "0s", false);
    }

    // Move the card to a new position
    moveCardRel(dx, dy, dt, transition=true) {
        this.currentX = `${this.currentX} + ${dx}`;
        this.currentY = `${this.currentY} - ${dy}`;
        this.html.style.left = `calc(${this.currentX})`;
        this.html.style.top = `calc(${this.currentY})`;

        if (transition) {
            this.html.style.transition = `all ${dt} cubic-bezier( 0.62, 0.17, 0.31, 0.87 )`;
        }
        else {
            this.html.style.transition = "";
        }
    }

    // Move the card to a new position
    moveCardAbs(dx, dy, dt, transition=true) {
        this.currentX = `${this.defaultX} + ${dx}`;
        this.currentY = `${this.defaultY} - ${dy}`;
        this.html.style.left = `calc(${this.currentX})`;
        this.html.style.top = `calc(${this.currentY})`;
        
        if (transition) {
            this.html.style.transition = `all ${dt} cubic-bezier( 0.62, 0.17, 0.31, 0.87 )`;
        }
        else {
            this.html.style.transition = "";
        }
    }
}


// Find all cards in the html body that have the class card
var HTMLcards = document.getElementsByClassName("card");
var cards = {};


// For all cards in the html body, create a new card object
for (var i = 0; i < HTMLcards.length; i++) {

    // Get the card's html element
    var obj = HTMLcards[i];

    // Create a new card object
    console.log(obj.id, obj.getAttribute('dx'), obj.getAttribute('dy'), obj.getAttribute('height'), obj.getAttribute('width'))
    card_obj = new Card(obj.id, obj.getAttribute('dx'), obj.getAttribute('dy'), obj.getAttribute('height'), obj.getAttribute('width'));

    // Add the card to the cards dictionary using the card's id as the key
    cards[obj.id] = card_obj;
}








function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

// function loadPageData(data_path) {
//     fetch(data_path)
//         .then((response) => response.json())
//         .then((data) => parseJSON(data));
// }
// function parseJSON(data) {
//     for (var key in data) {
//         if (data.hasOwnProperty(key)) {
//             cards[key] = new Card(key, data[key].dx, data[key].dy, data[key].height, data[key].width);
//         }
//     }
// }


// Global variables
var cards = {};
var introFinished = false;


function returnViewToDefault() {
    for (var key in cards) {
        if (cards.hasOwnProperty(key)) {
            cards[key].moveCardAbs("0px", "0px", "1.0s");
        }
    }
}


// When card-ul is clicked, move all cards to the left
function card_ul_clicked() {
    if (!introFinished) { return; }
    dx = `${cards["card-ul"].offsetX} * (-1)`
    dy = `${cards["card-ul"].defaultY} - 50% + ${cards["card-ul"].height}/2`

    cards["card-ul"].moveCardRel(dx, dy, "1.0s");
    cards["card-ur"].moveCardRel(dx, dy, "1.0s");
    cards["card-cl"].moveCardRel(dx, dy, "1.0s");
    cards["card-cr"].moveCardRel(dx, dy, "1.0s");
    cards["card-bl"].moveCardRel(dx, dy, "1.0s");
    cards["card-br"].moveCardRel(dx, dy, "1.0s");
}

// When card-ur is clicked, move all cards to the right
function card_ur_clicked() {
    if (!introFinished) { return; }
    dx = `(${cards["card-ur"].defaultX} - 50% + ${cards["card-ur"].width}/2) * (-1)`
    dy = `${cards["card-ur"].defaultY} - 50% + ${cards["card-ur"].height}/2`
    cards["card-ul"].moveCardRel(dx, dy, "1.0s");
    cards["card-ur"].moveCardRel(dx, dy, "1.0s");
    cards["card-cl"].moveCardRel(dx, dy, "1.0s");
    cards["card-cr"].moveCardRel(dx, dy, "1.0s");
    cards["card-bl"].moveCardRel(dx, dy, "1.0s");
    cards["card-br"].moveCardRel(dx, dy, "1.0s");
}

// // When card-bl is clicked, move all cards to the left
// function card_bl_clicked() {
//     if (!introFinished) { return; }
//     dx = `-${cards["card-bl"].defaultX}`
//     dy = `-${cards["card-bl"].defaultY}`
//     cards["card-ul"].moveCardRel(dx, dy, "1.0s");
//     cards["card-ur"].moveCardRel(dx, dy, "1.0s");
//     cards["card-cl"].moveCardRel(dx, dy, "1.0s");
//     cards["card-cr"].moveCardRel(dx, dy, "1.0s");
//     cards["card-bl"].moveCardRel(dx, dy, "1.0s");
//     cards["card-br"].moveCardRel(dx, dy, "1.0s");
// }

// // When card-br is clicked, move all cards to the right
// function card_br_clicked() {
//     if (!introFinished) { return; }
//     dx = `-${cards["card-br"].defaultX}`
//     dy = `-${cards["card-br"].defaultY}`
//     cards["card-ul"].moveCardRel(dx, dy, "1.0s");
//     cards["card-ur"].moveCardRel(dx, dy, "1.0s");
//     cards["card-cl"].moveCardRel(dx, dy, "1.0s");
//     cards["card-cr"].moveCardRel(dx, dy, "1.0s");
//     cards["card-bl"].moveCardRel(dx, dy, "1.0s");
//     cards["card-br"].moveCardRel(dx, dy, "1.0s");
// }


// Card Perspective Changer
document.addEventListener("click", function(event) {

    // Ignore click if intro is not finished yet
    if (!introFinished) { return; }

    // Swap perspective if the click is on a corner card
    // Otherwise, reset to default perspective
    switch (event.target.id) {
        case "card-ul": card_ul_clicked(); break;
        case "card-ur": card_ur_clicked(); break;
        case "card-bl": card_bl_clicked(); break;
        case "card-br": card_br_clicked(); break;
        default: returnViewToDefault(); break;
    }
});


// detect when click
document.addEventListener("click", function (e) {

});







// Desktop initialization animation
async function introAnimation() {

    // Lift Left Card
    cards["card-cl"].moveCardRel("0px", "25px", "0.75s");
    cards["shadow"].moveCardRel("0px", "0px", "0.75s");
    await sleep(800);

    // Shift Left Card to the left
    var dx = `-${cards["card-cr"].width}/2 - ${cards["card-cl"].width}/2 - 50px`
    cards["card-cl"].moveCardRel(dx, "0px", "1.0s");
    cards["shadow"].moveCardRel(dx, "0px", "1.0s");
    await sleep(1000);

    // Drop left card on the table
    cards["card-cl"].moveCardRel("0px", "-25px", "1.0s");
    cards["shadow"].moveCardRel("0px", "0px", "1.0s");
    await sleep(750);

    // Collide left card with right card
    cards["card-cl"].moveCardRel("50px", "0px", "0.75s");
    cards["shadow"].moveCardRel("50px", "0px", "0.75s");
    await sleep(750);

    // Finish the animation
    await introFinalState();
}

// Animation final state
async function introFinalState() {
    var dx = `-${cards["card-cr"].width}/2`
    var dx2 = `${cards["card-cl"].width}/2`
    cards["card-cl"].moveCardAbs(dx, "0px", "0.75s");
    cards["shadow"].moveCardAbs(dx, "0px", "0.75s");
    cards["card-cr"].moveCardAbs(dx2, "0px", "0.75s");
    cards["card-cl"].defaultX = cards["card-cl"].currentX;
    cards["card-cr"].defaultX = cards["card-cr"].currentX;
    await sleep(750);
    cards["card-cl"].html.style.borderRadius = "20px 0px 0px 20px";
    cards["card-cr"].html.style.borderRadius = "0px 20px 20px 0px";
    cards["shadow"].html.remove();
    await sleep(750);
    introFinished = true;
}

// Mobile Initialization
async function _initialize_mobile() {
    loadPageData("./cards.json");
    await sleep(1000);  // Delay Start
    await introFinalState();
}

// Desktop Initialization
async function _initialize_desktop() {
    loadPageData("./cards.json");
    await sleep(1000);  // Delay Start
    await introAnimation();
}

// Initialize the page depending on platform
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    isMobile ? _initialize_mobile() : _initialize_desktop();
