describe("country dropdown", () => {
  it("clicks on currency", () => {
    cy.visit("/");
    cy.wait(600);
    cy.get('[data-cy="country-dropdown"]').click();
    cy.wait(600);
    cy.get('[data-cy="country-dropdown__button-sel-dollar"]').click();
    cy.get('[data-cy="country-dropdown"]').click();
  });
  it("clicks on country", () => {
    cy.get('[data-cy="country-dropdown"]').click();
    cy.wait(600);
    cy.get('[data-cy="country-dropdown__next"]').click();
    cy.get('img[alt="Английский"]')
      .should("have.attr", "src")
      .should("include", "united-states-of-america-flag-icon-32.png");
    cy.get('[data-cy="country-dropdown"]').click();
  });
});

describe("city autocomplete", () => {
  it("autocomplete gets input", () => {
    cy.get('button[data-cy="city-select-button"]').click()
    cy.wait(600)
    cy.get('input[name="autocomplete"]').type('Москва')
  })
})
