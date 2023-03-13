// Selects the input's forms element
const numbersForm = document.getElementById("numbersForm");

// Initialize result variable
let result = "";

// Creates an event so when the submit button is pressed, executes the operation with the two numbers
numbersForm.addEventListener("submit", function(event){
    // Prevents the page to refresh after submiting
    event.preventDefault()

    // Select every value from the HTML document and assign them to a variable
    const firstNumber = Number(numbersForm["firstNumber"].value);
    const secondNumber = Number(numbersForm["secondNumber"].value);
    const operation = String(numbersForm["operations-selector"].value)

    // Main logic
    // A different operation is executed depending on operation's value
    switch(operation){
        case "Addition":
            result = `${firstNumber} + ${secondNumber} = ${firstNumber + secondNumber}`
            console.log(result)
            break
        case "Subtraction":
            result = `${firstNumber} - ${secondNumber} = ${firstNumber - secondNumber}`
            console.log(result)
            break
        case "Multiplication":
            result = `${firstNumber} * ${secondNumber} = ${firstNumber * secondNumber}`
            console.log(result)
            break
        case "Division":
            result = `${firstNumber} / ${secondNumber} = ${firstNumber / secondNumber}`
            console.log(result)
            break
        case "Exponentiation":
            result = `${firstNumber} elevado a ${secondNumber} = ${firstNumber ** secondNumber}`
            console.log(result)
            break
        case "Remainder":
            result = `O resto da divisão de ${firstNumber} por ${secondNumber} é ${firstNumber % secondNumber}`
            console.log(result)
        
    }
    // Sets the result on the user screen
    document.getElementById("numbersResult").innerText = result;

    // Clear previous answers 
    numbersForm["firstNumber"].value = null;
    numbersForm["secondNumber"].value = null;
})