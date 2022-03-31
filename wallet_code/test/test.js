const chai = require("chai");
const chaihttp = require("chai-http");
const server = require("../app");

should = chai.should();
let expect = chai.expect;
chai.use(chaihttp);

//test CREATE WALLET
describe("CREATE /create", () => {
  it("register user", () => {
    const info = {
      name: "godabeg2",
      email: "worknow2@gmail.com",
      password: "test",
    };
    chai
      .request(server)
      .post("/api/v1/register")
      .send(info)
      .end((err, response) => {
        // response.to.have.status(201);
        response.should.have.status(201);
        // response.body.should.be.a("object");
        // response.body.should.have.property("login");
        // response.body.should.have.property("token");
        
      });
  });

  it("login user", () => {
    const info = {
      email: "user2@gmail.com",
      password: "test",
    };
    chai
      .request(server)
      .post("/api/v1/login")
      .send(info)
      .end((err, response) => {
        response.should.have.status(200);
      });
  });
});
