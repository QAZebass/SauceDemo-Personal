describe('SD-Login Feature',()=>{
    it('01 | Login',()=>{
        cy.visit('/')
        cy.url().should('contain', 'saucedemo')
    })
})