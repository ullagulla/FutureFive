describe("UI test for product page", () => {

    it("Should load product page", () => {

        cy.visit("http://localhost:8000/")

        cy.contains("Produkter").click()

        cy.url().should("include", "/products")
    })

})

describe("Add product to cart after logging in", () => {

    it("Should login, go to product page, and add the specific product to cart", () => {

        cy.visit("http://localhost:8000/signin")

        cy.get(".login-email").type("ulrikaa91@hotmail.com")

        cy.get("input[type='password']").type("Cocacola1")

        cy.get(".login-btn").click()

        cy.visit("http://localhost:8000/productpage/5e60cb57aaa6e978f87630fd")

        cy.contains("Lägg till i kundvagn").click()
    })
})