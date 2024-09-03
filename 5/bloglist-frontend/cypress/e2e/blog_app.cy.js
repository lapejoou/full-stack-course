describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const anotherUser = {
      username: 'root',
      name: 'Superuser',
      password: '123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)

    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
      })

      it('A blog can be created', function () {
        cy.contains('create new blog').click()
        cy.get('#title-input').type('test title')
        cy.get('#author-input').type('test author')
        cy.get('#url-input').type('test url')
        cy.get('button[type="submit"]').should('be.visible').click()
        cy.contains('test title')
      })

      it('A blog can be liked', function () {
        cy.contains('create new blog').click()
        cy.get('#title-input').type('test title')
        cy.get('#author-input').type('test author')
        cy.get('#url-input').type('test url')
        cy.get('button[type="submit"]').should('be.visible').click()
        cy.contains('view').click()
        cy.contains('Like').click()
      })

      it('A blog can be removed by the creator', function () {
        cy.contains('create new blog').click()
        cy.get('#title-input').type('removable blog')
        cy.get('#author-input').type('test author')
        cy.get('#url-input').type('test url')
        cy.get('button[type="submit"]').should('be.visible').click()

        cy.contains('view').click()
        cy.contains('Remove').click()

        cy.on('window:confirm', () => true)
        cy.wait(5000) // Adjust wait time if necessary
        cy.contains('removable blog').should('not.exist')
      })

      it('Only the creator sees the remove button', function () {
        cy.contains('create new blog').click()
        cy.get('#title-input').type('user specific blog')
        cy.get('#author-input').type('test author')
        cy.get('#url-input').type('test url')
        cy.get('button[type="submit"]').should('be.visible').click()

        cy.contains('Log out').click()
        cy.reload()

        cy.get('#username').type('root')
        cy.get('#password').type('123')
        cy.get('#login-button').click()

        cy.contains('view').click()
        cy.contains('Remove').should('not.exist')
      })

      it('Blogs are sorted by likes', function () {
        cy.contains('create new blog').click()
        cy.get('#title-input').type('Blog 1')
        cy.get('#author-input').type('Author 1')
        cy.get('#url-input').type('url1')
        cy.get('button[type="submit"]').should('be.visible').click()

        cy.contains('create new blog').click()
        cy.get('#title-input').type('Blog 2')
        cy.get('#author-input').type('Author 2')
        cy.get('#url-input').type('url2')
        cy.get('button[type="submit"]').should('be.visible').click()

        cy.contains('create new blog').click()
        cy.get('#title-input').type('Blog 3')
        cy.get('#author-input').type('Author 3')
        cy.get('#url-input').type('url3')
        cy.get('button[type="submit"]').should('be.visible').click()

        cy.contains('Blog 2').parent().find('button').contains('view').click()
        cy.contains('Blog 2').parent().find('button').contains('Like').click()
        cy.contains('likes 1').should('exist')
        cy.wait(500)
        cy.contains('Blog 2').parent().find('button').contains('Like').click()
        cy.contains('likes 2').should('exist')

        cy.contains('Blog 3').parent().find('button').contains('view').click()
        cy.contains('Blog 3').parent().find('button').contains('Like').click()
        cy.contains('likes 1').should('exist')

        cy.get('.blog').eq(0).should('contain', 'Blog 2')
        cy.get('.blog').eq(1).should('contain', 'Blog 3')
        cy.get('.blog').eq(2).should('contain', 'Blog 1')
      })
    })
  })
})
