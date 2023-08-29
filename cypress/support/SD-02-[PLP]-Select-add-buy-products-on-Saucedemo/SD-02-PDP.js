class PDP{
    get={
        itemWrapper:()=> cy.get('[class="inventory_item"]'),
        itemName:()=> cy.get('[class="inventory_details_name large_size"]'),
        itemDescription:()=> cy.get('[class="inventory_details_desc large_size"]'),
        itemPrice:()=> cy.get('[class="inventory_details_price"]'),
    }
}
export const pdp = new PDP()