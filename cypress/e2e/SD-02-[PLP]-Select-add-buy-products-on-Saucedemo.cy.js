import { plp } from "../support/SD-02-[PLP]-Select-add-buy-products-on-Saucedemo/SD-02-PLP"
import { pdp } from "../support/SD-02-[PLP]-Select-add-buy-products-on-Saucedemo/SD-02-PDP"
import { cart } from "../support/SD-02-[PLP]-Select-add-buy-products-on-Saucedemo/SD-02-Cart"
import { checkout } from "../support/SD-02-[PLP]-Select-add-buy-products-on-Saucedemo/SD-02-Checkout"
import { checkoutsteptwo } from "../support/SD-02-[PLP]-Select-add-buy-products-on-Saucedemo/SD-02-CheckoutStepTwo"
import { checkoutlaststep } from "../support/SD-02-[PLP]-Select-add-buy-products-on-Saucedemo/SD-02-CheckoutLastStep"
import data from '../fixtures/StaticData.json'
import { itemInformation } from "../support/SD-02-[PLP]-Select-add-buy-products-on-Saucedemo/SD-02-PLP"
const standardUser = data.user1
const password = data.password
const name = data.checkoutName
const lastName = data.checkoutLastname
const zipCode = data.checkoutZip

describe('SD-02 | Select, add and buy a product on Saucedemo',()=>{
    beforeEach('Login',()=>{
        cy.Login(standardUser, password)

    })
    it('SD-02| TC1: Validate that the user can add a random number of items to the shopping cart',()=>{
        cy.url().should('equal', data.inventoryLink)
        plp.headerWrapper().then(()=> expect(Cypress.env('title')).equal(data.PLPtitle))
        plp.addRandomItem()
        plp.clickCartButton()
        cy.url().should('equal', data.cartLink )
        cy.wrap(itemInformation).then(()=>{
            cart.get.cartTitle().then(title =>{expect(title.text()).to.equal(data.cartTitle)})
        cart.get.labelDescription().then(desc=>{expect(desc.text()).to.equal(data.cartDescription)})
        cart.get.productTitle().then(title=>{expect(title.text()).to.equal(itemInformation.itemName)})
        cart.get.productDescription().then(productDesc=>{expect(productDesc.text()).to.equal(itemInformation.itemDescription)})
        cart.get.productPrice().then(price=>{expect(price.text()).to.equal(`$${itemInformation.itemPrice}`)})
        })
    })
    it('SD-02| TC2: Validate that the user can see the details of a product in the PDP by clicking on the product title',()=>{
        plp.chooseRandomItem()
        cy.wrap(itemInformation).then(()=>{
            pdp.get.itemName().then(itemName =>{
                expect(itemName.text()).equal(itemInformation.itemName)
            })
            pdp.get.itemDescription().then(desc =>{
                expect(desc.text()).equal(itemInformation.itemDescription)
            })
            pdp.get.itemPrice().then(price =>{
                expect(price.text()).equal(`$${itemInformation.itemPrice}`)
            })
        })
    })
    it( 'SD-02| TC3: Validate that the user can buy a random item on the website Saucedemo',()=>{
        
        plp.addProduct()
        cart.clickCheckoutButton()
        cy.url().should('equal', data.checkoutLink)
        checkout.writeName(name)
        checkout.writeSurname(lastName)
        checkout.writePostalCode(zipCode)
        checkout.clickContinueButton()
        cy.url().should('equal', data.checkoutLinkStep2)
        cy.wrap(itemInformation).then(()=>{
            checkoutsteptwo.get.checkout2Title().then(header=> expect(header.text()).equal(data.checkoutStep2Title))
            checkoutsteptwo.get.productTitle().then(title => expect(title.text()).equal(itemInformation.itemName))
            checkoutsteptwo.get.productDescription().then(desc => expect(desc.text()).equal(itemInformation.itemDescription))
            checkoutsteptwo.get.productPrice().then(price => expect(price.text()).equal(`$${itemInformation.itemPrice}`))
            checkoutsteptwo.get.subTotal().then(subtotal=> expect(subtotal.text()).equal(`Item total: $${itemInformation.itemPrice}`))
            checkoutsteptwo.get.taxLabel().then(tax=> expect(tax.text()).equal(`Tax: $${itemInformation.priceTax}`))
            checkoutsteptwo.get.totalLabel().then(total => expect(total.text()).equal(`Total: $${itemInformation.total}`))
        })
        checkoutsteptwo.clickFinishButton()
        cy.url().should('equal', data.checkoutCompleteLink)
        checkoutlaststep.get.checkoutTitle().then(title=> expect(title.text()).equal(data.checkoutLastStepTitle))
        checkoutlaststep.get.thanksSign().then(sign => expect(sign.text()).equal(data.checkoutLastStepThanks))
        checkoutlaststep.get.orderDispatched().then(sign => expect(sign.text()).equal(data.checkoutLastStepDispatched))
        checkoutlaststep.get.backHomeButton().should('have.text', data.backHomeButton)
        checkoutlaststep.clickBackToHome()
        cy.url().should('equal', 'https://www.saucedemo.com/inventory.html')
    })
    it('SD-02| TC4 :Validate that the user can cancel the purchase of a product on the Checkout: Overview',()=>{
        plp.addProduct()
        cart.clickCheckoutButton()
        checkout.fillPersonalInformation(name, lastName, zipCode)
        checkoutsteptwo.get.cancelButton().should('have.text', data.checkoutStep2CancelButton)
        checkoutsteptwo.clickCancelButton()
        plp.get.headerTitle().should('have.text', data.PLPtitle )
        cy.url().should('equal', data.inventoryLink)
    })

})
