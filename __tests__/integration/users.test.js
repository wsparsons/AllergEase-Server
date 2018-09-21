const app = require("../../src/app");
const request = require("supertest");

describe("/api/users", () => {
  describe("POST /api/users/signup", () => {
    test("should create a new user with valid information and return a token", async () => {
      const newUser = {
        first_name: "First",
        last_name: "Last",
        email: "example@example.com",
        password: "password"
      };
      const response = await request(app)
        .post(`/api/users/signup`)
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toBeTruthy();
      expect(response.body.token).toBeTruthy();
      expect(response.body.password).toBeFalsy();
    });

    test("should return an error if user is registering with an existing email", async () => {
      const newUser = {
        first_name: "First",
        last_name: "Last",
        email: "super@man.com",
        password: "password"
      };
      const response = await request(app)
        .post(`/api/users/signup`)
        .send(newUser);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        status: 400,
        message: "User could not be registered"
      });
    });

    test("should return an error if the first name is missing", async () => {
      const newUser = {
        last_name: "Last",
        email: "example@example.com",
        password: "password"
      };
      const response = await request(app)
        .post(`/api/users/signup`)
        .send(newUser);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        status: 400,
        message: "User 'first_name' is required"
      });
    });

    test("should return an error if the last name is missing", async () => {
      const newUser = {
        first_name: "First",
        email: "example@example.com",
        password: "password"
      };
      const response = await request(app)
        .post(`/api/users/signup`)
        .send(newUser);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        status: 400,
        message: "User 'last_name' is required"
      });
    });

    test("should return an error if the email is missing", async () => {
      const newUser = {
        first_name: "First",
        last_name: "last",
        password: "password"
      };
      const response = await request(app)
        .post(`/api/users/signup`)
        .send(newUser);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        status: 400,
        message: "User 'email' is required"
      });
    });

    test("should return an error if the password is missing", async () => {
      const newUser = {
        first_name: "First",
        last_name: "last",
        email: "example@example.com"
      };
      const response = await request(app)
        .post(`/api/users/signup`)
        .send(newUser);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        status: 400,
        message: "User 'password' is required"
      });
    });
  });

  describe("POST /api/users/login", () => {
    test("should login the user and return a token", async () => {
      const user = {
        email: "super@man.com",
        password: "password"
      };
      const response = await request(app)
        .post(`/api/users/login`)
        .send(user);

      expect(response.status).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.token).toBeTruthy();
      expect(response.body.password).toBeFalsy();
    });

    test("should return an error if the email is missing", async () => {
      const user = {
        password: "password"
      };
      const response = await request(app)
        .post(`/api/users/login`)
        .send(user);

      expect(response.status).toBe(400);
      expect(response.body.token).toBeFalsy();
      expect(response.body.password).toBeFalsy();
      expect(response.body).toMatchObject({
        status: 400,
        message: "User 'email' is required"
      });
    });

    test("should return an error if the email is missing", async () => {
      const user = {
        email: "super@man.com"
      };
      const response = await request(app)
        .post(`/api/users/login`)
        .send(user);

      expect(response.status).toBe(400);
      expect(response.body.token).toBeFalsy();
      expect(response.body.password).toBeFalsy();
      expect(response.body).toMatchObject({
        status: 400,
        message: "User 'password' is required"
      });
    });

    test("should return an error if user gives wrong email", async () => {
      const user = {
        email: "supersuper@man.com",
        password: "password"
      };

      const response = await request(app)
        .post(`/api/users/login`)
        .send(user);

      expect(response.status).toBe(404);
      expect(response.body.token).toBeFalsy();
      expect(response.body.password).toBeFalsy();
      expect(response.body).toMatchObject({
        status: 404,
        message: "User email or password is invalid"
      });
    });

    test("should return an error if existing user gives wrong password", async () => {
      const user = {
        email: "super@man.com",
        password: "password1"
      };

      const response = await request(app)
        .post(`/api/users/login`)
        .send(user);

      expect(response.status).toBe(404);
      expect(response.body.token).toBeFalsy();
      expect(response.body.password).toBeFalsy();
      expect(response.body).toMatchObject({
        status: 404,
        message: "User email or password is invalid"
      });
    });
  });
});
