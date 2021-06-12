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

        it('user who did not create a blog cannot delete it', function() {
            cy.contains('logout').click()
            cy.contains('log in').click()
            cy.get('#username').type('kannana1')
            cy.get('#password').type('secret')
            cy.get('.loginButton').click()

            cy.contains('view').click()
            cy.get('.removeButton').should('have.css', 'display', 'none')
        })

        it('blogs are ordered in descending order of likes', function() {
            cy.createBlogWithLikes({ title: 'cypress test blog with 1 like', author: 'Cypress', url: 'link1.com', likes: 1 })
            cy.createBlogWithLikes({ title: 'cypress test blog with 2 likes', author: 'Cypress', url: 'link1.com', likes: 2 })
            cy.createBlogWithLikes({ title: 'cypress test blog with 3 likes', author: 'Cypress', url: 'link1.com', likes: 3 })
            cy.createBlogWithLikes({ title: 'cypress test blog with 4 likes', author: 'Cypress', url: 'link1.com', likes: 4 })

            cy
                .get('.blog')
                .eq(0)
                .contains('cypress test blog with 4 likes')
                .should('exist')
            cy.get('.blog').eq(0).contains('view').click().get('pre').contains('likes: 4')

            cy.get('.blog').eq(1).contains('cypress test blog with 3 likes').should('exist')
            cy.get('.blog').eq(1).contains('view').click().get('pre').contains('likes: 3')

            cy.get('.blog').eq(2).contains('cypress test blog with 2 likes').should('exist')
            cy.get('.blog').eq(2).contains('view').click().get('pre').contains('likes: 2')

            cy.get('.blog').eq(3).contains('cypress test blog with 1 like').should('exist')
            cy.get('.blog').eq(3).contains('view').click().get('pre').contains('likes: 1')

            cy.get('.blog').eq(4).contains('boilerplate created in beforeEach by Cypress').should('exist')
            cy.get('.blog').eq(4).contains('view').click().get('pre').contains('likes: 0')
        })

    })
})