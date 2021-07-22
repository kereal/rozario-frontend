describe("hero input", () => {
  beforeEach(() => {});
  it("run all stages flow", () => {
    cy.visit("/");
    cy.wait(600);
    cy.contains("Выберите повод").click({ force: true });
    cy.wait(600);
    cy.contains("День рождения").click({ force: true });
    cy.get("#hero-input-occasion-icon-text").should("contain", "День рождения");
    cy.wait(600);
    cy.contains("Маме").click({ force: true });
    cy.get("#hero-input-person-icon-text").should("contain", "Маме");
    cy.wait(600);
    cy.contains("До 2000").click({ force: true });
    cy.get("#hero-input-price-icon-text").should("contain", "До 2000");
    cy.wait(600);
    cy.contains("микс").click({ force: true });
    cy.get("#hero-input-flower-icon-text").should("contain", "микс");
  });
});
