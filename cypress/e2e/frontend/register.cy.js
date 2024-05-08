describe('Registration Form', function () {
    beforeEach(function () {
      cy.visit('http://localhost:5173');
    });
  
    it('displays the registration form elements', function () {
      cy.get('input[name="firstName"]').should('exist');
      cy.get('input[name="lastName"]').should('exist');
      cy.get('input[name="username"]').should('exist');
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name="password"]').should('exist');
      cy.get('input[name="passwordConfirmation"]').should('exist');
      cy.get('input[type="checkbox"]').should('exist');
      cy.contains('terms and conditions').should('exist');
      cy.contains('privacy policy').should('exist');
      cy.contains('Create an account').should('exist');
      cy.contains('Already have an account?').should('exist');
      cy.contains('Log in').should('exist');
    });
  
    it('allows user to fill out the form and submit', function () {
      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('input[name="username"]').type('nikitosikea');
      cy.get('input[name="email"]').type('john@example.com');
      cy.get('input[name="password"]').type('Developer9000!');
      cy.get('input[name="passwordConfirmation"]').type('Developer9000!');
      cy.get('input[type="checkbox"]').check();
      cy.contains('Create an account').click();
  
      //  successful registration redirects to home page
      cy.url().should('include', '/home');
    });
  
    it('displays error message for passwords not matching', function () {
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="passwordConfirmation"]').type('Developer9000!');
      cy.contains('Create an account').click();
  
      // Ensure error message for passwords not matching is displayed
      cy.contains('Passwords do not match.').should('exist');
    });
  
    it('displays error message for server validation failure', function () {
      // server validation failure by sending invalid data
      cy.intercept('POST', '/api/register', {
        statusCode: 400,
        body: {
          error: 'Invalid data',
        },
      });
  
      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('input[name="username"]').type('johndoe');
      cy.get('input[name="email"]').type('john@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="passwordConfirmation"]').type('password123');
      cy.get('input[type="checkbox"]').check();
      cy.contains('Create an account').click();
  
      // Ensure error message for server validation failure is displayed
      cy.contains('Invalid data').should('exist');
    });
  
    it('redirects to login page when "Log in" link is clicked', function () {
      cy.contains('Log in').click();
  
      // Ensure redirection to login page
      cy.url().should('include', '/login');
    });
  });