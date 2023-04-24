//as a user, i should see an error message when trying to submit the form without both a name and ingredients

describe('should not be able to submit an order without name or ingredients', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'ordersBeforePost'
    })
    cy.visit('http://localhost:3000/')
  });

  it('should see error message when trying to submit form without name and form should not submit', () => {
    cy.get('[name="steak"]').click()
    cy.get('[name="lettuce"]').click()
    cy.get('[name="cilantro"]').click()
    cy.get('[name="pico de gallo"]').click()
    cy.get('p').contains('Order: steak, lettuce, cilantro, pico de gallo')

    cy.get('button').contains('Submit Order').click()
    cy.get('p')
      .contains('Oops, you must add a name and ingredients before submitting')
    cy.get('.Orders').children().should('have.length', 3)
  });

  it('should see error message when trying to submit form without ingredients and form should not submit', () => {
    cy.get('input')
      .type('Meow')

    cy.get('button').contains('Submit Order').click()
    cy.get('p')
      .contains('Oops, you must add a name and ingredients before submitting')
    cy.get('.Orders').children().should('have.length', 3)
  });
})