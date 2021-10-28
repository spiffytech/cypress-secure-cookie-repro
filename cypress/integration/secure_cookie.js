describe("Secure cookie", () => {
  it("Displays the cookie after it's been set", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-cy=no-cookie]").should(
      "have.text",
      "Request didn't have a cookie"
    );
    cy.reload();
    cy.get("[data-cy=cookie]").should("include.text", "Cookie value:");
  });
});
