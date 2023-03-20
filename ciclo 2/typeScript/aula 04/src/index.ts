class Validator {
    data: string | number | boolean;

    constructor(data: any) {
        this.data = data;
    }
}

class StringValidator extends Validator {
    constructor(data: any) {
        if (typeof data != "string") {
            throw new Error(
                `o tipo está errado. Tipo esperado: string, tipo obtido: ${typeof data}`
            );
        }
        super(data);
    }
}

class NumberValidator extends Validator {
    constructor(data: any) {
        if (typeof data != "number") {
            throw new Error(
                `o tipo está errado. Tipo esperado: number, tipo obtido: ${typeof data}`
            );
        }
        super(data);
    }
}

class BooleanValidator extends Validator {
    constructor(data: any) {
        if (typeof data != "boolean") {
            throw new Error(
                `o tipo está errado. Tipo esperado: boolean, tipo obtido: ${typeof data}`
            );
        }
        super(data);
    }
}

class RegexValidator extends StringValidator {
    constructor(data: any) {
        super(data);
        
        if (!this.regex.test(data)) {
            throw new Error("O formato está errado");
        }
    }

    get regex() {
        return new RegExp("")
    }
}

class EmailInput extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const input = document.createElement("input");
        input.type = "text";
        input.onchange = () => new EmailValidator(input.value);

        shadow.append(input);
    }
}

customElements.define("email-input", EmailInput)

class EmailValidator extends RegexValidator {
    constructor(data: any) {
        super(data)
    }

    get regex() {
        return new RegExp(/^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim)
    }
}

class PasswordValidator extends RegexValidator {
    constructor(data: any) {
        super(data)
    }

    get regex() {
        return new RegExp(/^\w{1,}$/gim)
    }
}

class NameValidator extends RegexValidator {
    constructor(data: any) {
        super(data)
    }

    get regex() {
        return new RegExp(/^([a-z]{1,})([ ]{1}[a-z]{1,} ){0,}$/gim)
    }
}
