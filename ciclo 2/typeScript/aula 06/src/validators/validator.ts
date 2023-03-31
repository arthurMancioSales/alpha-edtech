class Validator {
    public valid: boolean = false
    public status: string

    constructor() {
        this.status = "Invalid user"
    }

    protected check(info: string, regex: RegExp) {
        if (regex.test(info)) {
            this.valid = true
            this.status = "Valid user"
            return
        }
        this.valid = false
        this.status = "Invalid user"
    }
}

export class UserValidator extends Validator {
    constructor(name: string, email:string, password:string) {
        super()
        this.validateName(name)
        this.validateEmail(email)
        this.validatePassword(password)
    }

    private validateName(name: string) {
        const regex = /^[a-z]{1,}$/gim
        this.check(name, regex)
    }

    private validateEmail(email: string) {
        const regex = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim 
        
        if (this.valid) {
            this.check(email, regex)
        }
    }

    private validatePassword(password: string) {
        const regex = /^\w{1,}$/gim

        if (this.valid) {
            this.check(password, regex)
        }
    }
}