import chaiColors from 'chai-colors'
import chaiSorted from 'chai-sorted'

chai.use(chaiColors);
chai.use(chaiSorted);

const credentials = {
  "username": "username",
  "name": "Name",
  "password": "password"
}

const rngStrGenerator = () => {
  return Math.random()
    .toString(36)
    .substring(2)
}

describe('Blog app', () => {
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
      cy.intercept('POST', '/api/login').as('login') 
      cy.get('.username').type(credentials.username)
      cy.get('.password').type(credentials.password)
      cy.get('.submitLogin').click()

      cy.wait('@login').get('.successMessage')
        .contains('Login succeeded')
        .should('have.css', 'color')
        .and('be.colored', '#008000')
    })

    it('fails with wrong credentials', () => {
      cy.intercept('POST', '/api/login').as('login') 
      cy.get('.username').type(rngStrGenerator())
      cy.get('.password').type(rngStrGenerator())
      cy.get('.submitLogin').click()

      cy.wait('@login').get('.errorMessage')
        .contains('Invalid username and password')
        .should('have.css', 'color')
        .and('be.colored', '#ff0000')
    })
  })

  describe('When logged in', () => {
    const blog = {
      "title": 'Title of the blog',
      "author": "John·Doe",
      "url": "https://www.example.com/"
    }
    
    beforeEach(() => {
      cy.request('POST', 'http://localhost:3003/api/users', credentials)
      cy.get('.username').type(credentials.username)
      cy.get('.password').type(credentials.password)
      cy.get('.submitLogin').click()
    })

    it('A blog can be created', () => {
      cy.intercept('POST', '/api/blogs').as('createBlog') 

      cy.get('.affirm').click()

      cy.get('.blog-title-field').type(blog.title)
      cy.get('.blog-author-field').type(blog.author)
      cy.get('.blog-url-field').type(blog.url)

      cy.get('.createBlog').click()

      cy.wait('@createBlog').get('.blog-title').contains(blog.title)
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
        
        cy.get('.createBlog').click()
      })

      it('A blog can be liked', () => {
        cy.intercept('PUT', '/api/blogs/*').as('updateBlog') 
        cy.get('.show').click()

        cy.get('.blog-likes').then(element => {
          const prevVal = Number(element.text())
          cy.get('.like').click()
          cy.wait('@updateBlog').then(() => {
            const newVal = Number(element.text())
            expect(newVal).to.eq(prevVal + 1)
          })
        })
      })

      it('User who created the blog can delete it', () => {
        cy.intercept('DELETE', '/api/blogs/*').as('deleteBlog') 
        cy.get('.show').click()
        cy.get('.blog-user').contains(credentials.name)
        cy.get('.delete').click()

        cy.wait('@deleteBlog').get('.blog-title').should('not.exist')
        cy.get('.blog-author').should('not.exist')
      })

      it('Only the creator can see the delete button of a blog, not anyone else', () => {
        const credentials_2 = {
          username: 'username2',
          name: 'Name2',
          password: 'password2'
        }
        cy.request('POST', 'http://localhost:3003/api/users', credentials_2)
        cy.get('.logout').click()

        cy.get('.username').type(credentials_2.username)
        cy.get('.password').type(credentials_2.password)
        cy.get('.submitLogin').click()

        cy.get('.show').click()
        cy.get('.blog-user').should('not.contain', credentials_2.name)
        cy.get('.delete').should('not.exist')
      })

      it('Blogs are ordered according to likes in decreasing order', () => {
        const blog_2 = {
          "title": 'Title of another blog',
          "author": "Jane·Doe",
          "url": "https://www.example2.com/"
        }

        cy.intercept('POST', '/api/blogs').as('createBlog') 
        
        cy.get('.blog-title-field').type(blog_2.title)
        cy.get('.blog-author-field').type(blog_2.author)
        cy.get('.blog-url-field').type(blog_2.url)

        cy.get('.createBlog').click()

        const getLikes = (index, blog) => {
          const like = Cypress.$(blog).find('.blog-likes').text()
          const title = Cypress.$(blog).find('.blog-title').text()
          return { id: blog.id, like: Number(like), title }
        }
        
        cy.wait('@createBlog').get('.blog').then(blogs => {
          const blogLength = blogs.length
          const prevState = blogs.map(getLikes).get()
          const randomIndex = Math.trunc(Math.random() * blogLength)

          cy.intercept('PUT', '/api/blogs/*').as('updateBlog') 
          cy.get(`#${blogs[randomIndex].id}`).within(() => {
            cy.get('.show').click()
            cy.get('.like').click()
          })
          
          cy.wait('@updateBlog').get('.blog').then(blogs => {
            const newState = blogs.map(getLikes).get()
            expect(newState).to.not.equal(prevState)
            expect(newState).to.be.descendingBy('like')
          })
        })
      })
    })
  })
})
