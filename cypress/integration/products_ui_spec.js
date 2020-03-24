describe("Css test for app", () => {

    it("Should have rgb(35, 31, 32) background-color", () => {

        cy.visit("http://localhost:8000/")

        cy.get("body").should("have.css", "background-color", "rgb(35, 31, 32)")

    })
})

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

        cy.get("input[type='email']").type("ulrikaa91@hotmail.com")

        cy.get("input[type='password']").type("123")

        cy.get("button[type='submit']").click()

        cy.visit("http://localhost:8000/productpage/5e60cb57aaa6e978f87630fd")

        cy.contains("Lägg till i kundvagn").click()
    })
})