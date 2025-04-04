// cypress/support/commands.js

// Mock login
Cypress.Commands.add('login', () => {
  // Skip the UI login process by directly setting local storage
  localStorage.setItem('userId', '12345');
  localStorage.setItem('isAuthenticated', 'true');
  
  // Mock the token cookies
  cy.setCookie('accessToken', 'fake-jwt-token');
});

// Mock auth API responses
Cypress.Commands.add('mockAuthAPIs', () => {
  cy.intercept('GET', '**/authenticate/protected', {
    statusCode: 200,
    body: {
      logged_in_as: '12345',
      username: 'testuser',
      role: 'user'
    }
  }).as('getProtectedData');
  
  cy.intercept('POST', '**/authenticate/refresh', {
    statusCode: 200,
    body: {
      accessToken: 'new-fake-access-token'
    }
  }).as('refreshToken');
});

// Mock subscription APIs
Cypress.Commands.add('mockSubscriptionAPIs', () => {
  cy.intercept('GET', '**/subscriptions/get_subscription_types', {
    statusCode: 200,
    fixture: 'subscriptionTypes.json'
  }).as('getSubscriptionTypes');
  
  cy.intercept('GET', '**/subscriptions/get_user_subscription/**', {
    statusCode: 200,
    fixture: 'userSubscription.json'
  }).as('getUserSubscription');
  
  cy.intercept('POST', '**/subscriptions/create_subscription_and_update_user', {
    statusCode: 200,
    body: {
      message: 'Subscription created successfully',
      subscriptionId: 999
    }
  }).as('createSubscription');
  
  cy.intercept('DELETE', '**/subscriptions/delete_subscription/**', {
    statusCode: 200,
    body: {
      message: 'Subscription deleted successfully'
    }
  }).as('deleteSubscription');
});

// Utility to disable animations for testing
Cypress.Commands.add('disableAnimations', () => {
    cy.document().then(document => {
      const style = document.createElement('style');
      style.innerHTML = `
        [class*="fadeIn"], 
        [class*="animate"], 
        [class*="transition"] {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
          animation: none !important;
        }
      `;
      document.head.appendChild(style);
    });
  });
  
  // Utility to force element visibility
  Cypress.Commands.add('forceVisible', { prevSubject: true }, (subject) => {
    cy.wrap(subject).invoke('attr', 'style', 'opacity: 1 !important; visibility: visible !important; display: block !important;');
    return cy.wrap(subject);
  });