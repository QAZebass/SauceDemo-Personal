import { plp } from "../support/SD-02-PLP/SD-02-PLP"
import data from '../fixtures/StaticData.json'
const standardUser = data.user1
const password = data.password

describe('SD-02 | Select, add and buy a product on Saucedemo',()=>{
    before('Login',()=>{
        cy.Login(standardUser, password)
    })
    it('SD-02-PLP | TC1: Validate that the user can add a random number of items to the shopping cart',()=>{
        plp.headerWrapper().then(()=> expect(Cypress.env('title')).equal(data.PLPtitle))
        plp.addRandomItem()
        plp.clickCartButton()
    })
})