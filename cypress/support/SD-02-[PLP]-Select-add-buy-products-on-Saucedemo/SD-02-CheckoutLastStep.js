class CheckoutLastStep{
    get={
        checkoutTitle:()=> cy.get('[class="title"]'),
        thanksSign:()=> cy.get('[class="complete-header"]'),
        orderDispatched:()=> cy.get('[class="complete-text"]'),
        backHomeButton:()=> cy.get('[data-test="back-to-products"]')
    }
    clickBackToHome(){
        this.get.backHomeButton().click()
    }
}
export const checkoutlaststep = new CheckoutLastStep()