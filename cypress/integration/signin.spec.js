describe('Sign in from sign in dialog', function() {
  beforeEach(function() {
    cy.visit('/');
  });

  it('signs the user in successfully', function() {
    cy.get('[data-test=toolbar-actions-signin]').click();

    cy.get('#email').type('test-user@mailinator.com');
    cy.get('#password').type('supersecret');

    cy.get('[data-test=signin-dialog-signin-button]').click();

    // UI should reflect this user being logged in
    cy.get('#root').should('contain', 'test-user@mailinator.com');
  });
});

describe('Sign in from sign in page', function() {
  beforeEach(function() {
    cy.visit('/settings');
  });

  it('redirects to sign in page', function() {
    cy.url().should('be', '/signin');
  });

  it('signs the user in successfully', function() {
    cy.url().should('be', '/signin');

    cy.get('#email').type('test-user@mailinator.com');
    cy.get('#password').type('supersecret');

    cy.get('[data-test=signin-form-signin-button]').click();

    // redirects back to the page it came from
    cy.url().should('be', '/settings');
  });
});
