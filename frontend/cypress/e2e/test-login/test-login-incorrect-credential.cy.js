describe('Test Login Page', () => {

    it('Incorrect Credential', () => {

        cy.visit('http://localhost:3000')

        cy.contains('Login').click()
        cy.get('input[name="Email"]').type('dummyEmail@gmail.com')
        cy.get('input[name="Password"]').type('dummyPassword')

        cy.get('.login_button___YVNj').contains('Login').click()

        cy.contains('Invalid credentials')

    })
})