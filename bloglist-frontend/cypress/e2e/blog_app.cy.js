import chaiColors from 'chai-colors'
chai.use(chaiColors)

const credentials = {
  'username': 'username',
  'name': 'Name',
  'password': 'password'
}

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

  describe('When logged in', () => {
    const blog = {
      'title': 'Title of the Blog',
      'author': 'John·Doe',
      'url': 'https://www.example.com/'
    }

    beforeEach(() => {
      cy.request('POST', 'http://localhost:3003/api/users', credentials)
      cy.get('.username').type(credentials.username)
      cy.get('.password').type(credentials.password)
      cy.get('.submitLogin').click()
    })

    it('A blog can be created', () => {
      cy.get('.affirm').click()

      cy.get('.blog-title-field').type(blog.title)
      cy.get('.blog-author-field').type(blog.author)
      cy.get('.blog-url-field').type(blog.url)

      cy.get('.createNote').click()

      cy.get('.blog-title').contains(blog.title)
      cy.get('.blog-author').contains(blog.author)
      cy.get('.show').click()
      cy.get('.blog-url').contains(blog.url)
    })

    describe('On creation', () => {
      beforeEach(() => {
        cy.get('.affirm').click()

        cy.get('.blog-title-field').type(blog.title)
        cy.get('.blog-author-field').type(blog.author)
        cy.get('.blog-url-field').type(blog.url)

        cy.get('.createNote').click()
      })

      it('A blog can be liked', () => {
        cy.get('.show').click()

        cy.get('.blog-likes').then(element => {
          const prevVal = element.text()
          cy.get('.like').click()
          const newVal = element.text()
          expect(newVal).to.eq(prevVal)
        })
      })
    })
  })
})
