// Author: Stanley Goodwin
// This file contains the JavaScript code for the animated page.







// Universal functions
function sleep(milliseconds) { return new Promise(resolve => setTimeout(resolve, milliseconds)); }


// Global variables
var cards = {};
slideFactor = 0.65;



// Card class
class Card {

    // Static HTML Getters
    get html() { return this.HTML; }
    get id() { return this.HTML.id; }
    get originX() { return `50% - ${this.width}/2`; }
    get originY() { return `50% - ${this.height}/2`; }
    get currentX() { return sCalc(this.HTML.style.left); }
    get currentY() { return sCalc(this.HTML.style.top); }

    // Dynamic HTML Getters
    get width() { return this.HTML.style.width; }
    get height() { return this.HTML.style.height; }
    get defaultX() { return this.HTML.getAttribute("dx"); }
    get defaultY() { return this.HTML.getAttribute("dy"); }
    get borderRadius() { return this.HTML.style.borderRadius; }

    // Dynamic HTML Setters
    set width(value) { this.HTML.style.width = value; }
    set height(value) { this.HTML.style.height = value; }
    set defaultX(value) { this.HTML.setAttribute("dx", value); }
    set defaultY(value) { this.HTML.setAttribute("dy", value); }
    set borderRadius(value) { this.HTML.style.borderRadius = value; }


    // Constructor
    constructor(element) {

        // Set the HTML element
        this.HTML = element;

        // Swapping the width and height attributes with the style attributes
        element.style.width = element.getAttribute("width");
        element.removeAttribute("width");
        element.style.height = element.getAttribute("height");
        element.removeAttribute("height");

        // Add shadow and clickability
        if (element.getAttribute("clickable") == "true") {
            this.HTML.style.filter = "brightness(50%)";
            this.HTML.style.cursor = "pointer";
        }

        // Set the default position of the card
        this.returnToDefaultPosition("0s");
        
        // Print success message
        console.debug("Successfully created card: " + element.id);
    }

    // Reset the card to its default position
    returnToDefaultPosition(dt) { this.move(this.defaultX, this.defaultY, dt, true); }

    // Move the card to a new position
    move(dx, dy, dt, absolute=false) {

        // Find the coordinates to set as the origin
        var x = absolute ? this.originX : this.currentX;
        var y = absolute ? this.originY : this.currentY;

        // Move the card
        this.HTML.style.transition = `all ${dt} cubic-bezier( 0.62, 0.17, 0.31, 0.87 )`
        this.HTML.style.left = calc(`${x} + ${dx}`);
        this.HTML.style.top  = calc(`${y} + ${dy} * (-1)`);
    }

    // Delete the card
    delete() {
        this.HTML.remove();
        delete this;
    }

}





// Perspective animations
var currentCard = null;
var isAnimating = false;
document.addEventListener('click', function(event) {

    // If the intro animation is not finished, return
    if (!introFinished) { return; }

    // If the animation is already running, return
    if(isAnimating) { return; }
    isAnimating = true;
    setTimeout(() => isAnimating = false, 750);

    // Shift perspectives
    var isClickable = event.target.getAttribute("clickable") == "true";
    if (!isClickable) { resetPerspective("1.0s"); }
    else { moveToPerspective(event.target, "1.0s"); }
    
});

function resetPerspective(dt) {

    // Set the current card to null
    currentCard = null;

    // For all cards in the dictionary, move them to their default position
    for (var key in cards) {

        // Move the card to its default position
        cards[key].returnToDefaultPosition(dt);
        
        // If the card is clickable, set its brightness to 50%
        var isClickable = cards[key].HTML.getAttribute("clickable") == "true";
        cards[key].HTML.style.filter = isClickable ? "brightness(50%)" : "brightness(100%)";
        cards[key].HTML.style.cursor = isClickable ? "pointer" : "default";
    }
}

function moveToPerspective(target, dt) {

    var card = cards[target.id];
    var dx = `${card.defaultX} * (-1) * ${slideFactor}`;
    var dy = `${card.defaultY} * (-1) * ${slideFactor}`;

    // For all cards in the dictionary, move them to the perspective
    for (var key in cards) {
        cards[key].returnToDefaultPosition(dt);
        cards[key].move(dx, dy, dt);
        cards[key].HTML.style.filter = "brightness(50%)"
        cards[key].HTML.style.cursor = "pointer";
    }

    // Set the target card to full brightness
    card.HTML.style.filter = "brightness(100%)";
    card.HTML.style.cursor = "default";

    // Set the current card to the target card
    currentCard = card;
}





// Create a function that does the initial page load
async function pageInitialization() {

    // Page loading console message
    console.info("Loading cards into JavaScript...");

    // Create a card object for each card on the page
    const htmlCards = document.getElementsByClassName("card")
    for (var cardElement of htmlCards) {

        // Create a new card object and add to cards dictionary
        var cardObj = new Card(cardElement);
        cards[cardElement.id] = cardObj;
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
    cards["card-cl"].move(leftCardShift, "0px", "0.75s", absolute=true);
    cards["card-cr"].move(rightCardShift, "0px", "0.75s", absolute=true);
    cards["shadow"].move(leftCardShift, "0px", "0.75s", absolute=true);

    // Set the default position of the cards to the final position
    cards["card-cl"].defaultX = calc(leftCardShift);
    cards["card-cr"].defaultX = calc(rightCardShift);
    
    // Slightly delay corner collapse
    await sleep(300);

    // Remove the curvature from the cards where they meet
    cards["card-cl"].borderRadius = "20px 0px 0px 20px";
    cards["card-cr"].borderRadius = "0px 20px 20px 0px";

    // Delete the shadow card
    cards["shadow"].delete();

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
    isMobile ? _initialize_mobile() : _initialize_desktop();

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