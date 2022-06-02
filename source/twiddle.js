const version = "1.01";

// KEYBOARD
class Key
{
    constructor(keyboardRowElement, char)
    {
        this.char = char;
        this.listeners = [];

        // inject key element into DOM
        const keyElement = document.createElement("span");
        keyElement.innerHTML = char;
        keyboardRowElement.append(keyElement);

        // hook up click event
        // pattern: publish-subscribe
        // event emitter
        keyElement.addEventListener("click", (e) => this.onClick());
    }
    
    addPressedEventListener(listener)
    {
        this.listeners.push(listener);
    }

    onClick()
    {
        // iterate obver all subscribers, and notify them
        this.listeners.forEach(l => l());
    }
}
class Keyboard 
{
    constructor(keyboardElement)
    {
        this.listeners = [];

        this.createRows(keyboardElement, ["QWERTYUIOP", "ASDFGHJKL", " ZXCVBNM "]);
    }
    
    createRows(keyboardElement, rowsOfChars)
    {
        rowsOfChars.map(rowOfChars => {
            const keyboardRowElement = document.createElement("div");
            keyboardRowElement.classList.add("row");
            keyboardElement.append(keyboardRowElement);
            
            this.createKeys(keyboardRowElement, rowOfChars);
        });
    }
    createKeys(keyboardRowElement, chars)
    {
        chars.split("").map(char => {
            const key = new Key(keyboardRowElement, char);
            key.addPressedEventListener(() => {
                this.listeners.forEach(l => l(key.char));
            });
        });
    }

    addKeyPressedEventListener(listener)
    {
        this.listeners.push(listener);
    }
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

    get isEmpty()
    {
        return this.char == "";
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
class Row 
{
    constructor(gameBoardElement)
    {
        const gameBoardRowElement = document.createElement("div");
        gameBoardRowElement.classList.add("gameBoardRow");
        gameBoardElement.append(gameBoardRowElement);

        this.createTiles(gameBoardRowElement, 5, "L");
    }
    
    get numberOfTiles()
    {
        return this.tiles.length;
    }
    get activeTile()
    {
        return this.tiles.find(t => t.isEmpty);
    }

    createTiles(gameBoardRowElement, numberOfTiles, char)
    {
        this.tiles = [];

        for(let tileIndex = 0; tileIndex < numberOfTiles; tileIndex++)
        {
            const tile = new Tile(gameBoardRowElement);
            this.tiles.push(tile);
        }
    }
    enterChar(char)
    {
        this.activeTile.char = char;
    }
}
class GameBoard
{
    constructor(gameBoardElement)
    {
        this.createGameBoardRows(gameBoardElement, 6);
    }

    get activeRow()
    {
        return this.rows.find(r => r.activeTile);
    }

    createGameBoardRows(gameBoardElement, numberOfRows)
    {
        this.rows = [];

        for(let i = 0; i < numberOfRows; i++)
        {
            const row = new Row(gameBoardElement);
            this.rows.push(row);
        }
    }
    enterChar(char)
    {
        // TODO: handle case when all rows are filled
        this.activeRow.enterChar(char);
    }
}

const gameBoardElement = document.getElementById("gameBoard");
const gameBoard = new GameBoard(gameBoardElement);

const keyboardElement = document.getElementById("keyboard");
const keyboard = new Keyboard(keyboardElement);
keyboard.addKeyPressedEventListener((char) => gameBoard.enterChar(char));

console.debug(`Twiddle loaded v${version}.`);