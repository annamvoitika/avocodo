describe('Users', function() {
  it('can submit a new user and view all users', function() {
    cy.visit('/user');
    cy.contains('New user').click();

    cy.get('#new-user-form').find('[type="text"]').type('Eddie');
    cy.get('#new-user-form').submit();

    cy.get('.user').should('contain', 'Eddie');
  });
});
