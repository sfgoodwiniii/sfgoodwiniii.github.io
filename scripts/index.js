import createGrid from './tiles.js';


const tilegrid = document.querySelector('.tilegrid');
const data = [
    {
        "header": "LinkedIn",
        "description": "Where I keep my up-to-date work information and other related subjects.",
        "link": "https://www.linkedin.com/in/stanley-goodwin-8812511b4/",
        "image": "assets/index/linkedin.png",
        "alt": "LinkedIn"
    },
    {
        "header": "JavaScript Calculator",
        "description": "I made a basic 4-function calculator in Javascript that has a grid of input items.",
        "link": "jscalc",
        "image": "assets/index/calculator.webp",
        "alt": "Javacript Calculator"
    },
    {
        "header": "Guitar Tabs",
        "description": "A collection of the guitar tabs I play.",
        "link": "guitar-tabs",
        "image": "assets/index/guitar.jpg",
        "alt": "Guitar Tabs"
    }
]

createGrid(tilegrid, data)