const version = "1.00";

function createKeys(keyboardRowElement, chars)
{
    chars.split("").map(char =>  {
        const keyElement = document.createElement("span");
        keyElement.innerHTML = char;
        keyboardRowElement.append(keyElement);
    });
}
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
createRows(keyboard, ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"]);

console.debug(`Twiddle loaded v${version}.`);