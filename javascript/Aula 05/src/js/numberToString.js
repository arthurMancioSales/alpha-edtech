// Creates an event so when the submit button is pressed, shows the user's number imput text equivalent 
numberToStringForm.addEventListener("submit", function (event) {
    // Prevents the page to refresh after submiting
    event.preventDefault()
    
    // Selects essential elements of the DOM
    const numberToStringForm = document.querySelector("#numberToStringForm");
    const numberToStringResult = document.querySelector("#numberToStringResult");
    // Select the number input from the HTML document and assigns it to a variable
    const numberInput = parseInt(numberToStringForm["numberInput"].value, 10);

    // Main logic
    // Checks if the input is a number between 0 and 10, and if so, returns the text equivalent
    if (isNaN(numberInput) || (numberInput < 0 || numberInput > 10)) {
        // Input validation
        numberToStringResult.innerText = "Por favor, insira um número válido válido";
    } else {
        // Establishes an unique result for every number input possibility
        switch(numberInput) {
            case 0: numberToStringResult.innerText = "Zero"; break; 
            case 1: numberToStringResult.innerText = "Um"; break; 
            case 2: numberToStringResult.innerText = "Dois"; break; 
            case 3: numberToStringResult.innerText = "Três"; break; 
            case 4: numberToStringResult.innerText = "Quatro"; break; 
            case 5: numberToStringResult.innerText = "Cinco"; break; 
            case 6: numberToStringResult.innerText = "Seis"; break; 
            case 7: numberToStringResult.innerText = "Sete"; break; 
            case 8: numberToStringResult.innerText = "Oito"; break; 
            case 9: numberToStringResult.innerText = "Nove"; break; 
            case 10: numberToStringResult.innerText = "Dez"; 
        }        
    }

    // Clear previous answers
    numberToStringForm["numberInput"].value = null
});
