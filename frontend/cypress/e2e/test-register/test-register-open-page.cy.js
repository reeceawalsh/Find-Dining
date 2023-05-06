describe('Test Register Page', () => {
  it('Successfully load the register page', () => {
    
    cy.visit('http://localhost:3000')
    
    cy.contains('Register').click()
    
    cy.url().should('include', '/register')

    cy.get('input[name="Username"]').should('exist')

    cy.get('input[name="Email"]').should('exist')

    cy.get('input[name="Date of Birth"]').should('exist')

    cy.get('input[name="Password"]').should('exist')

    cy.get('.register_button__zHwo_').should('exist')
  })
})