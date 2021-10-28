describe("Secure cookie (same page)", () => {
  it("Displays the cookie after it's been set", () => {
    cy.visit("http://localhost:3000/set-and-show");
    cy.get("[data-cy=no-cookie]").should("have.text", "Cookie has been set");
    cy.reload();
    cy.get("[data-cy=cookie]")
      .should("include.text", "Cookie value:")
      .should("not.include.text", "undefined");
  });
});

/**
 * Cypress does not transmit the cookie if it was set on a different page than
 * the one we're viewing
 */
describe("Secure cookie (different page)", () => {
  it("Displays the cookie after it's been set", () => {
    cy.visit("http://localhost:3000/set-cookie");
    cy.visit("http://localhost:3000/");
    cy.get("[data-cy=cookie]")
      .should("include.text", "Cookie value:")
      .should("not.include.text", "undefined");
  });
});
