const resultField = document.querySelector("#objectResult")

function convertObj() {
    const objString = document.querySelector("#objInput").value

    try {
        const result = JSON.parse(objString)
        resultField.innerHTML = "Parsable JSON string!"
        console.log(result)
    } catch (error) {
        resultField.innerHTML = error
    }
}