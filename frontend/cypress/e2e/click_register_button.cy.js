describe('My First Test', () => {
  it('clicks the link "type"', () => {
    cy.visit('http://localhost:3000')

    cy.contains('Register').click()

    cy.url().should('include', '/register')
  })
})