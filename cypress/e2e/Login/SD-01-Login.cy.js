import { login } from "../../support/SD-01-Login/SD-01-Login"

describe('SD-Login Feature',()=>{
    let data;
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
    it.only('SD-02 | Validate the user cant log into the website when invalid credentials are entered',()=>{

        login.writeUserName(data.user2)
        login.writePassword(data.invalidpass)
        login.clickOnLoginButton().then(()=>{
            expect(Cypress.env('message')).equal(data.errorMessage)
        })
        

    })
})