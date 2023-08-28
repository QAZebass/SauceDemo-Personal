export let itemInformation={}
class PLP {
    get={
        itemWrapper:()=> cy.get('[class="inventory_item"]'),
        itemName:()=> cy.get('[class="inventory_item_name"]'),
        itemDescription:()=> cy.get('[class="inventory_item_desc"]'),
        itemPrice:()=> cy.get('[class="inventory_item_price"]'),
        addtoCartButton:()=> cy.get('[class$="btn_small btn_inventory"]'),
        headerWrapper:()=> cy.get('[id="header_container"]'),
        shoppingCartButton:()=> cy.get('[id="shopping_cart_container"]'),
        headerTitle:()=> cy.get('[class="title"]')
    }
    headerWrapper(){
        return this.get.headerTitle().then(title=> {
            return Cypress.env('title', title.text())
        })
    }
    taxCalculator(itemPrice){
        const tax_amount = (8.00 / 100) * itemPrice
        itemInformation.priceTax = Cypress.env('priceTax', tax_amount.toFixed(2))
        cy.log(Cypress.env('priceTax'))
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
                    let itemPrice;
                    itemPrice= price.text().replace(/\$/g, '')
                    itemInformation.itemPrice = Cypress.env('itemPrice', itemPrice )
                })
                this.get.addtoCartButton().should('have.text', 'Add to cart').click()
                this.get.addtoCartButton().should('have.text', 'Remove')
            })
        }).then(()=>{
            this.taxCalculator(Cypress.env('itemPrice'))
            const tax= Number(Cypress.env('priceTax'))
            const itemPrice = Number(Cypress.env('itemPrice'))
            itemInformation.total = tax + itemPrice
        })
    }
    clickCartButton(){
        this.get.headerWrapper().within(()=>{
            this.get.shoppingCartButton().click()
        })
    }
    addProduct(){
        this.addRandomItem()
        this.clickCartButton()
    }
}
export const plp = new PLP()