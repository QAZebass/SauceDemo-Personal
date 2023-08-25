let itemInformation={}
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
                    itemInformation.itemName = name.text()
                })
                this.get.itemDescription().then(name =>{
                    itemInformation.itemDescription = name.text()
                })
                this.get.itemPrice().then(price =>{
                    itemInformation.itemPrice = price.text()
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