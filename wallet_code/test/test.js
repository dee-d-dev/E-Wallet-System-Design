const chai = require("chai");
const chaihttp = require("chai-http");
const server = require("../app");

should = chai.should();
let expect = chai.expect;
chai.use(chaihttp);

describe("TEST FOR WALLET", () => {
  //test CREATE WALLET
  describe("CREATE /create", () => {
    it("register user", (done) => {
      const info = {
        name: "adde",
        email: "adde@gmail.com",
        password: "test",
      };
      chai
        .request(server)
        .post("/api/v1/register")
        .send(info)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          // response.body.should.have.property("login");
          // response.body.should.have.property("token");
          done();
        });
    });
  });
});
