describe('Test Login Page', () => {
  it('Successfully load the login page', () => {
    
    cy.visit('http://localhost:3000')
    
    cy.contains('Login').click()
    
    cy.url().should('include', '/login')

    cy.get('input[name="Email"]').should('exist')

    cy.get('input[name="Password"]').should('exist')

    cy.contains('Login')
    
    cy.contains('Register')

    cy.contains('Forgot Password')
  })
})