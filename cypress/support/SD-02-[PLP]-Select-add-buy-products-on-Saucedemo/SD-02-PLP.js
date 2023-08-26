export let itemInformation={}
class PLP {
    get={
        itemWrapper:()=> cy.get('[class="inventory_item"]'),
        itemName:()=> cy.get('[class="inventory_item_name"]'),
        itemDescription:()=> cy.get('[class="inventory_item_desc"]'),
        itemPrice:()=> cy.get('[class="inventory_item_price"]'),
        addtoCartButton:()=> cy.get('[data-test*="-sauce-"]'),
        headerWrapper:()=> cy.get('[id="header_container"]'),
        shoppingCartButton:()=> cy.get('[id="shopping_cart_container"]'),
        headerTitle:()=> cy.get('[class="title"]')
    }
    headerWrapper(){
        return this.get.headerTitle().then(title=> {
            return Cypress.env('title', title.text())
        })
    }
    addRandomItem(){
        this.get.itemWrapper().then(items=>{
            const randomNumber = Cypress._.random(0, items.length -1)
            this.get.itemWrapper()
            .eq(randomNumber)
            .within(()=>{
                this.get.itemName().then(name=> {
                    Cypress.env('productName', name.text())
                    itemInformation.itemName = Cypress.env('productName')
                })
                this.get.itemDescription().then(name =>{
                    Cypress.env('productDesc', name.text())
                    itemInformation.itemDescription = Cypress.env('productDesc')
                })
                this.get.itemPrice().then(price =>{
                    Cypress.env('itemPrice', price.text())
                    itemInformation.itemPrice = Cypress.env('itemPrice')
                })
                this.get.addtoCartButton().should('have.text', 'Add to cart').click()
                this.get.addtoCartButton().should('have.text', 'Remove')
                
            })
        })
    }
    clickCartButton(){
        this.get.headerWrapper().within(()=>{
            this.get.shoppingCartButton().click()
        })
    }
}
export const plp = new PLP()