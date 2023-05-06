describe('Test Register Page', () => {

    it('Missing Date of Birth', () => {

        cy.visit('http://localhost:3000')
    
        cy.contains('Register').click()
        cy.get('input[name="Username"]').type('test1')
        cy.get('input[name="Email"]').type('test1@gmail.com')
        cy.get('input[name="Password"]').type('A123bcd!')
        cy.get('.register_button__zHwo_').click()
        cy.get('.error').eq(0).should('have.text', 'Date of birth is required.')
    })
    
})