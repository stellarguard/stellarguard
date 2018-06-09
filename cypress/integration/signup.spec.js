describe('Sign Up', function() {
  beforeEach(function() {
    cy.visit('/');
  });

  it('signs a user up from the register dialog', function() {
    cy.get('[data-test=toolbar-actions-register]').click();

    cy.get('#email').type('test-user@mailinator.com');
    cy.get('#password').type('supersecret');

    cy.get('[data-test=register-dialog-register-button]').click();

    // UI should reflect this user being logged in
    cy.get('#root').should('contain', 'test-user@mailinator.com');
  });
});
