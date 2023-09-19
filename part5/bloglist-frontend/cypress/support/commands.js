Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username: username,
    password: password
  }).then(res => {
    localStorage.setItem('loggedBloglistUser', JSON.stringify(res.body))
    cy.visit('')
  })
})