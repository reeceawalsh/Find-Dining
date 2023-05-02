describe('Test Login Page', () => {

    it('Missing Email', () => {

        cy.visit('http://localhost:3000')
    
        cy.contains('Login').click()
        cy.get('input[name="Password"]').type('dummyPassword')
        cy.get('.login_button___YVNj').contains('Login').click();
        
        cy.get('.error').eq(0).should('have.text', 'Required')
    })
})