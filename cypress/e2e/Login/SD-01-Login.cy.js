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
})