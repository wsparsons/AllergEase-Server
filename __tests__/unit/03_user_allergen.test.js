const userAllergenModel = require("../../src/models/03_user_allergen");

describe("User Allergen Model", () => {
  describe("getAllUserAllergens()", () => {
    test("getAllUserAllergens function is defined", () => {
      expect(userAllergenModel.getAllUserAllergens).toBeDefined();
    });

    test("should return a list of all user's allergens and aliases given user id", async () => {
      const response = await userAllergenModel.getAllUserAllergens(1);

      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toBeInstanceOf(Object);
      expect(response[0]).toMatchObject({
        id: expect.any(Number),
        allergy: expect.any(String),
        user_id: expect.any(Number),
        allergen_id: expect.any(Number),
        aliases: expect.any(Array)
      });
    });
  });

  describe("findUserAllergen()", () => {
    test("findUserAllergen function is defined", () => {
      expect(userAllergenModel.findUserAllergen).toBeDefined();
    });

    test("should return a list of user's allergens and aliases when given user id and list id", async () => {
      const response = await userAllergenModel.findUserAllergen(1, 1);

      expect(response).toBeInstanceOf(Object);
      expect(response).toMatchObject({
        id: expect.any(Number),
        allergy: expect.any(String),
        user_id: expect.any(Number),
        allergen_id: expect.any(Number),
        aliases: expect.any(Array)
      });
    });

    test("should return an error when given user id and wrong list id", async () => {
      await expect(
        userAllergenModel.findUserAllergen(1, -1)
      ).rejects.toMatchObject({
        message: "userAllergenListNotFound"
      });
    });
  });

  describe("createUserAllergen()", () => {
    test("createUserAllergen function is defined", () => {
      expect(userAllergenModel.createUserAllergen).toBeDefined();
    });

    test("should return a list of user's allergens and aliases when given user id and allergen id", async () => {
      let userId = 1;
      let userAllergenId = 10;

      const startLength = await userAllergenModel.getAllUserAllergens(userId);

      const response = await userAllergenModel.createUserAllergen(
        userId,
        userAllergenId
      );

      const endLength = await userAllergenModel.getAllUserAllergens(userId);

      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toBeInstanceOf(Object);
      expect(response[0]).toMatchObject({
        id: expect.any(Number),
        user_id: expect.any(Number),
        allergen_id: expect.any(Number)
      });
      expect(endLength.length).toEqual(startLength.length + 1);
    });

    test("should return an error if user id is invalid or missing", async () => {
      await expect(
        userAllergenModel.createUserAllergen(null, 5)
      ).rejects.toMatchObject({
        message: "unauthorizedAccess"
      });
    });

    test("should return an error if allergen id is invalid or missing", async () => {
      await expect(
        userAllergenModel.createUserAllergen(1, null)
      ).rejects.toMatchObject({
        message: "allergenNotFound"
      });
    });
  });

  describe("deleteUserAllergen()", () => {
    test("deleteUserAllergen function is defined", () => {
      expect(userAllergenModel.deleteUserAllergen).toBeDefined();
    });

    test("should delete a list when given user id and list id", async () => {
      let userId = 1;
      let userAllergenListId = 1;

      const startLength = await userAllergenModel.getAllUserAllergens(userId);

      const response = await userAllergenModel.deleteUserAllergen(
        userId,
        userAllergenListId
      );

      const endLength = await userAllergenModel.getAllUserAllergens(userId);

      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toBeInstanceOf(Object);
      expect(response[0]).toMatchObject({
        id: expect.any(Number),
        user_id: expect.any(Number),
        allergen_id: expect.any(Number)
      });
      expect(endLength.length).toEqual(startLength.length - 1);
    });

    test("should return an error if user id is invalid or missing", async () => {
      await expect(
        userAllergenModel.deleteUserAllergen(null, 5)
      ).rejects.toMatchObject({
        message: "unauthorizedAccess"
      });
    });

    test("should return an error if list id is invalid or missing", async () => {
      await expect(
        userAllergenModel.deleteUserAllergen(1, null)
      ).rejects.toMatchObject({
        message: "userAllergenListNotFound"
      });
    });
  });
});
