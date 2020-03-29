const request = require("supertest")
const productRouter = require("../router/productpage")

describe("Product router testing", () => {
    it("Should be testing create product router", (done) => {
        request(productRouter).get("/createProduct")
            .send({})
            .expect(200)
        done()
    })

    it("Should render all products", (done) => {
        request(productRouter).get("/products")
            .send("products.ejs", {})
            .expect(200)
        done()
    })
})