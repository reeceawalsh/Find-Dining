describe('Test Home Page', () => {
  it('Test the search bar', () => {
    
    cy.visit('http://localhost:3000')
    
    cy.contains('Login').click()
    cy.get('input[name="Email"]').type('test1@gmail.com')
    cy.get('input[name="Password"]').type('ABC123de!')

    cy.get('.login_button___YVNj').contains('Login').click()
    
    cy.get('.searchbar_searchbar__Zi_Nu').type('Newcastle')
    
    cy.get(".searchbar_dropdownWrapper__59_wn").contains('Newcastle upon Tyne').click()

    cy.get('.searchbar_button__qPnrO').contains('Search').click()


  })
})