describe('All pages are not visible when not signed in', function() {
  it('should not allow access to all pages apart from signin/signup', function() {

    cy.visit('/');
    cy.get('h1').contains('This is an error page');

    cy.visit('/user');
    cy.get('h1').contains('This is an error page');

    cy.visit('/user/new');
    cy.get('h1').contains('This is an error page');
  });
});
