class Cart {
    get={
        cartWrapper:()=> cy.get('[id="contents_wrapper"]'),
        cartHeaderContainer:()=> cy.get('[id="header_container"]'),
        cartTitle:()=> cy.get('[class="title"]'),
        labelDescription:()=> cy.get('[class="cart_desc_label"]'),
        productTitle: ()=> cy.get('[class="inventory_item_name"]'),
        productDescription:()=> cy.get('[class="inventory_item_desc"]'),
        productPrice:()=> cy.get('[class="inventory_item_price"]')
    }
    myCart(productTitle, productDescript, productPrice){
        this.get.cartWrapper().within(()=>{
            this.get.cartTitle().then(title =>{
                expect(title.text()).to.equal('Your Cart')
            })
            this.get.labelDescription().then(desc=>{
                expect(desc.text()).to.equal('Description')
            })
            this.get.productTitle().then(title=>{
                expect(title.text()).to.equal(productTitle)
            })
            this.get.productDescription().then(productDesc=>{
                expect(productDesc.text()).to.equal(productDescript)
            })
            this.get.productPrice().then(price=>{
                expect(price.text()).to.equal(productPrice)
            })
        })
    }
}

export const cart = new Cart()