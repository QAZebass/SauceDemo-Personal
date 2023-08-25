import { login } from "../../support/SD-01-Login/SD-01-Login"
let data;
describe('SD-Login Feature',()=>{
    before('Load data',()=>{
        cy.fixture('SD-01-Login/Login-StaticData').then(fixture=>{
            data= fixture
        })
    })
    
    beforeEach('Preconditions',()=>{
        cy.visit('/')
        cy.url().should('contain', 'saucedemo')
    })
    it('SD-01 | Validate the user can Log into the website successfully',()=>{

        login.writeUserName(data.user1)
        login.writePassword(data.password)
        login.clickOnLoginButton()
    })
    it('SD-02 | Validate the user cant log into the website when invalid credentials are entered',()=>{

        login.writeUserName(data.user2)
        login.writePassword(data.invalidpass)
        login.clickOnLoginButton()
        login.getErrorMessage().then(()=>{
            expect(Cypress.env('message')).to.equal(data.errorMessage)
        })
    })
    it('SD-03 | Validate the user can close the error message to attempt another login',()=>{
        login.loginInvalidData(data.user3, data.invalidpass)
        login.closeErrorMessage()
        login.get.loginButton().should('be.enabled')
        })
})
