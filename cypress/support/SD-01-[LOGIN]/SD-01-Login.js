class Login {
    get={
        loginContainer:()=> cy.get('[id="login_button_container"]'),
        loginForm:()=> cy.get('[data-test="username"]'),
        passForm:()=> cy.get('[data-test="password"]'),
        errorMessageContainer:()=> cy.get('h3'),
        loginButton:()=> cy.get('[data-test="login-button"]'),
        closeErrorButton:()=> cy.get('button')
    }

    writeUserName(username){
        this.get.loginContainer().within(()=>{
            this.get.loginForm().invoke('attr', 'placeholder').should('equal', 'Username')
            this.get.loginForm().type(username)
        })
    }
    writePassword(pass){
        this.get.loginContainer().within(()=>{
            this.get.passForm().invoke('attr', 'placeholder').should('equal', 'Password')
            this.get.passForm().type(pass)
        })
        
    }
    clickOnLoginButton(){
            return this.get.loginContainer().within(()=>{
            this.get.loginButton().should('have.value', 'Login')
            this.get.loginButton().click()
            })
    }
    getErrorMessage(){
        return this.get.errorMessageContainer().then(message=>{
            return Cypress.env('message', message.text())
        })
    }
    loginInvalidData( user, invalidpass){
        this.get.loginContainer().within(()=>{
        this.get.loginForm().type(user)
        this.get.passForm().type(invalidpass)
        this.get.loginButton().click()
        })
    }
    closeErrorMessage(){
        this.get.loginContainer().within(()=>{
            this.get.closeErrorButton().click()
        })
    }
}
export const login = new Login();