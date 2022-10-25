// Creates an event so when the submit button is pressed, displays info about a determined date
dateForm.addEventListener("submit", function (event) {
    // Prevents the page to refresh after submiting
    event.preventDefault();

    // Selects essential elements of the DOM
    const dateForm = document.querySelector("#dateForm");
    const resultDateNumber = document.querySelector("#resultDateNumber");
    const resultDateString = document.querySelector("#resultDateString");
    // Select the date input from the HTML document and assigns it to a variable
    const dateInput = new Date (dateForm["dateInput"].value);

    const portugueseMonths = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    const portugueseDays = [ "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
    const todayDate = new Date()

    // Main logic
    // Checks if the input is a valid date, and if so, displays info about it
    if (dateInput == "Invalid Date") {
        // Input validation
        resultDateNumber.innerText = "Por favor, insira uma data válida";
        resultDateString.innerText = null
    } else {
        resultDateNumber.innerText = `${dateInput.getDate() + 1}/${dateInput.getMonth() + 1}/${dateInput.getFullYear()} (dd/mm/aaaa)`
        resultDateString.innerText = `${portugueseDays[todayDate.getDay()]}, ${todayDate.getDate() + 1} de ${portugueseMonths[todayDate.getMonth()]} às ${todayDate.getHours()}:${todayDate.getMinutes()}`
    }

    // Clear previous answers
    dateForm["dateInput"].value = null;
});

function batata() {
    console.log(new Date (dateForm["dateInput"].value))
}
