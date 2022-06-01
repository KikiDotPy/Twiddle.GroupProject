const version = "1.01";

let gameBoard = null;

// SCALE

// KEY
class Key
{
    constructor(keyboardRowElement, char)
    {
        this.char = char;

        // inject key element into DOM
        const keyElement = document.createElement("span");
        keyElement.innerHTML = char;
        keyboardRowElement.append(keyElement);

        // hook up click event
        // pattern: publish-subscribe
        // event emitter
        keyElement.addEventListener("click", (e) => this.onClick());
    }
    
    onClick()
    {
        console.log('key:' + this.char);
        gameBoard.enterChar(this.char);
    }
}

// KEYBOARD ROW
function createKeys(keyboardRowElement, chars)
{
    chars.split("").map(char => {
        const key = new Key(keyboardRowElement, char);
    });
}

// KEYBOARD
function createRows(keyboardElement, rowsOfChars)
{
    rowsOfChars.map(rowOfChars => {
        const keyboardRowElement = document.createElement("div");
        keyboardRowElement.classList.add("row");
        keyboardElement.append(keyboardRowElement);
        
        createKeys(keyboardRowElement, rowOfChars);
    });
}

// GAMEBOARD
class Tile
{
    constructor(gameBoardRowElement)
    {
        this.gameBoardTileElement = document.createElement("span");
        this.gameBoardTileElement.classList.add("gameBoardTile");
        gameBoardRowElement.append(this.gameBoardTileElement);
        
        // gameBoardTileElement.innerHTML = char;
    }

    get char()
    {
        return this.gameBoardTileElement.innerHTML;
    }
    set char(value)
    {
        this.gameBoardTileElement.innerHTML = value;
    }
}
class GameBoard
{
    constructor(gameBoardElement)
    {
        this.createGameBoardRows(gameBoardElement, 6);
    }

    createTiles(gameBoardRowElement, numberOfTiles, char, rowIndex)
    {
        for(let tileIndex = 0; tileIndex < numberOfTiles; tileIndex++)
        {
            const tile = new Tile(gameBoardRowElement);
            tile.char = char + rowIndex + "/" + tileIndex;
            
        }
    }
    createGameBoardRows(gameBoardElement, numberOfRows)
    {
        for(let i = 0; i < numberOfRows; i++)
        {
            const gameBoardRowElement = document.createElement("div");
            gameBoardRowElement.classList.add("gameBoardRow");
            gameBoardElement.append(gameBoardRowElement);

            this.createTiles(gameBoardRowElement, 5, "L", i);
        }
    }
    enterChar(char)
    {
        // this.tiles[0][0].char = char;
    }
}


const keyboardElement = document.getElementById("keyboard");
createRows(keyboard, ["QWERTYUIOP", "ASDFGHJKL", " ZXCVBNM "]);

const gameBoardElement = document.getElementById("gameBoard");
gameBoard = new GameBoard(gameBoardElement);

console.debug(`Twiddle loaded v${version}.`);