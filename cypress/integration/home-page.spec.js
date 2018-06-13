describe('Home Page', function() {
  beforeEach(function() {
    cy.visit('/');
  });

  it('shows the register dialog', function() {
    cy.get('[data-test=hero-get-started-button]').click();
    cy.get('#register-dialog').should('be', 'visible');
  });

  it('shows the sign in dialog', function() {
    cy.get('[data-test=hero-sign-in-button]').click();
    cy.get('#signin-dialog').should('be', 'visible');
  });
});
