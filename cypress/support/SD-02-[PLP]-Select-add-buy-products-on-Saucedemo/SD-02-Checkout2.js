class Checkout2 {
    get={
        checkout2Title:()=> cy.get('[class="title"]'),
        productTitle: ()=> cy.get('[class="inventory_item_name"]'),
        productDescription:()=> cy.get('[class="inventory_item_desc"]'),
        productPrice:()=> cy.get('[class="inventory_item_price"]'),
        paymentInfoLabel:()=> cy.get('[summary_info_label]').contains('Payment Information'),
        creditCardLabel:()=> cy.get('[summary_value_label]').contains('SauceCard #31337'),
        shippingInfoLabel:()=> cy.get('[class="inventory_item_price"]').contains('Shipping Information'),
        deliveryLabel:()=> cy.get('[class="summary_value_label"]').contains('Free Pony Express Delivery!'),
        totalPriceLabel:()=> cy.get('[class="summary_info_label"]').contains('Price Total'),
        subTotal:()=> cy.get('[class="summary_subtotal_label"]'),
        taxLabel:()=> cy.get('[class="summary_tax_label"]'),
        totalLabel:()=> cy.get('[class="summary_info_label summary_total_label"]')
    }

}
export const checkout2 = new Checkout2()