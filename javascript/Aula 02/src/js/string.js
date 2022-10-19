// Selects the input's forms element
const stringForm = document.getElementById("stringForm");

// Initialize result variable
let result = "";

// Function that finds the biggest phrase between two options
function biggerPhrase() {

    // Select both values from the HTML document and assign them to a variable
    const firstString = stringForm["firstString"].value;
    const firstStringLength = firstString.length
    const secondString = stringForm["secondString"].value;
    const secondStringLength = secondString.length


    // Main logic
    // Makes multiple comparisons to find the biggest phrase
    if (firstStringLength > secondStringLength) {
        let difference = firstStringLength - secondStringLength
        result = `A frase ${firstString} é ${difference} caractere(s) maior que a frase ${secondString}`;
    } else if (secondStringLength > firstStringLength) {
        let difference = secondStringLength - firstStringLength
        result = `A frase ${firstString} é ${difference} caractere(s) menor que a frase ${secondString}`;
    } else {
        result = `A frase ${firstString} tem o mesmo tamanho que a a frase ${secondString}`;
    }

    // Sets the result on the user screen
    document.getElementById("stringResult").innerText = result;

    // Clear previous answers 
    stringForm["firstString"].value = null;
    stringForm["secondString"].value = null;
}
