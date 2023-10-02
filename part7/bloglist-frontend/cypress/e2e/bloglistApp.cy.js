describe('Blog app', function () {
  const user = {
    name: 'First Last',
    username: 'user1',
    password: 'qwerty'
  }

  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains(`${user.username} logged in`)
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function () {
    const blog = {
      title: 'Zero likes',
      author: 'someAuthor',
      url: 'someUrl',
      likes: 0
    }

    beforeEach(function () {
      cy.login(user)
    })

    it('A blog can be created', function () {
      cy.get('button').contains('new blog').click()
      cy.get('input[name="title"]').type(blog.title)
      cy.get('input[name="author"]').type(blog.author)
      cy.get('input[name="url"]').type(blog.url)
      cy.get('button[type=submit]').click()

      cy.contains('New blog added')
      cy.contains(`${blog.title} - ${blog.author}`)
    })

    describe('When blog exist', function () {
      beforeEach(function () {
        cy.createBlog(blog)
      })

      it('Can be liked', function () {
        cy.get('button').contains('view').click()
        cy.get('button')
          .contains('like')
          .click()
          .parent()
          .contains(blog.likes + 1)
        cy.contains('Like added')
      })

      it('Can be deleted', function () {
        cy.get('button').contains('view').click()
        cy.get('button').contains('delete').click()
        cy.contains(`${blog.title} - ${blog.author}`).should('not.exist')
        cy.contains('Blog deleted')
      })

      it('Only creator of blog can see delete button', function () {
        cy.get('button').contains('view').click()
        cy.get('button').contains('delete').should('be.visible')

        const user2 = {
          name: 'First2 Last2',
          username: 'user2',
          password: 'qwerty'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user2)
        cy.login(user2)
        cy.visit('')

        cy.get('button').contains('view').click()
        cy.get('button').contains('delete').should('not.be.visible')
      })

      it('Blogs are orders according to amount of likes', function () {
        const blog2 = {
          title: 'One like',
          author: 'someAuthor',
          url: 'someUrl',
          likes: 1
        }
        const blog3 = {
          title: 'Two likes',
          author: 'someAuthor',
          url: 'someUrl',
          likes: 2
        }

        cy.createBlog(blog3)
        cy.createBlog(blog2)

        cy.get('.blog').eq(0).should('contain', blog3.title)
        cy.get('.blog').eq(1).should('contain', blog2.title)
        cy.get('.blog').eq(2).should('contain', blog.title)

        cy.contains(blog.title).parent().find('button').click()
        cy.get('button')
          .contains('like')
          .click()
          .click()
          .click()
          .wait(2000)
          .parent()
          .contains(blog.likes + 3)

        cy.get('.blog').eq(0).should('contain', blog.title)
        cy.get('.blog').eq(1).should('contain', blog3.title)
        cy.get('.blog').eq(2).should('contain', blog2.title)
      })
    })
  })
})
