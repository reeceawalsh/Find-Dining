describe('Test About Page', () => {
  it('Successfully load the about page', () => {
    
    cy.visit('http://localhost:3000')
    
    cy.contains('About').click()
    
    cy.url().should('include', '/home/about')

  })
})