import { login } from '../support/SD-01-[LOGIN]/SD-01-Login'
import  data  from '../fixtures/StaticData.json'
const username = data.user1;
const password = data.password;
const invalidPass = data.invalidpass
const errorMessage = data.errorMessage;
describe('SD-Login Feature',()=>{

    beforeEach('Preconditions',()=>{
        cy.visit('/')
        cy.url().should('contain', 'saucedemo')
    })
    it('SD-Login |TC1:  Validate the user can Log into the website successfully',()=>{

        login.writeUserName(username)
        login.writePassword(password)
        login.clickOnLoginButton()
    })
    it('SD-Login | TC2: Validate the user cant log into the website when invalid credentials are entered',()=>{

        login.writeUserName(username)
        login.writePassword(invalidPass)
        login.clickOnLoginButton()
        login.getErrorMessage().then(()=>{
            expect(Cypress.env('message')).to.equal(errorMessage)
        })
    })
    it('SD-Login | TC3: Validate the user can close the error message to attempt another login',()=>{
        login.loginInvalidData(username, invalidPass)
        login.closeErrorMessage()
        login.get.loginButton().should('be.enabled')
        })
})
