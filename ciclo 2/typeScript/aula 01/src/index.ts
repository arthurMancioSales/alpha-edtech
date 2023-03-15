class Validator {
    data: string | number

    constructor(data: string | number) {
        this.data = data
    }
}

const exemple:Validator = new Validator("teste")

console.log(exemple.data);
