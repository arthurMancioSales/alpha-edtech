// Creates an event so when the submit button is pressed, calculates the user BMI
randomNumberForm.addEventListener("submit", function (event) {
    // Prevents the page to refresh after submiting
    event.preventDefault()
    
    // Selects essential elements of the DOM
    const randomNumberForm = document.querySelector("#randomNumberForm");
    const resultNumber = document.querySelector("#resultNumber");
    // Select the max number and min number values from the HTML document and assigns them to a variable
    const minNumberInput = parseInt(randomNumberForm["minNumberInput"].value, 10);
    const maxNumberInput = parseInt(randomNumberForm["maxNumberInput"].value, 10) + 1;

    // Main logic
    // Checks if the inputs are a number, and if so, chooses a random number between the two numbers
    if (isNaN(minNumberInput) || isNaN(maxNumberInput)) {
        // Input validation
        resultNumber.innerText = "Valores não numéricos não são aceitos";
    } else if (maxNumberInput < minNumberInput) {
        // Input validation
        resultNumber.innerText = "O valor máximo não pode ser menor que o valor mínimo";
    } else {
        // Calculates the random number between the range provided
        resultNumber.innerText = `Seu numero sorteado é ${Math.floor((maxNumberInput - minNumberInput) * Math.random()) + minNumberInput}`;
    }

    // Clear previous answers
    randomNumberForm["minNumberInput"].value = null
    randomNumberForm["maxNumberInput"].value = null
});

// Debug function
// Creates an infinite loop until the min number and max number are choosed randomly
function batata(n1, n2, b) {
    let i = 0
    n2 += 1
    while (i != n2 - 1) {
        console.log("checando número máximo")
        i = Math.floor((n2 - n1) * Math.random()) + n1
        console.log(i);   
    }
    while (i != n1) {
        console.log("checando número mínimo")
        i = Math.floor((n2 - n1) * Math.random()) + n1
        console.log(i);   
    }   
}