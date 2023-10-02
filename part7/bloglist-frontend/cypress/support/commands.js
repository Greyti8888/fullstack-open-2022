Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username: username,
    password: password,
  }).then((res) => {
    localStorage.setItem('loggedBloglistUser', JSON.stringify(res.body))
    cy.visit('')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: {
      title: title,
      author: author,
      url: url,
      likes: likes || 0,
    },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('loggedBloglistUser')).token
      }`,
    },
  }).then(() => {
    cy.visit('')
  })
})
