describe('Test Login Page', () => {

    it('Incorrect Credential', () => {

        cy.visit('http://localhost:3000')

        cy.contains('Login').click()
        cy.get('input[name="Email"]').type('test1@gmail.com')
        cy.get('input[name="Password"]').type('ABC123de!')

        cy.get('.login_button___YVNj').contains('Login').click()

        cy.contains('Hi test1, I hope you\'re hungry.')

    })
})