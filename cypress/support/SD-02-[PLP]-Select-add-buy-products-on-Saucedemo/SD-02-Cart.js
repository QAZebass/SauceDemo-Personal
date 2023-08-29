class Cart {
    get={
        cartWrapper:()=> cy.get('[id="contents_wrapper"]'),
        cartHeaderContainer:()=> cy.get('[id="header_container"]'),
        cartTitle:()=> cy.get('[class="title"]'),
        labelDescription:()=> cy.get('[class="cart_desc_label"]'),
        productTitle: ()=> cy.get('[class="inventory_item_name"]'),
        productDescription:()=> cy.get('[class="inventory_item_desc"]'),
        productPrice:()=> cy.get('[class="inventory_item_price"]'),
        checkoutButton:()=> cy.get('[data-test="checkout"]')
    }
    clickCheckoutButton(){
        this.get.checkoutButton().should('have.text', 'Checkout').click()
    }
}

export const cart = new Cart()