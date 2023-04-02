// Generates a grid of tiles from a JSON file
function generateTilesGrid(div_id, tiles_data_url, style) {
    const tilegrid = document.querySelector("#" + div_id);

    fetch(tiles_data_url)
        .then((response) => response.json())
        .then((data) => createGrid(tilegrid, data, style));
}



// Create the grid
function createGrid(tilegrid, data, style) {







    // Switch case chooser for the amount of tiles
    switch(data.length){
        case 1:
            createRow(tilegrid, data);
            break;
            case 2:
                createRow(tilegrid, data);
            break;
        case 3:
            createRow(tilegrid, data);
            break;
        case 4:
            createRow(tilegrid, data);
            break;
        case 5:
            createRow(tilegrid, data.slice(0, 3));
            createRow(tilegrid, data.slice(3, 5));
            break;
        case 6:
            createRow(tilegrid, data.slice(0, 3));
            createRow(tilegrid, data.slice(3, 6));
            break;
        case 7:
            createRow(tilegrid, data.slice(0, 4));
            createRow(tilegrid, data.slice(4, 7));
            break;
        case 8:
            createRow(tilegrid, data.slice(0, 4));
            createRow(tilegrid, data.slice(4, 8));
            break;
        case 9:
            createRow(tilegrid, data.slice(0, 3));
            createRow(tilegrid, data.slice(3, 6));
            createRow(tilegrid, data.slice(6, 9));
            break;
        case 10:
            createRow(tilegrid, data.slice(0, 3));
            createRow(tilegrid, data.slice(3, 7));
            createRow(tilegrid, data.slice(7, 10));
            break;
        case 11:
            createRow(tilegrid, data.slice(0, 4));
            createRow(tilegrid, data.slice(4, 7));
            createRow(tilegrid, data.slice(7, 11));
            break;
    }
    if (data.length >= 12) {
        blockMoreThan12Tiles(tilegrid, data);
    }
}

function blockMoreThan12Tiles(tilegrid, data) {
    // for every 4 tiles, create a line with those 4 tiles
    for(var i = 0; i < data.length; i += 4) {
        var segment = data.slice(i, i + 4)
        if (segment.length == 4) {
            createRow(tilegrid, segment);
        }
        else if (segment.length == 3) {
            createRow(tilegrid, [...segment, null]);
        }
        else if (segment.length == 2) {
            createRow(tilegrid, [...segment, null, null]);
        }
        else if (segment.length == 1) {
            createRow(tilegrid, [...segment, null, null, null]);
        }
    }
}

// add tiles to a line
function createRow(tilegrid, data) {

    // create line element
    var row = document.createElement('div');
    row.style.display = 'flex';
    row.style.flexFlow = 'row wrap';
    row.style.justifyContent = 'center';
    row.classList.add('grid') // REMOVE THIS

    // for each item of data, create a tile and add it to the row
    for(var i = 0; i < data.length; i++) {
        var tile = createTile(data[i]);
        row.appendChild(tile);
    }

    // add row to the grid
    tilegrid.appendChild(row)
}

// a function that takes in a dictionary and returns a tile
function createTile(data) {

    // if tile is null, make a blank tile and return it
    if(data == null) {
        var tile = document.createElement('div');
            tile.classList.add('blanktile');
        return tile;
    }

    // create a new image element and add it to the tile
    var image = document.createElement('img');
        image.setAttribute('src', data.image);
        image.setAttribute('alt', data["image-alt"]);

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