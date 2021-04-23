describe("Service forms", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/confessions");
  });

  it("should to have button and open create service form", () => {
    cy.get("button").contains("Add").click({ force: true });
    cy.get(".MuiDialog-paper form h2").contains("Create Confession");
  });

  it("should to open edit service form", () => {
    cy.get("button").contains("Edit").click({ force: true });
    cy.get('p[selectable="true"]').first().click();
    cy.get(".MuiDialog-paper form h2").contains("Edit Confession");
  });

  it("should be able to delete paragraph", () => {
    cy.get("button").contains("Delete").click({ force: true });
    cy.get('p[selectable="true"]').first().click();
    cy.get(".MuiDialog-paper h2").contains("Do you want to delete?");
  });
});
