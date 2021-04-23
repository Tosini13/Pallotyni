describe("News forms", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/news");
  });

  it("should to have button and open create news form", () => {
    cy.contains("News");
    cy.get("button").contains("Add").click({ force: true });
    cy.get(".MuiDialog-paper form h2").contains("Create News");
  });

  it("should to open edit news form", () => {
    cy.contains("News");
    cy.get("button").contains("Edit").click({ force: true });
    cy.get('div[edition="true"]').first().click({ force: true });
    cy.get(".MuiDialog-paper form h2").contains("Edit News");
  });

  it("should be able to delete news", () => {
    cy.contains("News");
    cy.get("button").contains("Delete").click({ force: true });
    cy.get('div[edition="true"]').first().click({ force: true });
    cy.get(".MuiDialog-paper h2").contains("Do you want to delete?");
  });
});
