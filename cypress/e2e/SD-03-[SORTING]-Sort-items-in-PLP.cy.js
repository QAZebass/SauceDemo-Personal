import data from '../fixtures/StaticData.json'
import { plp } from '../support/SD-02-[PLP]-Select-add-buy-products-on-Saucedemo/SD-02-PLP';
const user = data.user1;
const password = data.password;

describe('Sort items in PLP',()=>{
    beforeEach('Login',()=>{
        cy.Login(user, password)
    })
    it('SD-03 | TC1: Validate that the user can sort the item in alphabetically from Z to A with the sort button',()=>{
        plp.sortFromZtoA().then(()=>{
            //Basically here I retrieved two arrays: One unsorted (from the web) and the other one
            //sorted on the website. Then I sorted the first array in my test (from z to a)
            //and then I compared it to the sorted array from the test.
            const sortedInTest = Cypress.env('itemsUnsorted').reverse()
            expect(Cypress.env('itemsSorted')).to.deep.equal(sortedInTest)
        })
    })
    it.only('SD-03 | TC2: Validate that the user can sort the prices from low to high with the sort button', ()=>{
        plp.sortFromLowtoHigh().then(()=>{
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
            const sortedPrices = Cypress.env('pricesUnsorted').sort(comparePrices)
            expect(sortedPrices).to.deep.equal(Cypress.env('pricesSorted'))
        })
    }) 
})