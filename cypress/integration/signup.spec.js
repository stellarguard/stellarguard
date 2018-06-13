describe('Sign Up', function() {
  beforeEach(function() {
    cy.visit('/');
  });

  function randomChars(n) {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < n; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  function randomEmail() {
    return `${randomChars(10)}@mailinator.com`;
  }

  it('signs a user up from the register dialog', function() {
    const email = randomEmail();
    cy.get('[data-test=toolbar-actions-register]').click();

    cy.get('#email').type(email);
    cy.get('#password').type('supersecret');

    cy.get('[data-test=register-dialog-register-button]').click();

    // UI should reflect this user being logged in
    cy.get('#root').should('contain', email.toLowerCase());
  });
});
