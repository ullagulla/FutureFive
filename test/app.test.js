const mocha = require("mocha")
const request = require("supertest")
const app = require("../index")

describe("Load page when entering url", () => {

    it("Should respond to /", (done) => {
        request(app)
        .get("/")
        .expect(200, done)
    })

    it("Should redirect to 404 page on a non-existent page", (done) => {
        request(app)
        .get("/ensidasomintefinns")
        .expect(404, done)
    })
})

// describe("", () => {
//     it("Should contain redirect to products.ejs", (done) => {

//     })
// })