import { plp } from "../support/SD-02-[PLP]-Select-add-buy-products-on-Saucedemo/SD-02-PLP"
import { cart } from "../support/SD-02-[PLP]-Select-add-buy-products-on-Saucedemo/SD-02-Cart"
import { checkout } from "../support/SD-02-[PLP]-Select-add-buy-products-on-Saucedemo/SD-02-Checkout"
import data from '../fixtures/StaticData.json'
import { itemInformation } from "../support/SD-02-[PLP]-Select-add-buy-products-on-Saucedemo/SD-02-PLP"
const standardUser = data.user1
const password = data.password

describe('SD-02 | Select, add and buy a product on Saucedemo',()=>{
    beforeEach('Login',()=>{
        cy.Login(standardUser, password)
    })
    it('SD-02-PLP | TC1: Validate that the user can add a random number of items to the shopping cart',()=>{
        cy.url().should('equal', data.inventoryLink)
        plp.headerWrapper().then(()=> expect(Cypress.env('title')).equal(data.PLPtitle))
        plp.addRandomItem()
        plp.clickCartButton()
        cy.url().should('equal', data.cartLink )
        cy.wrap(itemInformation).then(()=>{
            cart.myCart(itemInformation.itemName, itemInformation.itemDescription, itemInformation.itemPrice)
        })
    })
    it.only( 'SD-02-PLP | TC2: Validate that the user can buy a random item on the website Saucedemo',()=>{
        plp.addProduct()
        cart.clickCheckoutButton()
        cy.url().should('equal', data.checkoutLink)
        checkout.writeName(data.checkoutName)
        checkout.writeSurname(data.checkoutLastname)
        checkout.writePostalCode(data.checkoutZip)
        checkout.clickContinueButton()
        cy.url().should('equal', data.checkoutLinkStep2)
        
    })
})