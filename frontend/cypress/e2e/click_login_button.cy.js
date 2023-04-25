describe('My First Test', () => {
  it('clicks the link "type"', () => {
    cy.visit('http://localhost:3000')

    cy.contains('Login').click()

    cy.url().should('include', '/login')

    cy.get('input[name="Email"]').type('fake@email.com')

  })
})