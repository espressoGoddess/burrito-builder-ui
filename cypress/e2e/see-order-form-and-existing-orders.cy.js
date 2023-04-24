//as a user, on page load, i should see a form to create an order and already existing orders

describe('as a user, on page load, i should see a form to create an order and already existing orders', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'ordersBeforePost'
    })
    cy.visit('http://localhost:3000/')
  });

  it('should see an order form', () => {
    cy.get('input')
    cy.get('[name="steak"]')
    cy.get('[name="lettuce"]')
    cy.get('[name="cilantro"]')
    cy.get('button')
      .contains('Submit Order')
      cy.get('p').contains('Order: Nothing selected')
  });

  it('should see existing orders', () => {
    cy.get('.Orders').children().should('have.length', 3)
      cy.get('.Orders').contains('Pat')
      cy.get('.Orders').contains('beans')
      cy.get('.Orders').contains('bacon')
      cy.get('.Orders').contains('sugar')
      cy.get('.Orders').contains('mayo')

      cy.get('.Orders').contains('Sam')
      cy.get('.Orders').contains('beef')
      cy.get('.Orders').contains('cilantro')
      cy.get('.Orders').contains('donuts')
      cy.get('.Orders').contains('avocado')

      cy.get('.Orders').contains('Alex')
      cy.get('.Orders').contains('curried chicken')
      cy.get('.Orders').contains('oranges')
      cy.get('.Orders').contains('salt')
  });
});