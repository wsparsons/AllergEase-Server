const allergensModel = require("../../src/models/02_allergens");

describe("Allergens Model", () => {
  describe("getAllAllergensAliases()", () => {
    test("getAllAllergensAliases function is defined", () => {
      expect(allergensModel.getAllAllergensAliases).toBeDefined();
    });

    test("should return an array of allergens", async () => {
      const response = await allergensModel.getAllAllergensAliases();

      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toMatchObject({
        id: expect.any(Number),
        allergy: expect.any(String),
        aliases: expect.any(Array)
      });
    });
  });
});
