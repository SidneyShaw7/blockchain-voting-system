describe('Voting app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173/login')
  })

  it('login page can be opened', function () {
    cy.contains('Login to Secure Voting System')
    cy.contains('Access your voting dashboard.')
  })

  it('allows user to log in with valid credentials', function () {
    cy.get('input[name="username"]').type('nikitosikea')
    cy.get('input[name="password"]').type('Developer9000!')
    cy.get('button[type="submit"]').click()

    //  successful login redirects to dashboard
    cy.url().should('include', '/home')
  })

  it('displays error message for invalid credentials', function () {
    cy.get('input[name="username"]').type('invalidUsername')
    cy.get('input[name="password"]').type('invalidPassword')
    cy.get('button[type="submit"]').click()

    //  error message is displayed
    cy.contains('Invalid username or password').should('be.visible')
  })
})
