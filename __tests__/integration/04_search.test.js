const app = require("../../src/app");
const request = require("supertest");

describe("/api/users/:userId/barcode", () => {
  describe("POST /api/users/:userId/barcode", () => {
    test("should return a list of user's allergens and aliases", async () => {
      const user = {
        email: "super@man.com",
        password: "password"
      };
      const loginResponse = await request(app)
        .post(`/api/users/login`)
        .send(user);

      const barcode = {
        barcode: "768395486389"
      };

      const response = await request(app)
        .post(`/api/users/${loginResponse.body.user.userId}/barcode`)
        .send(barcode)
        .set("Authorization", `Bearer ${loginResponse.body.token}`);

      expect(response.status).toEqual(201);
      expect(response.body).toBeInstanceOf(Object);
    });

    test("should return if product barcode is not found", async () => {
      const user = {
        email: "super@man.com",
        password: "password"
      };
      const loginResponse = await request(app)
        .post(`/api/users/login`)
        .send(user);

      const barcode = {
        barcode: "768395486389abc"
      };

      const response = await request(app)
        .post(`/api/users/${loginResponse.body.user.userId}/barcode`)
        .send(barcode)
        .set("Authorization", `Bearer ${loginResponse.body.token}`);

      expect(response.status).toEqual(400);
      expect(response.body).toMatchObject({
        status: 400,
        message: "USDA product is not found"
      });
    });

    test("should return if product barcode is missing", async () => {
      const user = {
        email: "super@man.com",
        password: "password"
      };
      const loginResponse = await request(app)
        .post(`/api/users/login`)
        .send(user);

      const barcode = {
        barcode: null
      };

      const response = await request(app)
        .post(`/api/users/${loginResponse.body.user.userId}/barcode`)
        .send(barcode)
        .set("Authorization", `Bearer ${loginResponse.body.token}`);

      expect(response.status).toEqual(400);
      expect(response.body).toMatchObject({
        status: 400,
        message: "Product barcode is required"
      });
    });
  });
});
