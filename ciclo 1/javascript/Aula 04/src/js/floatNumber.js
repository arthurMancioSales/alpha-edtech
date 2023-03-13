// Creates an event so when the submit button is pressed, truncates the float number
floatNumberForm.addEventListener("submit", function (event) {
    // Prevents the page to refresh after submiting
    event.preventDefault();

    // Selects essential elements of the DOM
    const floatNumberForm = document.querySelector("#floatNumberForm");
    const resultHighestNumber = document.querySelector("#resultHighestNumber");
    const resultLowestNumber = document.querySelector("#resultLowestNumber");
    // Select the float value from the HTML document and assigns it to a variable
    const floatNumberInput = Number(floatNumberForm["floatNumberInput"].value);

    // Main logic
    // Checks if the input is a float number, and if so, truncates it
    if (isNaN(floatNumberInput) || Number.isInteger(floatNumberInput)) {
        // Input validation
        resultHighestNumber.innerText = "Por favor, insira um número quebrado";
    } else {
        // Displays the result on the user screen
        resultHighestNumber.innerText = `O menor número inteiro maior que ${floatNumberInput} é ${Math.ceil(
            floatNumberInput
        )}`;
        resultLowestNumber.innerText = `O maior número inteiro menor que ${floatNumberInput} é ${Math.floor(
            floatNumberInput
        )}`;
    }

    // Clear previous answers
    floatNumberForm["floatNumberInput"].value = null;
});
