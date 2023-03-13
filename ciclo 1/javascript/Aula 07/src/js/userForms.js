const userObject = {};
const form = document.querySelector("#userObjectForm");
const letters = /([^a-z | ])/ig

form.addEventListener('input', function(event) {
    
    const birthDateInput = new Date(form[1].value)
    birthDateInput.setHours(birthDateInput.getHours() + 3)

    if (letters.test(form[0].value)) {
        form[0].value = form[0].value.replaceAll(letters, "")
    } else if (birthDateInput > new Date()) {
        form[1].value = ""
    }

})

form.addEventListener("submit", function (event) {
    event.preventDefault();

    document.querySelector("#objectResult").innerText = ""

    const birthDateInput = new Date(form[1].value)
    birthDateInput.setHours(birthDateInput.getHours() + 3)

    for (let i = 0; i < form.length - 1; i++) {
        let objAttribute = form[i].id;

        switch (objAttribute) {
            case "birthDate":
                userObject[`${objAttribute}`] = birthDateInput
                break;
            case "weight":
                userObject[`${objAttribute}`] = parseFloat(form[i].value);
                break;
            case "height":
                userObject[`${objAttribute}`] = parseInt(form[i].value);
                break;
            default: 
                userObject[`${objAttribute}`] = form[i].value;
        }

        document.querySelector("#objectResult").innerText += `${objAttribute}: ${userObject[`${objAttribute}`]}\n`;
    }
    console.log(userObject)
});
