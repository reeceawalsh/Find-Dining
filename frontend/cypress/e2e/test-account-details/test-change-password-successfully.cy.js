describe('Test Account Details Page', () => {

    it('Change password successfully', () => {

        cy.visit('http://localhost:3000')

        cy.contains('Login').click()
        cy.get('input[name="Email"]').type('test1@gmail.com')
        cy.get('input[name="Password"]').type('ABC123de!')

        cy.get('.login_button___YVNj').contains('Login').click()

        cy.contains('Profile').click()
        cy.contains('Edit').click()

        // Change Password
        cy.contains('Change Password').click()
        cy.get('input[name="Password"]').type('ABC124de!')
        cy.get('input[name="New Password"]').type('ABC123de!')
        cy.get('input[name="Confirm Password"]').type('ABC123de!')
        cy.get('.MuiDialogContent-root').contains('Change Password').click()
        cy.contains('Save').click()
        cy.contains('Logout').click()

        // Try to login again with old password
        cy.contains('Login').click()
        cy.get('input[name="Email"]').type('test1@gmail.com')
        cy.get('input[name="Password"]').type('ABC124de!')

        cy.get('.login_button___YVNj').contains('Login').click()
        cy.contains('Invalid credentials')

        // Try to login again with new password
        cy.contains('Login').click()
        cy.get('input[name="Email"]').type('test1@gmail.com')
        cy.get('input[name="Password"]').type('ABC123de!')

        cy.get('.login_button___YVNj').contains('Login').click()
        cy.contains('Signed in as')

        // Resume to the original password before the test
        cy.contains('Change Password').click()
        cy.get('input[name="Password"]').type('ABC124de!')
        cy.get('input[name="New Password"]').type('ABC123de!')
        cy.get('input[name="Confirm Password"]').type('ABC123de!')
        cy.get('.MuiDialogContent-root').contains('Change Password').click()
        cy.contains('Save').click()
        cy.contains('Logout').click()
    })
})