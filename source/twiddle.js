function createKeys(keyboardRowElement, chars)
{
    chars.split("").map(char =>  {
        let keyElement = document.createElement("span");
        keyElement.innerHTML = char;
        keyboardRowElement.append(keyElement);
    });
}
function createRows(keyboardElement, rowsOfChars)
{
    rowsOfChars.map(rowOfChars => {
        let keyboardRowElement = document.createElement("div");
        keyboardRowElement.classList.add('row');
        keyboardElement.append(keyboardRowElement);
        
        createKeys(keyboardRowElement, rowOfChars);
    });
}

let keyboardElement = document.getElementById("keyboard");
createRows(keyboard, ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"]);