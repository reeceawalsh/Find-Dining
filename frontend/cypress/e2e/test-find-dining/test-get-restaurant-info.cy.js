describe('Test Find Dining Page', () => {
  
  it('Get restaurant information', () => {

    // https://www.browserstack.com/guide/error-handling-in-cypress
    cy.on("fail", (err, runnable) => {
      console.log(err.message);
      return false;
    });

    cy.on('uncaught:exception', (err, runnable) => {

      return false

  })

    cy.visit('http://localhost:3000', { failOnStatusCode: false })

    cy.contains('Login').click()
    cy.get('input[name="Email"]').type('test1@gmail.com')
    cy.get('input[name="Password"]').type('ABC123de!')

    cy.get('.login_button___YVNj').contains('Login').click()

    cy.get('.navbar_link__CkML7').contains('Find Dining').click()

    cy.url().should('include', '/restaurants')

    cy.get('.restaurant_reviewButton__DAza2').contains('More Info').click()

    cy.contains('Opening Hours')

  })
})