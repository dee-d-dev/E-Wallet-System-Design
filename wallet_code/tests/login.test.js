const login_user = require("../controllers/login_user.controller");
const request = require("supertest");

describe("test user login", () => {
  it("should log user in", async () => {
    const login = await request(login_user).post("/login").send({
      email: "email",
      password: "password",
    });
    expect(login.statusCode).toBe(200);
  });
});
