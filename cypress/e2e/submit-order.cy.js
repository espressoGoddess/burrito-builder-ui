//as a user, i should be able to submit an order and then see the updated orders

describe('should be able to submit an order and then see the updated orders', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'ordersBeforePost'
    })
    cy.visit('http://localhost:3000/')
  });

  it('should be able to add an order', () => {
    cy.get('input').type("Amber")
    cy.get('[name="steak"]').click()
    cy.get('[name="lettuce"]').click()
    cy.get('[name="cilantro"]').click()
    cy.get('[name="pico de gallo"]').click()

    cy.get('p').contains('Order: steak, lettuce, cilantro, pico de gallo')

    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      fixture: 'newOrder'
    })
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'ordersAfterPost'
    })

    cy.get('button').contains('Submit Order').click()

    cy.get('.Orders').children().should('have.length', 4)
  
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

    cy.get('.Orders').contains('Amber')
    cy.get('.Orders').contains('steak')
    cy.get('.Orders').contains('lettuce')
    cy.get('.Orders').contains('cilantro')
    cy.get('.Orders').contains('pico de gallo')
  });
})