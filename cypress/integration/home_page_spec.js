describe('Home page', function() {
  it('has a title', function() {
    cy.visit('/');
    cy.get('h1').should('contain', 'Plenty of Dish');
  });
});
