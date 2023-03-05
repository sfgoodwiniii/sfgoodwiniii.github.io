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
    },
    {
        "header": "Guitar Tabs",
        "description": "A collection of the guitar tabs I play.",
        "link": "guitar-tabs",
        "image": "assets/index/guitar.jpg",
        "alt": "Guitar Tabs"
    },
    {
        "header": "Guitar Tabs",
        "description": "A collection of the guitar tabs I play.",
        "link": "guitar-tabs",
        "image": "assets/index/guitar.jpg",
        "alt": "Guitar Tabs"
    },
    {
        "header": "Guitar Tabs",
        "description": "A collection of the guitar tabs I play.",
        "link": "guitar-tabs",
        "image": "assets/index/guitar.jpg",
        "alt": "Guitar Tabs"
    },
    {
        "header": "Guitar Tabs",
        "description": "A collection of the guitar tabs I play.",
        "link": "guitar-tabs",
        "image": "assets/index/guitar.jpg",
        "alt": "Guitar Tabs"
    },
    {
        "header": "Guitar Tabs",
        "description": "A collection of the guitar tabs I play.",
        "link": "guitar-tabs",
        "image": "assets/index/guitar.jpg",
        "alt": "Guitar Tabs"
    },
    {
        "header": "Guitar Tabs",
        "description": "A collection of the guitar tabs I play.",
        "link": "guitar-tabs",
        "image": "assets/index/guitar.jpg",
        "alt": "Guitar Tabs"
    },
    {
        "header": "Guitar Tabs",
        "description": "A collection of the guitar tabs I play.",
        "link": "guitar-tabs",
        "image": "assets/index/guitar.jpg",
        "alt": "Guitar Tabs"
    },
    {
        "header": "Guitar Tabs",
        "description": "A collection of the guitar tabs I play.",
        "link": "guitar-tabs",
        "image": "assets/index/guitar.jpg",
        "alt": "Guitar Tabs"
    },
    {
        "header": "Guitar Tabs",
        "description": "A collection of the guitar tabs I play.",
        "link": "guitar-tabs",
        "image": "assets/index/guitar.jpg",
        "alt": "Guitar Tabs"
    }
]

// select the div with the id of grid
const tilegrid = document.querySelector('.tilegrid');


// Switch case chooser for the amount of tiles
switch(data.length){
    case 1:
        createLine(tilegrid, data);
        break;
        case 2:
            createLine(tilegrid, data);
        break;
    case 3:
        createLine(tilegrid, data);
        break;
    case 4:
        createLine(tilegrid, data);
        break;
    case 5:
        createLine(tilegrid, data.slice(0, 3));
        createLine(tilegrid, data.slice(3, 5));
        break;
    case 6:
        createLine(tilegrid, data.slice(0, 3));
        createLine(tilegrid, data.slice(3, 6));
        break;
    case 7:
        createLine(tilegrid, data.slice(0, 4));
        createLine(tilegrid, data.slice(4, 7));
        break;
    case 8:
        createLine(tilegrid, data.slice(0, 4));
        createLine(tilegrid, data.slice(4, 8));
        break;
    case 9:
        createLine(tilegrid, data.slice(0, 3));
        createLine(tilegrid, data.slice(3, 6));
        createLine(tilegrid, data.slice(6, 9));
        break;
    case 10:
        createLine(tilegrid, data.slice(0, 3));
        createLine(tilegrid, data.slice(3, 7));
        createLine(tilegrid, data.slice(7, 10));
        break;
    case 11:
        createLine(tilegrid, data.slice(0, 4));
        createLine(tilegrid, data.slice(4, 7));
        createLine(tilegrid, data.slice(7, 11));
        break;
    case 12:
        createLine(tilegrid, data.slice(0, 4));
        createLine(tilegrid, data.slice(4, 8));
        createLine(tilegrid, data.slice(8, 12));
        break;
}


// add tiles to a line
function createLine(current_grid, data) {

    // create line element
    var line = document.createElement('div');
        line.classList.add('grid')

    // for each item of data, create a tile and add it to the line
    for(var i = 0; i < data.length; i++) {
        var tile = createTile(data[i]);
        line.appendChild(tile);
    }

    // add line to the grid
    current_grid.appendChild(line)
}


// a function that takes in a dictionary and returns a tile
function createTile(data) {
    // create a new image element and add it to the tile
    var image = document.createElement('img');
        image.setAttribute('src', data.image);
        image.setAttribute('alt', data.alt);

    // create a new h1 element and add it to the overlay
    var header = document.createElement('h1');
        header.textContent = data.header;

    // create a new p element and add it to the overlay
    var description = document.createElement('p');
        description.textContent = data.description;

    // create a new div element and add it to the tile
    var overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.appendChild(header);
        overlay.appendChild(description);
    
    // create a new element for each entry and add it to the grid
    var tile = document.createElement('a');
        tile.classList.add('tile');
        tile.setAttribute('href', data.link);
        tile.appendChild(image);
        tile.appendChild(overlay);

    // return the tile
    return tile;
}