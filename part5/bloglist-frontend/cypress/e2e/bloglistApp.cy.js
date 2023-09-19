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
      title: 'someTitle',
      author: 'someAuthor',
      url: 'someUrl',
      likes: 789
    }

    beforeEach(function () {
      cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
        username: user.username,
        password: user.password
      }).then(res => {
        localStorage.setItem('loggedBloglistUser', JSON.stringify(res.body))
        cy.visit('')
      })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('input[name="title"]').type(blog.title)
      cy.get('input[name="author"]').type(blog.author)
      cy.get('input[name="url"]').type(blog.url)
      cy.get('button[type=submit]').click()

      cy.contains('New blog added')
      cy.contains(`${blog.title} - ${blog.author}`)
    })

    describe('When blog exist', function () {
      beforeEach(function () {
        cy.request({
          url: `${Cypress.env('BACKEND')}/blogs`,
          method: 'POST',
          body: {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes
          },
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`
          }
        }).then(() => {
          cy.visit('')
        })
      })

      it('Can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
          .parent()
          .contains(blog.likes + 1)
        cy.contains('Like added')
      })
    })
  })
})