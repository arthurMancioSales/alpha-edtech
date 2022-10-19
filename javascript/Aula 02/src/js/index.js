// Selects the input's forms element
const numbersForm = document.getElementById("numbersForm");

// Initialize result variable
let result = "";

// Function that finds the biggest number between two options
function biggerNumber() {

    // Select both values from the HTML document and assign them to a variable
    const firstNumber = numbersForm["firstNumber"].valueAsNumber;
    const secondNumber = numbersForm["secondNumber"].valueAsNumber;

    // Main logic
    // Checks if both fields were answered, then finds the biggest number
    if (typeof firstNumber === "number" && typeof secondNumber === "number") {
        if (firstNumber > secondNumber) {
            result = `${firstNumber} é maior que ${secondNumber}`;
        } else if (secondNumber > firstNumber) {
            result = `${firstNumber} é menor que ${secondNumber}`;
        } else {
            result = `${firstNumber} é igual a ${secondNumber}`;
        }
    } 
    // Returns an error message if one of the fields were empty
    else {
        document.getElementById("numbersResult").innerText =
            "Por favor, insira dois números";
    }

    // Sets the result on the user screen
    document.getElementById("numbersResult").innerText = result;

    // Clear previous answers 
    numbersForm["firstNumber"].value = null;
    numbersForm["secondNumber"].value = null;
}
