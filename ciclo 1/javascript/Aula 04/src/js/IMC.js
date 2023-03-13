// Creates an event so when the submit button is pressed, calculates the user BMI
imcForm.addEventListener("submit", function (event) {
    // Prevents the page to refresh after submiting
    event.preventDefault()
    
    // Selects essential elements of the DOM
    const imcForm = document.querySelector("#imcForm");
    const imcResult = document.querySelector("#imcResult");
    const imcTable = document.querySelector("#imcTable");
    // Select the mass and height values from the HTML document and assigns it to a variable
    const massInput = parseInt(imcForm["massInput"].value, 10);
    const heightInput = parseInt(imcForm["heightInput"].value, 10) / 100;

    // Main logic
    // Checks if the input is a number, and if so, calculates the user BMI
    if (isNaN(massInput) || isNaN(heightInput)) {
        // Input validation
        imcResult.innerText = "Por favor, insira um valor válido";
    } else {
        // Calculates the user BMI and displays it on the user screen
        const imcValue = (massInput / (heightInput * heightInput)).toFixed(2);
        imcResult.innerText = `Seu IMC é de ${imcValue} kg/m²`;

        if (imcValue < 18.5) {
            // Displays the user's BMI classification on the user screen
            imcTable.innerText = "Você está abaixo do peso ideal";
        } else if (imcValue >= 18.5 && imcValue <= 24.9) {
            // Displays the user's BMI classification on the user screen
            imcTable.innerText = "Você está com o peso ideal";
        } else if (imcValue >= 25 && imcValue <= 29.9) {
            // Displays the user's BMI classification on the user screen
            imcTable.innerText = "Você está com sobrepeso";
        } else {
            // Displays the user's BMI classification on the user screen
            imcTable.innerText = "Você está com obesidade";
        }
    }

    // Clear previous answers
    imcForm["massInput"].value = null
    imcForm["heightInput"].value = null
});
