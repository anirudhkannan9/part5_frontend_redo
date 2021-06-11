describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Cypress Test User',
            username: 'cypressTestUser',
            password: 'secret'

        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown once log in button is clicked', function() {
        cy.contains('log in').click()
        cy.get('#username').type('cypressTestUser')
        cy.get('#password').type('secret')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('cypressTestUser')
            cy.get('#password').type('secret')
            cy.contains('login').click()

            cy.contains('Cypress Test User logged in')
        })

        it.only('fails with incorrect credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('cypressTestUser')
            cy.get('#password').type('wrong')
            cy.contains('login').click()

            cy.get('.error').should('contain', 'Wrong username or password')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('.error').should('have.css', 'border-style', 'solid')




        })
    })
})