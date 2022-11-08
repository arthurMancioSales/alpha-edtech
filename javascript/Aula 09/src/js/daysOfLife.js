const result = document.querySelector("#daysResult");

const person = {
    birthDate: "",
    gender: "",
    age: 0,
    daysToDeath: function () {
        if (this.gender == "male") {
            const daysLeft = Math.floor((73.1 * 365 * 24 * 60 * 60 * 1000 - this.age) /1000 /60 /60 /24);
            
            if (daysLeft > 0) {
                return `Oba! Você ainda tem ${daysLeft} dias de vida. Aproveite com sabedoria!`;
            } else {
                return `Que pena, você morreu há ${daysLeft*-1} dias. Espero que tenha tido uma vida feliz!`;
            };
        } else {
            const daysLeft = Math.floor((80.1 * 365 * 24 * 60 * 60 * 1000 - this.age) /1000 /60 /60 /24);

            if (daysLeft > 0) {
                return `Oba! Você ainda tem ${daysLeft} dias de vida. Aproveite com sabedoria!`;
            } else {
                return `Que pena, você morreu há ${daysLeft*-1} dias. Espero que tenha tido uma vida feliz!`;
            };
        };
    },
};

function verifyDays() {
    try {
        createPerson();
        result.innerHTML = person.daysToDeath();
    } catch (error) {
        result.innerHTML = error;
    };
};

function createPerson() {
    const day = document.querySelector("#day").value;
    const month = document.querySelector("#month").value - 1;
    const year = document.querySelector("#year").value;
    const gender = document.querySelector("#gender").value;

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        throw "Digite uma data válida";
    } else if (day < 0 || month < 0 || year < 0) {
        throw "Digite uma data válida";
    } else if (gender == "") {
        throw "Escolha um gênero";
    } else {
        person.birthDate = new Date(year, month, day);
        console.log(person.birthDate)
        person.gender = gender;
        person.age = new Date().getTime() - person.birthDate.getTime();
    };
};
