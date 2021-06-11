//Mocha recommends that arrow functions are not used, because they might cause some issues in certain situations.

describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Cypress Test User',
      username: 'cypressTestUser',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

    it('user can login', function() {
      cy.contains('log in').click()
      cy.get('#username').type('cypressTestUser')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('Cypress Test User logged in')
    })

    it('login fails with wrong password', function() {
        cy.contains('log in').click()
        cy.get('#username').type('anirudh')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy
            .get('.error')
            .should('contain', 'Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'Anirudh Kannan logged in')
    })

    describe('when logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'cypressTestUser', password: 'secret' })

      })

      it('a new note can be created', function() {
        cy.contains('new note').click()
        cy.get('#newNoteInput').type('a note created by cypress')
        cy.contains('save').click()
        cy.contains('a note created by cypress')
      })

      describe('and several notes exist', function() {
        beforeEach(function() {
          cy.createNote({ content: 'first note', important: false })
          cy.createNote({ content: 'second note', important: false })
          cy.createNote({ content: 'third note', important: false })
        })

        it('one of those can be made important', function() {
          //need to use find instead of get because 'get' always searches the whole page and would return all button
          cy.contains('second note').parent().find('button').as('theButton')
          cy.get('@theButton').click()
          cy.get('@theButton').should('contain', 'make not important')

        })
      })
    })
})



// describe('Note app', function() {
//     beforeEach(function() {
//         cy.request('POST', 'http://localhost:3001/api/testing/reset')
//         const user = {
//             name: 'Cypress Test User',
//             username: 'cypressTestUser',
//             password: 'secret'
//         }
//         cy.request('POST', 'http://localhost:3001/api/users', user)
//         //now testing starts with the backend in the same state every time: one user and no notes.
//         cy.visit('http://localhost:3000')
//     })

//     it('front page can be opened', function() {
//         cy.contains('Notes')
//         cy.contains('Note app, Anirudh Kannan (inspired by Department of Computer Science, University of Helsinki 2021)')
//     })

//     it('login form can be opened', function() {
//         cy.contains('log in').click()
//     })

//     describe('when logged in', function() {
//         //why log in here? each test starts from zero as far as browser is concerned. All changes to the browser's state are reversed after each test.
//         beforeEach(function() {
//             cy.contains('log in').click()
//             //cy.get command allows for searching elements by CSS selectors.
//             //using CSS id-selector
//             cy.get('#username').type('cypressTestUser')
//             cy.get('#password').type('secret')
//             cy.get('#login-button').click()
//         })

//         it('a new note can be created', function() {
//             cy.contains('new note').click()
//             cy.get('#newNoteInput').type('a note created by cypress')
//             cy.contains('save').click()
//             cy.contains('a note created by cypress')
//         })

//         describe('and a note exists', function() {
//             beforeEach(function() {
//                 cy.contains('new note').click()
//                 cy.get('#newNoteInput').type('another note cypress')
//                 cy.contains('save').click()
//             })

//             it('it can be made important', function() {
//                 cy.contains('another note cypress')
//                   .contains('make important')
//                   .click()

//                 cy.contains('another note cypress')
//                   .contains('make not important')


//             })
//         })
//     })


// })

