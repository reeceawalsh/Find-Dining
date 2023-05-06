describe('Test Register Page', () => {

    it('Missing Username', () => {

        cy.visit('http://localhost:3000')

        cy.contains('Register').click()
        cy.get('input[name="Email"]').type('test1@gmail.com')
        cy.get('input[name="Date of Birth"]').type('2000-01-15')
        cy.get('input[name="Password"]').type('A123bcd!')
        cy.get('.register_button__zHwo_').click()
        cy.get('.error').eq(1).should('have.text', 'User is required.')
    })
})