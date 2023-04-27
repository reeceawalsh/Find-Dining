describe('Test Register Page', () => {

    it('Missing Password', () => {

        cy.visit('http://localhost:3000')
    
        cy.contains('Register').click()
        cy.get('input[name="Username"]').type('test1')
        cy.get('input[name="Email"]').type('test1@gmail.com')
        cy.get('input[name="Date of Birth"]').type('2000-01-15')
        cy.get('.register_button__zHwo_').click()
        cy.get('.error').eq(1).should('have.text', 'Password is required.')
    })
})