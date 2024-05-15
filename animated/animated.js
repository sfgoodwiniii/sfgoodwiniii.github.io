// @ts-ignore

import { MoveableHTMLElement, Origin, calc } from "./HTMLAnimated.ts";



function dT(dt) { return `all ${dt} cubic-bezier( 0.62, 0.17, 0.31, 0.87 )` }










// Universal functions
function sleep(milliseconds) { // @ts-ignore
    return new Promise(resolve => setTimeout(resolve, milliseconds)); }


// Global variables
var cards = {};
var slideFactor = 0.65;







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
    // @ts-ignore
    var isClickable = event.target.getAttribute("clickable") === "true";
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
        var isClickable = cards[key].HTML.getAttribute("clickable") === "true";
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
// @ts-ignore
async function pageInitialization() {

    // Page loading console message
    console.info("Loading cards into JavaScript...");

    // Create a card object for each card on the page
    const htmlCards = document.getElementsByClassName("card")
    // @ts-ignore
    for (var cardElement of htmlCards) {

        // Create a new card object and add to cards dictionary
        var cardObj = new MoveableHTMLElement(cardElement);
        cards[cardElement.id] = cardObj;
    }

    // Print success message
    console.info("Cards loaded successfully!");
}



// Desktop initialization animation
// @ts-ignore
async function desktopIntroAnimation() {

    // Logging
    console.info("Starting intro animation...")

    // Set card variables
    const LEFT_CARD = cards["card-cl"]
    const RIGHT_CARD = cards["card-cr"]
    const SHADOW = cards["shadow"]

    // Lift left card
    LEFT_CARD.move("0px", "25px", dT("0.75s"), Origin.Self);
    SHADOW.move("0px", "0px", dT("0.75s"), Origin.Self);
    await sleep(800);

    // Shift left card to the left
    var dx = `-${RIGHT_CARD.style.width}/2 - ${LEFT_CARD.style.width}/2 - 50px`
    LEFT_CARD.move(dx, "0px", dT("1.0s"), Origin.Self);
    SHADOW.move(dx, "0px", dT("1.0s"), Origin.Self);
    await sleep(1000);

    // Drop left card on the table
    LEFT_CARD.move("0px", "-25px", dT("1.0s"), Origin.Self);
    await sleep(750);

    // Collide left card with right card
    LEFT_CARD.move("50px", "0px", dT("0.75s"), Origin.Self);
    SHADOW.move("50px", "0px", dT("0.75s"), Origin.Self);
    await sleep(750);

    // Logging
    console.info("Intro animation complete!")
}

// Animation final state
// @ts-ignore
async function pageFinalization() {

    // Logging
    console.info("Finalizing page...")

    // Set card variables
    const leftCardShift = `-${cards["card-cr"].width}/2`
    const rightCardShift = `${cards["card-cl"].width}/2`

    // Move cards to final position
    cards["card-cl"].move(leftCardShift, "0px", "0.75s", Origin.Absolute);
    cards["card-cr"].move(rightCardShift, "0px", "0.75s", Origin.Absolute);
    cards["shadow"].move(leftCardShift, "0px", "0.75s", Origin.Absolute);

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
// @ts-ignore
async function _initialize_mobile() {
    await pageInitialization()
    await sleep(1000);
    console.info("Mobile detected, skipping intro animation...")
    await pageFinalization();
}

// Desktop
// @ts-ignore
async function _initialize_desktop() {
    await pageInitialization();
    await sleep(1000);
    console.info("Desktop detected, running intro animation...")
    await desktopIntroAnimation();
    await pageFinalization();
}