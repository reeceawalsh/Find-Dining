describe('Test Home Page', () => {
  it('Successfully load the find-dining page', () => {
    
    cy.visit('http://localhost:3000')
    
    cy.contains('Login').click()
    cy.get('input[name="Email"]').type('test1@gmail.com')
    cy.get('input[name="Password"]').type('ABC123de!')

    cy.get('.login_button___YVNj').contains('Login').click()
    
    cy.get('.navbar_link__CkML7').contains('Find Dining').click()
    
    cy.url().should('include', '/restaurants')

  })
})