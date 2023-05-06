describe('Test Login Page', () => {

    it('Missing Email', () => {

        cy.visit('http://localhost:3000')
    
        cy.contains('Login').click()
        cy.get('input[name="Email"]').type('abc@gmail.com')
        cy.get('.login_button___YVNj').contains('Login').click();
        
        cy.get('.error').eq(1).should('have.text', 'Required')
    })
})