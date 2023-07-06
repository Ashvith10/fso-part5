describe('template spec', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users',
      { "username": "username","name": "Name","password": "password" })
    cy.visit('http://localhost:3000/')
  })

  it('Login form is shown', () => {
    cy.get('.title').should('exist').contains('log in to application')
    cy.get('.loginForm').should('exist')
    cy.get('.username').should('exist')
    cy.get('.password').should('exist')
    cy.get('.submitLogin').should('exist')
  })
})
