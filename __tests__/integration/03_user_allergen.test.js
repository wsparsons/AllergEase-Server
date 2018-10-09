const app = require("../../src/app");
const request = require("supertest");

describe("/api/users/:userId/allergens", () => {
  describe("GET /api/users/:userId/allergens", () => {
    test("should return a list of user's allergens and aliases", async () => {
      const user = {
        email: "super@man.com",
        password: "password"
      };
      const loginResponse = await request(app)
        .post(`/api/users/login`)
        .send(user);

      const response = await request(app)
        .get(`/api/users/${loginResponse.body.user.userId}/allergens`)
        .set("Authorization", `Bearer ${loginResponse.body.token}`);

      expect(response.status).toEqual(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.response).toBeInstanceOf(Array);
    });

    test("should return an error if no token is sent", async () => {
      const user = {
        email: "super@man.com",
        password: "password"
      };
      const loginResponse = await request(app)
        .post(`/api/users/login`)
        .send(user);

      const response = await request(app).get(
        `/api/users/${loginResponse.body.user.userId}/allergens`
      );

      expect(response.status).toEqual(401);
      expect(response.body.user).toBeFalsy();
      expect(response.body).toMatchObject({
        status: 401,
        message: "Session has expired. Please login again"
      });
    });
  });

  describe("POST /api/users/:userId/allergens/:userAllergenId", () => {
    test("should return a list of user's allergens and aliases", async () => {
      const user = {
        email: "super@man.com",
        password: "password"
      };
      const loginResponse = await request(app)
        .post(`/api/users/login`)
        .send(user);

      let userAllergenId = 10;

      const response = await request(app)
        .post(
          `/api/users/${
            loginResponse.body.user.userId
          }/allergens/${userAllergenId}`
        )
        .set("Authorization", `Bearer ${loginResponse.body.token}`);

      expect(response.status).toEqual(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.response).toBeInstanceOf(Array);
      expect(response.body.response[0]).toMatchObject({
        id: expect.any(Number),
        user_id: expect.any(Number),
        allergen_id: expect.any(Number)
      });
    });

    test("should return an error if no token is sent", async () => {
      const user = {
        email: "super@man.com",
        password: "password"
      };
      const loginResponse = await request(app)
        .post(`/api/users/login`)
        .send(user);

      let userAllergenId = 10;

      const response = await request(app).post(
        `/api/users/${
          loginResponse.body.user.userId
        }/allergens/${userAllergenId}`
      );

      expect(response.status).toEqual(401);
      expect(response.body.user).toBeFalsy();
      expect(response.body).toMatchObject({
        status: 401,
        message: "Session has expired. Please login again"
      });
    });

    test("should return an error if allergen id is invalid or misssing", async () => {
      const user = {
        email: "super@man.com",
        password: "password"
      };
      const loginResponse = await request(app)
        .post(`/api/users/login`)
        .send(user);

      let userAllergenId = -1;

      const response = await request(app)
        .post(
          `/api/users/${
            loginResponse.body.user.userId
          }/allergens/${userAllergenId}`
        )
        .set("Authorization", `Bearer ${loginResponse.body.token}`);

      expect(response.status).toEqual(404);
      expect(response.body.user).toBeFalsy();
      expect(response.body).toMatchObject({
        status: 404,
        message: "Allergen with provided ID is not found"
      });
    });
  });

  describe("DELETE /api/users/:userId/allergens/:userAllergenListId", () => {
    test("should delete a list when given user id and list id", async () => {
      const user = {
        email: "super@man.com",
        password: "password"
      };
      const loginResponse = await request(app)
        .post(`/api/users/login`)
        .send(user);

      let userAllergenListId = 1;

      const response = await request(app)
        .delete(
          `/api/users/${
            loginResponse.body.user.userId
          }/allergens/${userAllergenListId}`
        )
        .set("Authorization", `Bearer ${loginResponse.body.token}`);

      expect(response.status).toEqual(202);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.response).toBeInstanceOf(Array);
      expect(response.body.response[0]).toMatchObject({
        id: expect.any(Number),
        user_id: expect.any(Number),
        allergen_id: expect.any(Number)
      });
    });

    test("should return an error if user is not authorized to delete the list", async () => {
      const user = {
        email: "super@man.com",
        password: "password"
      };
      const loginResponse = await request(app)
        .post(`/api/users/login`)
        .send(user);

      let userAllergenListId = 4;

      const response = await request(app)
        .delete(
          `/api/users/${
            loginResponse.body.user.userId
          }/allergens/${userAllergenListId}`
        )
        .set("Authorization", `Bearer ${loginResponse.body.token}`);

      expect(response.status).toEqual(401);
      expect(response.body.user).toBeFalsy();
      expect(response.body).toMatchObject({
        status: 401,
        message: "You are not authorized to access this route"
      });
    });

    test("should return an error if list id is invalid or missing", async () => {
      const user = {
        email: "super@man.com",
        password: "password"
      };
      const loginResponse = await request(app)
        .post(`/api/users/login`)
        .send(user);

      let userAllergenListId = -1;

      const response = await request(app)
        .delete(
          `/api/users/${
            loginResponse.body.user.userId
          }/allergens/${userAllergenListId}`
        )
        .set("Authorization", `Bearer ${loginResponse.body.token}`);

      expect(response.status).toEqual(401);
      expect(response.body.user).toBeFalsy();
      expect(response.body).toMatchObject({
        status: 401,
        message: "Session has expired. Please login again"
      });
    });

    test("should return an error if no token is sent", async () => {
      const user = {
        email: "super@man.com",
        password: "password"
      };
      const loginResponse = await request(app)
        .post(`/api/users/login`)
        .send(user);

      let userAllergenListId = 1;

      const response = await request(app).delete(
        `/api/users/${
          loginResponse.body.user.userId
        }/allergens/${userAllergenListId}`
      );

      expect(response.status).toEqual(401);
      expect(response.body.user).toBeFalsy();
      expect(response.body).toMatchObject({
        status: 401,
        message: "You are not authorized to access this route"
      });
    });
  });
});
