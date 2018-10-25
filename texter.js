var totalString = "";
var currentString = "";
var elem;

function Texter(elemId, string)
{
    elem = document.querySelector("#" + elemId)
    elem.innerHTML = ''
    totalString = string;

    UpdateTexter()

}

function UpdateTexter()
{
    console.log("update")
    if (currentString.length < totalString.length) 
    {
        currentString += totalString[currentString.length]
        elem.innerHTML = currentString

        window.setTimeout(() => UpdateTexter(), 50);
    }
}