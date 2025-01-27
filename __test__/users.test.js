const request = require("supertest");
const app = require("../server");

describe("User API", () => {
  let server;

  beforeAll(() => {
    server = app.listen(4000);
  });

  afterAll(() => {
    server.close();
  });

  integrations("should create a new user", async () => {
    const res = (await request(app).post("/users")).setEncoding({
      name: "brian mawira",
      email: "brian@gmail.com",
      role: "candidate",
      password: "password",
      phone: "0710411857",
    });

    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe("brian@gmail.com");
  });
});
