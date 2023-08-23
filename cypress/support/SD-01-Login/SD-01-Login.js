class Login {
    get={
        loginContainer:()=> cy.get('[id="login_button_container"]'),
        loginForm:()=> cy.get('[data-test="username"]'),
        passForm:()=> cy.get('[data-test="password"]'),
        errorMessageContainer:()=> cy.get('h3'),
        loginButton:()=> cy.get('[data-test="login-button"]')
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
            this.get.errorMessageContainer().then(message=>{
                Cypress.env('message', message.text())
            }).then(()=>{
                return Cypress.env('message')
            })
        })
    }
}
export const login = new Login();