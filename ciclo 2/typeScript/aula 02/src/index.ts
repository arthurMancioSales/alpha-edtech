class Validator {
    data: string | number | boolean

    constructor(data: any) {
        this.data = data
    }
}

class StringValidator extends Validator {
    constructor(data: any) {
        if (typeof(data) != "string") {
            throw new Error(`o tipo está errado. Tipo esperado: string, tipo obtido: ${typeof(data)}`)
        }
        super(data)
    }
}

class NumberValidator extends Validator {
    constructor(data: any) {
        if (typeof(data) != "number") {
            throw new Error(`o tipo está errado. Tipo esperado: number, tipo obtido: ${typeof(data)}`)
        }
        super(data)
    }
}

class BooleanValidator extends Validator {
    constructor(data: any) {
        if (typeof(data) != "boolean") {
            throw new Error(`o tipo está errado. Tipo esperado: boolean, tipo obtido: ${typeof(data)}`)
        }
        super(data)
    }
}