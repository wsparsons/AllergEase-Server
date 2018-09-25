const allergensModel = require("../../src/models/allergens");

describe("Allergens Model", () => {
  describe("getAllAllergens()", () => {
    test("getAllAllergens function is defined", () => {
      expect(allergensModel.getAllAllergens).toBeDefined();
    });

    test("should return an array of allergens", async () => {
      const response = await allergensModel.getAllAllergens();

      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toMatchObject({
        id: expect.any(Number),
        allergy: expect.any(String)
        // aliases: expect.any(Array)
      });
    });
  });

  describe("getOneAllergen()", () => {
    test("getOneAllergen function is defined", () => {
      expect(allergensModel.getOneAllergen).toBeDefined();
    });

    test("should return an allergen when given an id", async () => {
      const response = await allergensModel.getOneAllergen(1);

      expect(response).toMatchObject({
        id: expect.any(Number),
        allergy: expect.any(String)
        // aliases: expect.any(Array)
      });
    });

    test("should return an error if id is invalid", async () => {
      await expect(allergensModel.getOneAllergen()).rejects.toMatchObject({
        message: "allergenNotFound"
      });

      await expect(allergensModel.getOneAllergen(-1)).rejects.toMatchObject({
        message: "allergenNotFound"
      });

      await expect(allergensModel.getOneAllergen("one")).rejects.toMatchObject({
        message: "allergenNotFound"
      });

      await expect(allergensModel.getOneAllergen(100000)).rejects.toMatchObject(
        {
          message: "allergenNotFound"
        }
      );
    });
  });

  describe("createAllergen()", () => {
    test("createAllergen function is defined", () => {
      expect(allergensModel.createAllergen).toBeDefined();
    });

    test("should create a new allergen", async () => {
      const garlic = { allergy: "garlic" };
      const startLength = await allergensModel.getAllAllergens();
      const response = await allergensModel.createAllergen(garlic);
      const endLength = await allergensModel.getAllAllergens();

      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toBeInstanceOf(Object);
      expect(response[0]).toMatchObject(garlic);
      expect(response[0]).toMatchObject({
        id: expect.any(Number),
        allergy: expect.any(String)
      });
      expect(endLength.length).toEqual(startLength.length + 1);
    });

    test("should return an error if body has invalid or missing params", async () => {
      await expect(allergensModel.createAllergen({})).rejects.toMatchObject({
        message: "allergyFieldRequired"
      });

      await expect(allergensModel.createAllergen({})).rejects.toMatchObject({
        message: "allergyFieldRequired"
      });
      await expect(
        allergensModel.createAllergen({ allergies: "garlic" })
      ).rejects.toMatchObject({ message: "allergyFieldRequired" });
      await expect(
        allergensModel.createAllergen({ allergies: "garlic", name: "garlic" })
      ).rejects.toMatchObject({ message: "allergyFieldRequired" });
    });
  });

  describe("updateAllergen()", () => {
    test("updateAllergen function should exists", () => {
      expect(allergensModel.updateAllergen).toBeDefined();
    });

    test("should update the allergen with given params", async () => {
      const response = await allergensModel.updateAllergen(1, {
        allergy: "peanuts"
      });

      const peanuts = { id: 1, allergy: "peanuts" };

      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toBeInstanceOf(Object);
      expect(response[0]).toMatchObject(peanuts);
      expect(response[0]).toMatchObject({
        id: expect.any(Number),
        allergy: expect.any(String)
      });
      expect(response[0].id).toEqual(peanuts.id);
      expect(response[0].allergy).toEqual(peanuts.allergy);
    });

    test("should return an error if id is invalid or missing", async () => {
      const peanuts = { allergy: "peanuts" };

      await expect(
        allergensModel.updateAllergen("1", peanuts)
      ).rejects.toMatchObject({ message: "allergenNotFound" });
      await expect(
        allergensModel.updateAllergen(100000, peanuts)
      ).rejects.toMatchObject({ message: "allergenNotFound" });
      await expect(
        allergensModel.updateAllergen(-1, peanuts)
      ).rejects.toMatchObject({ message: "allergenNotFound" });
      await expect(
        allergensModel.updateAllergen(null, peanuts)
      ).rejects.toMatchObject({ message: "allergenNotFound" });
    });

    test("should return an error if body has invalid or missing params", async () => {
      const peanuts = { allergy: "peanuts" };

      await expect(allergensModel.updateAllergen(1, {})).rejects.toMatchObject({
        message: "allergyFieldRequired"
      });
      await expect(
        allergensModel.updateAllergen(1, { allergies: "garlic" })
      ).rejects.toMatchObject({ message: "allergyFieldRequired" });
      await expect(
        allergensModel.updateAllergen(1, {
          allergies: "garlic",
          name: "garlic"
        })
      ).rejects.toMatchObject({ message: "allergyFieldRequired" });
    });
  });

  describe("deleteAllergen()", () => {
    test("deleteAllergen function should exists", () => {
      expect(allergensModel.deleteAllergen).toBeDefined();
    });

    test("should delete an allergen when given an id", async () => {
      const startLength = await allergensModel.getAllAllergens();
      const response = await allergensModel.deleteAllergen(1);
      const endLength = await allergensModel.getAllAllergens();
      const peanut = { id: 1, allergy: "peanut" };

      expect(endLength.length).toEqual(startLength.length - 1);
      expect(response[0]).toMatchObject(peanut);
      expect(response[0]).toMatchObject({
        id: expect.any(Number),
        allergy: expect.any(String)
      });
    });
  });
});
