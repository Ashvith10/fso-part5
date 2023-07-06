import chaiColors from 'chai-colors'
chai.use(chaiColors);

describe('template spec', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000/')
  })

  it('Login form is shown', () => {
    cy.get('.title').should('exist').contains('log in to application')
    cy.get('.loginForm').should('exist')
    cy.get('.username').should('exist')
    cy.get('.password').should('exist')
    cy.get('.submitLogin').should('exist')
  })

  describe('Login', () => {
    const credentials = {
      "username": "username",
      "name": "Name",
      "password": "password"
    }

    beforeEach(() => {
      cy.request('POST', 'http://localhost:3003/api/users', credentials)
    })
    
    it('succeeds with correct credentials', () => {
      cy.get('.username').type(credentials.username)
      cy.get('.password').type(credentials.password)
      cy.get('.submitLogin').click()

      cy.get('.successMessage')
        .contains('Login succeeded')
        .should('have.css', 'color')
        .and('be.colored', '#008000')
    })

    it('fails with wrong credentials', () => {
      const rngStrGenerator = () => Math.random()
                                      .toString(36)
                                      .substring(2)

      cy.get('.username').type(rngStrGenerator())
      cy.get('.password').type(rngStrGenerator())
      cy.get('.submitLogin').click()

      cy.get('.errorMessage')
        .contains('Invalid username and password')
        .should('have.css', 'color')
        .and('be.colored', '#ff0000')
    })
  })
})
