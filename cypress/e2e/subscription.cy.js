// cypress/e2e/subscription.cy.js
describe('Subscription Page Tests', () => {
  beforeEach(() => {
    // Mock our API responses
    cy.mockAuthAPIs();
    cy.mockSubscriptionAPIs();
    
    // Login and visit the subscription page
    cy.login();
    cy.visit('/subscription');
    
    // Animations are now automatically disabled via e2e.js
    
    // Wait for content to be ready
    cy.wait(['@getSubscriptionTypes', '@getUserSubscription']);
  });

  it('should display subscription plans correctly', () => {
    // Force all sections to be visible
    cy.get('[class*="plansSection"]').forceVisible();
    
    // Check for section heading
    cy.contains('Choose Your Plan').should('exist');
    
    // Verify plan cards
    cy.get('[class*="planCard"]').should('have.length', 3);
    cy.get('[class*="planCard"]').eq(0).should('contain', 'Basic');
    cy.get('[class*="planCard"]').should('contain', '$9.99');
    cy.get('[class*="planCard"]').should('contain', 'Current Plan');
  });

  it('should show confirmation when selecting a new plan', () => {
    // Force any hidden elements to be visible for testing
    cy.get('[class*="plansSection"]').invoke('attr', 'style', 'opacity: 1 !important');
    
    // Look for Enterprise plan using partial text matching within plan cards
    cy.get('[class*="planCard"]').contains('Enterprise', { matchCase: false }).should('exist');
    
    // Find a non-active plan and click its button using force option
    cy.get('[class*="planCard"]').not(':contains("Current Plan")').first().within(() => {
      cy.get('button').click({ force: true });
    });
    
    // Check for confirmation flow text using more flexible matching
    cy.contains(/Processing|Updating|Changing/, { matchCase: false }).should('exist');
    cy.wait('@createSubscription');
    cy.contains(/success|successful|updated/i).should('exist');
  });

  it('should show benefits section', () => {
    // Force the features section to be visible
    cy.get('[class*="featuresSection"]').invoke('attr', 'style', 'opacity: 1 !important');
    
    // Check for heading
    cy.contains('Subscription Benefits').should('exist');
    
    // Check for feature grid and cards using appropriate selectors
    cy.get('[class*="featuresGrid"]').should('exist');
    
    // Verify multiple feature cards exist
    cy.get('[class*="featureCard"]').should('have.length.at.least', 2);
    
    // Check for specific feature content using partial text matching
    cy.get('[class*="featureCard"]').invoke('text').then((text) => {
      expect(text.toLowerCase()).to.include('premium');
      expect(text.toLowerCase()).to.include('chat');
    });
  });

  it('should show FAQ section', () => {
    // Force the FAQ section to be visible
    cy.get('[class*="faqSection"]').invoke('attr', 'style', 'opacity: 1 !important');
    
    // Check for FAQ heading
    cy.contains('Frequently Asked Questions').should('exist');
    
    // Verify FAQ items exist
    cy.get('[class*="faqItem"]').should('have.length.at.least', 2);
    
    // Check for specific FAQ content using flexible matching
    cy.get('[class*="faqItem"]').invoke('text').then((text) => {
      expect(text.toLowerCase()).to.include('cancel');
    });
  });
});