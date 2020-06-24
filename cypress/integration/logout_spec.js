describe('Logout', function() {
  it('allows users to logout', function() {
    cy.visit('/signup');
    cy.get('#sign-up-form').find('[type="text"]').type('kate')
    cy.get('#sign-up-form').find('[type="email"]').type('kate@smith')
    cy.get('#sign-up-form').find('[type="password"]').type('kate')
    cy.get('#sign-up-form').submit();

    cy.get('#sign-in-form').find('[type="email"]').type('kate@smith')
    cy.get('#sign-in-form').find('[type="password"]').type('kate')
    cy.get('#sign-in-form').submit();

    cy.contains('Users').click();
    cy.contains('Log Out').click();

    cy.get('h1').contains('Sign in');
  });
});
