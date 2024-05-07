describe('Create Event Form', function () {
    beforeEach(function () {
      cy.visit('http://localhost:5173/event/create');
    });
  
    it('displays the form elements', function () {
      cy.get('input[name="title"]').should('exist');
      cy.get('textarea[name="description"]').should('exist');
      cy.get('select[name="eventType"]').should('exist');
      cy.get('input[name="startDate"]').should('exist');
      cy.get('input[name="endDate"]').should('exist');
      cy.get('select[name="timezone"]').should('exist');
      cy.get('select[name="votingMethod"]').should('exist');
      cy.get('input[name="anonymity"]').should('exist');
      cy.get('input[name="resultVisibility"]').should('exist');
      cy.get('select[name="storageType"]').should('exist');
      cy.contains('Submit').should('exist');
    });
  
    it('allows user to fill out the form and submit', function () {
      cy.get('input[name="title"]').type('Sample Event');
      cy.get('textarea[name="description"]').type('Sample Description');
      cy.get('select[name="eventType"]').select('Candidate');
      cy.get('input[name="options.0.name"]').type('Candidate A');
      cy.get('input[name="options.0.bio"]').type('Bio for Candidate A');
      cy.get('button').contains('Add Candidate').click();
      cy.get('input[name="options.1.name"]').type('Candidate B');
      cy.get('input[name="options.1.bio"]').type('Bio for Candidate B');
      cy.get('input[name="startDate"]').type('2024-05-06');
      cy.get('input[name="endDate"]').type('2024-05-10');
      cy.get('select[name="timezone"]').select('UTC');
      cy.get('select[name="votingMethod"]').select('singleChoice');
      cy.get('input[name="anonymity"]').check();
      cy.get('input[name="resultVisibility"]').check();
      cy.get('select[name="storageType"]').select('Database');
      cy.contains('Submit').click();
  
      //  successful form submission
      cy.contains('Success message').should('exist');
    });
  
    it('displays error message for invalid form submission', function () {
      //  server validation failure by sending invalid data
      cy.intercept('POST', '/api/events/create', {
        statusCode: 400,
        body: {
          error: 'Invalid data',
        },
      });
  
      cy.contains('Submit').click();
  
      //  error message for invalid submission is displayed
      cy.contains('Invalid data').should('exist');
    });
  
    it('allows user to add and remove options dynamically', function () {
      cy.get('select[name="eventType"]').select('General');
      cy.contains('Add Option').click();
      cy.get('input[name="options.0.option"]').type('Option A');
      cy.get('button').contains('Add Option').click();
      cy.get('input[name="options.1.option"]').type('Option B');
      cy.get('button').contains('Remove Option').click();
  
      //  option is removed
      cy.get('input[name="options.1.option"]').should('not.exist');
    });
  
    it('redirects to signup page when "Sign up" link is clicked', function () {
      cy.contains('Sign up').click();
  
      //  redirection to signup page
      cy.url().should('include', '/signup');
    });
  });