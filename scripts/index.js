import data from './data/index.json';
console.log(data);


// fetch('https://server.com/data.json')
//     .then((response) => response.json())
//     .then((json) => console.log(json));



// select the div with the id of grid
const grid = document.querySelector('.grid');

// create a for loop for all entries in data
for (let i = 0; i < data.length; i++) {

    // create a new image element and add it to the tile
    var image = document.createElement('img');
        image.setAttribute('src', image_directory + data[i].image);
        image.setAttribute('alt', data[i].alt);

    // create a new h1 element and add it to the overlay
    var header = document.createElement('h1');
        header.textContent = data[i].header;

    // create a new p element and add it to the overlay
    var description = document.createElement('p');
        description.textContent = data[i].description;

    // create a new div element and add it to the tile
    var overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.appendChild(header);
        overlay.appendChild(description);

    // create a new element for each entry and add it to the grid
    var tile = document.createElement('a');
        tile.classList.add('tile');
        tile.setAttribute('href', data[i].link);
        tile.appendChild(image);
        tile.appendChild(overlay);
    
    // add the tile to the grid
    grid.appendChild(tile);
}