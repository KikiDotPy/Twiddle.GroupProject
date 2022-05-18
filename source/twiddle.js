let keyboard = document.getElementById("keyboard");

function createKeys(chars, rowDiv)
{
    chars.split("").map(char =>  {
        let keySpan = document.createElement("span");
        rowDiv.append(keySpan);
        keySpan.innerHTML = char;
    });
}

function createRows(keyboard, rowsOfChars)
{
    rowsOfChars.map(rowOfChars => {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add('row');
        keyboard.append(rowDiv);
        createKeys(rowOfChars, rowDiv);
    });
}

createRows(keyboard, ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"]);