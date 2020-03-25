describe("Css test for app", () => {

    it("Should have rgb(35, 31, 32) background-color", () => {

        cy.visit("http://localhost:8000/")

        cy.get("body").should("have.css", "background-color", "rgb(35, 31, 32)")

    })
})