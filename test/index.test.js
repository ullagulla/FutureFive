const app = require("../index");
const productRouter = require("../router/productpage");
const request = require("supertest");

describe("home router testing", () => {
    // cy.visit("http://localhost:8000/thankyou")
    it("tests home router", (done) => {
        request(app)
            .get("/")
            .expect(200)
            .expect(/Welcome user/, done)
    })
})





module.exports = app;