const app = require("../../src/app");
const request = require("supertest");

describe("/api/allergens", () => {
  describe("GET /api/allergens", () => {
    test("should return a list of all the allergens with their aliases", async () => {
      const response = await request(app).get(`/api/allergens`);

      expect(response.status).toEqual(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.response).toBeInstanceOf(Array);
      expect(response.body.response.length).toEqual(10);
    });
  });
});
