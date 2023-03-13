// Selects the input's forms element
const numbersForm = document.getElementById("numbersForm");

// Initialize result variable
let result = "";

// Function that finds the biggest number between two options
function biggerNumber() {

    // Select both values from the HTML document and assign them to a variable
    const firstNumber = Number(numbersForm["firstNumber"].value);
    const secondNumber = Number(numbersForm["secondNumber"].value);

    // Main logic
    // Makes multiple comparisons to find the biggest number
    if (firstNumber > secondNumber) {
        result = `${firstNumber} é maior que ${secondNumber}`;
    } else if (secondNumber > firstNumber) {
        result = `${firstNumber} é menor que ${secondNumber}`;
    } else {
        result = `${firstNumber} é igual a ${secondNumber}`;
    }

    // Sets the result on the user screen
    document.getElementById("numbersResult").innerText = result;

    // Clear previous answers 
    numbersForm["firstNumber"].value = null;
    numbersForm["secondNumber"].value = null;
}
