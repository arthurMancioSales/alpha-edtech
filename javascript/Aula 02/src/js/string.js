// Selects the input's forms element
const stringForm = document.getElementById("stringForm");

// Initialize result variable
let result = "";

// Function that finds the biggest phrase between two options
function biggerPhrase() {

    // Select both values from the HTML document and assign them to a variable
    const firstString = stringForm["firstString"].value;
    const secondString = stringForm["secondString"].value;

    // Main logic
    // Checks if both fields were answered, then finds the biggest phrase
    if (typeof firstString == "string" && typeof secondString == "string") {
        if (firstString > secondString) {
            let difference = firstString.length - secondString.length
            result = `A frase ${firstString} é ${difference} caractere(s) maior que a frase ${secondString}`;
        } else if (secondString > firstString) {
            let difference = secondString.length - firstString.length
            result = `A frase ${firstString} é ${difference} caractere(s) menor que a frase ${secondString}`;
        } else {
            result = `A frase ${firstString} é igual a a frase ${secondString}`;
        }
    } 
    // Returns an error message if one of the fields were empty
    else {
        document.getElementById("numbersResult").innerText =
            "Por favor, insira duas frases";
    }

    // Sets the result on the user screen
    document.getElementById("stringResult").innerText = result;

    // Clear previous answers 
    stringForm["firstString"].value = null;
    stringForm["secondString"].value = null;
}
