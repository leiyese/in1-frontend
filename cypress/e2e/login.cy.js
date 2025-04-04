// cypress/e2e/login.cy.js
describe('Login Flow Tests', () => {
  beforeEach(() => {
    // Mock authentication API responses
    cy.intercept('POST', '**/authenticate/login', {
      statusCode: 200,
      body: {
        message: 'Login successful',
        user_id: '12345',
        username: 'testuser'
      }
    }).as('loginRequest');
    
    cy.intercept('GET', '**/authenticate/protected', {
      statusCode: 200,
      body: {
        logged_in_as: '12345',
        username: 'testuser'
      }
    }).as('protectedData');
    
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.get('form').should('exist');
    // Changed from email to username to match your actual form
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should successfully log in with valid credentials', () => {
    // Changed from email to username
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    cy.wait('@loginRequest');
    
    // Verify redirection to dashboard or home page after login
    cy.url().should('include', '/');
  });

});