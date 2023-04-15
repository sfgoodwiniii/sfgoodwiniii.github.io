// Author: Stanley Goodwin
// This file contains the JavaScript code for the animated page.


// Global variables

var currentCard = null;
var screenShifted = false;
var cards = {};


// Universal functions
function calc(string) { return `calc(${string})`; }
function sCalc(string) { return string.substring(5, string.length-1); }
function sleep(milliseconds) { return new Promise(resolve => setTimeout(resolve, milliseconds)); }


// Card class
class Card {

    // Static HTML Getters
    get html() { return this.HTML; }
    get id() { return this.HTML.id; }

    // Style Getters and Setters
    get width() { return this.HTML.style.width; }
    set width(value) { this.HTML.style.width = value; }
    get height() { return this.HTML.style.height; }
    set height(value) { this.HTML.style.height = value; }
    get originX() { return `50% - ${this.width}/2`; }
    get originY() { return `50% - ${this.height}/2`; }
    get x_0() { return this.HTML.getAttribute("dx"); }
    get y_0() { return this.HTML.getAttribute("dy"); }

    // Constructor
    constructor(element) {

        // Set the HTML element
        this.HTML = element;

        // Reading the attributes
        var _width = element.getAttribute("width");
        var _height = element.getAttribute("height");
        var _offsetX = element.getAttribute("dx");
        var _offsetY = element.getAttribute("dy");
        var _originX = `50% - ${_width}/2`;
        var _originY = `50% - ${_height}/2`;

        // Modifying the HTML element
        element.style.width = _width;
        element.style.height = _height;
        element.style.left = calc(`${_originX} + ${_offsetX}`);
        element.style.top = calc(`${_originY} + ${_offsetY} * (-1)`);

        // Delete the attributes
        element.removeAttribute("height");
        element.removeAttribute("width");
        
        // Print success message
        console.debug("Successfully created card: " + element.id);
    }

    // Move the card to a new position
    move(dx, dy, dt, transition=true, absolute=false) {

        // If absolute, reset card first
        if (absolute) { this.reset(); }

        // Enable or disable transition
        if (!transition) { this.HTML.style.transition = ""; }
        else { this.HTML.style.transition = `all ${dt} cubic-bezier( 0.62, 0.17, 0.31, 0.87 )`; }

        // Read current position
        var x = sCalc(this.HTML.style.left);
        var y = sCalc(this.HTML.style.top);

        // Move the card
        this.HTML.style.left = calc(`${x} + ${dx}`);
        this.HTML.style.top = calc(`${y} + ${dy} * (-1)`);
    }

    // Reset the card to its original position
    reset() {
        var dx = this.HTML.getAttribute("dx");
        var dy = this.HTML.getAttribute("dy");
        this.HTML.style.left = calc(`${this.originX} + ${dx}`);
        this.HTML.style.top = calc(`${this.originY} + ${dy} * (-1)`);
    }
}














// Movement utility functions
function moveToPerspective(element, dt, transition=true) {
    var perspective = cards[element.id];
    for (var card of Object.values(cards)) {
        card.move(`${perspective.x_0} * (-1)`, `${perspective.y_0} * (-1)`, dt, transition, true);
    }
    screenShifted = true;
}

function resetPerspective(dt, transition=true) {
    for (var card of Object.values(cards)) {
        card.reset();
    }
    screenShifted = true;
}



// Page movement event listeners
// Event listener for card clicked
document.addEventListener('click', function(event) {

    // If the intro animation is not finished, return
    if (!introFinished) { return; }

    // If the card is clicked again, return
    if (event.target.id == currentCard) { return; }



    selectedCard = cards[event.target.id];



    switch (event.target.id) {
        case "card-ul":
            moveToPerspective(event.target, "1.0s");
            currentCard = "card-ul";
            break;
        case "card-ur":
            moveToPerspective(event.target, "1.0s");
            currentCard = "card-ur";
            break;
        case "card-bl":
            moveToPerspective(event.target, "1.0s");
            currentCard = "card-bl";
            break;
        case "card-br":
            moveToPerspective(event.target, "1.0s");
            currentCard = "card-br";
            break;
        default:
            resetPerspective("1.0s");
            currentCard = null;
            screenShifted = false;
            break;
    }
});








// Create a function that does the initial page load
async function pageInitialization() {

    // Page loading console message
    console.info("Loading cards into JavaScript...");

    // Create a card object for each card on the page
    const html_cards = document.getElementsByClassName("card")
    for (var element of html_cards) {

        // Create a new card object and add to cards dictionary
        var card_obj = new Card(element);
        cards[element.id] = card_obj;
    }

    // Print success message
    console.info("Cards loaded successfully!");
}

// Desktop initialization animation
async function desktopIntroAnimation() {

    // Logging
    console.info("Starting intro animation...")

    // Set card variables
    const LEFT_CARD = cards["card-cl"]
    const RIGHT_CARD = cards["card-cr"]
    const SHADOW = cards["shadow"]

    // Lift left card
    LEFT_CARD.move("0px", "25px", "0.75s");
    SHADOW.move("0px", "0px", "0.75s");
    await sleep(800);

    // Shift left card to the left
    var dx = `-${RIGHT_CARD.width}/2 - ${LEFT_CARD.width}/2 - 50px`
    LEFT_CARD.move(dx, "0px", "1.0s");
    SHADOW.move(dx, "0px", "1.0s");
    await sleep(1000);

    // Drop left card on the table
    LEFT_CARD.move("0px", "-25px", "1.0s");
    SHADOW.move("0px", "0px", "1.0s");
    await sleep(750);

    // Collide left card with right card
    LEFT_CARD.move("50px", "0px", "0.75s");
    SHADOW.move("50px", "0px", "0.75s");
    await sleep(750);

    // Logging
    console.info("Intro animation complete!")
}

// Animation final state
async function pageFinalization() {

    // Logging
    console.info("Finalizing page...")

    // Set card variables
    const leftCardShift = `-${cards["card-cr"].width}/2`
    const rightCardShift = `${cards["card-cl"].width}/2`

    // Move cards to final position
    cards["card-cl"].move(leftCardShift, "0px", "0.75s", transition = true, absolute=true);
    cards["card-cr"].move(rightCardShift, "0px", "0.75s", transition = true, absolute=true);
    cards["shadow"].move(leftCardShift, "0px", "0.75s", transition = true, absolute=true);

    // Set the default position of the cards to the final position
    cards["card-cl"].HTML.setAttribute("dx", calc(leftCardShift));
    cards["card-cr"].HTML.setAttribute("dx", calc(rightCardShift));

    // Slightly delay corner collapse
    await sleep(200);

    // Remove the curvature from the cards where they meet
    cards["card-cl"].HTML.style.borderRadius = "20px 0px 0px 20px";
    cards["card-cr"].HTML.style.borderRadius = "0px 20px 20px 0px";

    // Remove the shadow card
    cards["shadow"].HTML.remove();
    delete cards["shadow"];

    // Wait for the animation to finish
    await sleep(750);

    // Flag the animation done
    introFinished = true;

    // Logging
    console.info("Page finalized!")
}

// Initialize the page depending on platform
var introFinished = false;
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    !isMobile ? _initialize_mobile() : _initialize_desktop();

// Mobile
async function _initialize_mobile() {
    await pageInitialization()
    await sleep(1000);
    console.info("Mobile detected, skipping intro animation...")
    await pageFinalization();
}

// Desktop
async function _initialize_desktop() {
    await pageInitialization();
    await sleep(1000);
    console.info("Desktop detected, running intro animation...")
    await desktopIntroAnimation();
    await pageFinalization();
}