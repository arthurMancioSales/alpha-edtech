const userObject = {};
const form = document.querySelector("#userObjectForm");
const letters = /([^a-z | ])/gi;



form.addEventListener("submit", function (event) {
    event.preventDefault();

    document.querySelector("#objectResult").innerText = "";

    const birthDateInput = new Date(form["birthDate"].value);
    birthDateInput.setHours(birthDateInput.getHours() + 3);

    try {
        //input validation
        if (letters.test(form["name"].value) || form["name"].value.length < 5) throw "name is invalid!";
        if (birthDateInput > new Date()) throw "birthDate is invalid!";
        if (isNaN(form["weight"].value)) throw "weight is invalid!";
        if (isNaN(form["height"].value)) throw "height is invalid!";

        // object definition
        for (let i = 0; i < form.length - 1; i++) {
            let objAttribute = form[i].id;

            switch (objAttribute) {
                case "birthDate":
                    userObject[`${objAttribute}`] = birthDateInput;
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
        document.querySelector("#objectResult").innerText += `\n Objeto json: \n ${JSON.stringify(userObject)}`;
    } catch (error) {
        document.querySelector("#objectResult").innerText = error;
    }
    console.log(userObject);
});
