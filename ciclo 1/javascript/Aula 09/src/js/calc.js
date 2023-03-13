const result = document.querySelector("#calcResult");
let firstNumber = "";
let secondNumber = "";

function inputValidation() {
    firstNumber = parseFloat(document.querySelector("#firstNumber").value);
    secondNumber = parseFloat(document.querySelector("#secondNumber").value);
   
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        throw "digite um número válido";
    } 
}

function calc(operation) {
    try {
        inputValidation();
        
        switch (operation) {
            case "soma":
                result.innerHTML = sum(firstNumber, secondNumber);
                break;
            case "subtração":
                result.innerHTML = subtraction(firstNumber, secondNumber);
                break;
            case "multiplicação":
                result.innerHTML = multiplication(firstNumber, secondNumber);
                break;
            case "divisão":
                result.innerHTML = division(firstNumber, secondNumber);
                break;
            case "potenciação":
                result.innerHTML = power(firstNumber, secondNumber);
        }
    } catch (error) {
        result.innerHTML = `Erro: ${error}`;
    }
}

function sum(n1, n2) {
    return n1 + n2;
}
function subtraction(n1, n2) {
    return n1 - n2;
}
function multiplication(n1, n2) {
    return n1 * n2;
}
function division(n1, n2) {
    return n1 / n2;
}
function power(n1, n2) {
    return n1 ** n2;
}
