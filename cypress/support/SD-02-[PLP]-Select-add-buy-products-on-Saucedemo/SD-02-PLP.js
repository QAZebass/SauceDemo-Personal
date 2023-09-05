export let itemInformation={}
let itemsSortedA_Z=[], itemsSortedZ_A=[];
let pricesUnsorted=[], pricesSorted=[];
class PLP {
    get={
        itemWrapper:()=> cy.get('[class="inventory_item"]'),
        itemName:()=> cy.get('[class="inventory_item_name"]'),
        itemDescription:()=> cy.get('[class="inventory_item_desc"]'),
        itemPrice:()=> cy.get('[class="inventory_item_price"]'),
        addtoCartButton:()=> cy.get('[class$="btn_small btn_inventory"]'),
        headerWrapper:()=> cy.get('[id="header_container"]'),
        shoppingCartButton:()=> cy.get('[id="shopping_cart_container"]'),
        headerTitle:()=> cy.get('[class="title"]'),
        sortingDropdown:()=> cy.get('[data-test="product_sort_container"]')
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
            itemInformation.total = (tax + itemPrice).toFixed(2)
        })
    }
    chooseRandomItem(){
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
                this.get.itemName().click()
            })
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
    sortFromZtoA(){
        return this.get.itemName().each(items =>{
            itemsSortedA_Z.push(items.text())    
        }).then(()=>{
            
            this.get.sortingDropdown().select('za')
            this.get.itemName().each(items =>{
                itemsSortedZ_A.push(items.text())
                return Cypress.env('itemsUnsorted', itemsSortedA_Z), Cypress.env('itemsSorted', itemsSortedZ_A)
        })
        })
    }
    sortFromLowtoHigh(){
        return this.get.itemPrice().each(price=>{
            pricesUnsorted.push(price.text())
        }).then(()=>{
            this.get.sortingDropdown().select('lohi')
            this.get.itemPrice().each(price =>{
                pricesSorted.push(price.text())
                //function to compare from low to high
            function comparePrices(priceA, priceB) {
                const valueA = parseFloat(priceA.slice(1))
                const valueB = parseFloat(priceB.slice(1))
              
                if (valueA < valueB) {
                  return -1
                }
                if (valueA > valueB) {
                  return 1
                }
                return 0
              }
            const sortedPrices = pricesUnsorted.sort(comparePrices)
                return Cypress.env('pricesSortedInTest', sortedPrices), Cypress.env('pricesSorted', pricesSorted)
            })
        })
    }
    sortFromHightoLow(){
        return this.get.itemPrice().each(price =>{
            pricesUnsorted.push(price.text())
        }).then(()=>{
            this.get.sortingDropdown().select('hilo')
            this.get.itemPrice().each(price =>{
                pricesSorted.push(price.text())
                function comparePricesHightoLow(priceA, priceB){
                    const valueA = parseInt(priceA.slice(1))
                    const valueB = parseInt(priceB.slice(1))

                    if( valueA < valueB){
                        return 1
                    }
                    if (valueA > valueB){
                        return -1
                    }
                    return 0
                }
                pricesUnsorted.sort(comparePricesHightoLow)
        }).then(()=>{
            return Cypress.env('sortedInTest', pricesUnsorted), Cypress.env('pricesSorted', pricesSorted)
        })
    })
    }
}
export const plp = new PLP()