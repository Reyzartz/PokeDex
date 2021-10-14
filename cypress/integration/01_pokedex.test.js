/// <reference types="cypress" />

context("PokeDex", () => {
  before(() => {
    cy.viewport("macbook-13");
    cy.visit(Cypress.env("baseURL"));
    cy.clearLocalStorage();
  });

  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  it("Check if Pokemons are loaded", () => {
    cy.getByTestId("pokemon-card").should("have.length", 16);
    cy.getByTestId("pokemon-card").first().should("include.text", "bulbasaur");
  });

  it("Search for Pokemons", () => {
    cy.getByTestId("search-input").should("exist");

    let searchInput;
    // checking Search with correct Input
    searchInput = "char";
    cy.getByTestId("search-input").type(searchInput);
    cy.getByTestId("search-autocomplete")
      .children()
      .should("have.length.gt", 0);
    cy.getByTestId("search-autocomplete-options").should(
      "include.text",
      searchInput
    );
    cy.getByTestId("search-autocomplete-options").should(
      "include.text",
      "charizard"
    );

    // checking Search with wrong Input
    searchInput = "tsdjywv";
    cy.getByTestId("search-input").clear().type(searchInput);
    cy.getByTestId("search-autocomplete").children().should("have.length", 0);

    //check Autocomplete
    searchInput = "MEOWTH";
    cy.getByTestId("search-input").clear().type(searchInput);
    cy.getByTestId("search-autocomplete").contains(searchInput).click();
    cy.getByTestId("search-autocomplete").should("not.exist");

    //check search Btn
    searchInput = "NINETALES";
    cy.getByTestId("search-input").clear().type(searchInput);
    cy.getByTestId("search-btn").click();
    cy.getByTestId("search-autocomplete").should("not.exist");
  });

  it("Check local Storage Feature", () => {
    //Writing a search term to store in local storage
    let searchInput = "mew";
    cy.getByTestId("search-input").clear().type(searchInput);
    cy.getByTestId("search-autocomplete")
      .children()
      .should("have.length.gt", 0);
    cy.getByTestId("search-autocomplete-options").should(
      "include.text",
      searchInput
    );

    //revisiting to check if local storage is present or not
    cy.reload();
    cy.getByTestId("search-autocomplete")
      .children()
      .should("have.length.gt", 0);
    cy.getByTestId("search-autocomplete-options").should(
      "include.text",
      searchInput
    );
  });
});
