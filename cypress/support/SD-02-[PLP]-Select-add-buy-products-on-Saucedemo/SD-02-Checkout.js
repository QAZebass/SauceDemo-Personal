class Checkout{
    get ={
        checkoutTitle:()=> cy.get('[class="title"]'),
        nameForm:()=> cy.get('[data-test="firstName"]'),
        lastNameForm:()=> cy.get('[data-test="lastName"]'),
        zipForm:()=> cy.get('[data-test="postalCode"]'),
        continueButton:()=> cy.get('[data-test="continue"]')
    }
    writeName(name){
        this.get.checkoutTitle().should('have.text', 'Checkout: Your Information')
        this.get.nameForm().invoke('attr', 'placeholder').should('equal', 'First Name')
        this.get.nameForm().type(name)
    }
    writeSurname(surname){
        this.get.lastNameForm().invoke('attr', 'placeholder').should('equal', 'Last Name')
        this.get.lastNameForm().type(surname)
    }
    writePostalCode(zipcode){
        this.get.zipForm().invoke('attr', 'placeholder').should('equal', 'Zip/Postal Code')
        this.get.zipForm().type(zipcode)
    }
    clickContinueButton(){
        this.get.continueButton().should('have.value', 'Continue').click()
    }
    fillPersonalInformation(name, surname, zipcode){
        this.writeName(name)
        this.writeSurname(surname)
        this.writePostalCode(zipcode)
        this.clickContinueButton()
    }
}
export const checkout = new Checkout()