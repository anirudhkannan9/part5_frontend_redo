describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user1 = {
            name: 'Cypress Test User',
            username: 'cypressTestUser',
            password: 'secret'

        }
        cy.request('POST', 'http://localhost:3003/api/users', user1)
        const user2 = {
            name: 'Anirudh for Cypress test',
            username: 'kannana1',
            password: 'secret'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user2)
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

        it('fails with incorrect credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('cypressTestUser')
            cy.get('#password').type('wrong')
            cy.contains('log in').click()

            cy.get('.error').should('contain', 'Wrong username or password')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('.error').should('have.css', 'border-style', 'solid')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'cypressTestUser', password: 'secret' })
            cy.createBlog({ title: 'boilerplate created in beforeEach by Cypress', author: 'Cypress', url: 'link1.com' })
        })

        it('A new blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('test blog post submitted by Cypress')
            cy.get('#author').type('Cypress')
            cy.get('#url').type('link.com')
            cy.get('#createBlogButton').click()

            cy.contains('test blog post submitted by Cypress | Cypress')
        })

        it('logged in user can like a blog', function() {
            cy.contains('view').click()
            cy.contains('likes: 0')
            cy.contains('like').click()
            cy.contains('likes: 1')
        })

        it('user who created a blog can delete it', function() {
            cy.contains('view').click()
            cy.contains('remove').click()
            cy.get('.blog').should('not.exist')
        })

        it.only('user who did not create a blog cannot delete it', function() {
            cy.contains('logout').click()
            cy.contains('log in').click()
            cy.get('#username').type('kannana1')
            cy.get('#password').type('secret')
            cy.get('.loginButton').click()

            cy.contains('view').click()
            cy.get('.removeButton').should('have.css', 'display', 'none')
        })

    })
})