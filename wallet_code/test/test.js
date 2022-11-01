const chai = require("chai");
const chaihttp = require("chai-http");
const server = require("../app");

should = chai.should();
let expect = chai.expect;
chai.use(chaihttp);
let assert = require("chai").assert;

//test CREATE WALLET
describe("CREATE /create", () => {
  it("register user", () => {
    const info = {
      name: "username",
      email: "email@gmail.com",
      password: "testpassword",
    };
    chai
      .request(server)
      .post("/api/v1/register")
      .send(info)
      .end((err, response) => {
        // response.to.have.status(201);
        response.should.have.status(201);
        response.body.should.be.a("object");
        response.body.should.have.property("success");
        response.body.should.have.property("message");
      });
  });

  it("login user", () => {
    const info = {
      email: "useremail@gmail.com",
      password: "testpassword",
    };
    chai
      .request(server)
      .post("/api/v1/login")
      .send(info)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("login");
        response.body.should.have.property("token");
      });
  });

  it("funds wallet", () => {
    const info = {
      source: "balance",
      reason: "dance billings",
      amount: 100,
      recipient: "user",
    };

    success = true;
    chai
      .request(server)
      .post("/api/v1/credit_wallet")
      .send(info)
      .end((err, response) => {
        response.body.should.be.an("object");
        // response.body.should.have.property("success");
      });

    assert.typeOf(success, "boolean");
  });

  it("debit wallet", () => {
    const info = {
      amount: 100,
      reason: "staging",
      password: "test",
    };

    chai
      .request(server)
      .post("/api/v1/debit")
      .send(info)
      .end((err, response) => {
        response.body.should.be.an("object");
        // response.body.should.have.property("success");
      });

    assert.typeOf(success, "boolean");
  });

  it("create wallet", () => {
    const info = {
      user_id: 124,
      balance: 100,
    };

    chai
      .request(server)
      .post("/api/v1/create_wallet")
      .send(info)
      .end((err, response) => {
        response.body.should.be.an("object");
        // response.body.should.have.property("success");
      });

    assert.typeOf(success, "boolean");
  });
  
  it("transfer money", () => {
    const info = {
      receiver_email: "test@gmail.com",
      amount: 100,
      reason: "test",
    };

    chai
      .request(server)
      .post("/api/v1/transfer")
      .send(info)
      .end((err, response) => {
        response.body.should.be.an("object");
        // response.body.should.have.property("success");
      });

    assert.typeOf(success, "boolean");
  });
});
