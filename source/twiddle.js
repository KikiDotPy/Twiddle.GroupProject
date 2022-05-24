const version = "1.00";

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
        keyElement.addEventListener("click", (e) => this.onClick());
    }
    
    onClick()
    {
        console.log('key:' + this.char);
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


const keyboardElement = document.getElementById("keyboard");
createRows(keyboard, ["QWERTYUIOP", "ASDFGHJKL", " ZXCVBNM "]);

console.debug(`Twiddle loaded v${version}.`);