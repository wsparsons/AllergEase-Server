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

  describe("findAllergen()", () => {
    test("findAllergen function is defined", () => {
      expect(allergensModel.findAllergen).toBeDefined();
    });

    test("should return an allergen when given an id", async () => {
      const response = await allergensModel.findAllergen(1);

      expect(response).toMatchObject({
        id: expect.any(Number),
        allergy: expect.any(String)
        // aliases: expect.any(Array)
      });
    });

    test("should return an error if id is invalid or missing", async () => {
      await expect(allergensModel.findAllergen()).rejects.toMatchObject({
        message: "allergenNotFound"
      });

      await expect(allergensModel.findAllergen(-1)).rejects.toMatchObject({
        message: "allergenNotFound"
      });

      await expect(allergensModel.findAllergen("one")).rejects.toMatchObject({
        message: "allergenNotFound"
      });

      await expect(allergensModel.findAllergen(100000)).rejects.toMatchObject({
        message: "allergenNotFound"
      });
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
      await expect(
        allergensModel.createAllergen({ allergy: null })
      ).rejects.toMatchObject({
        message: "allergenAllergyRequired"
      });
      await expect(
        allergensModel.createAllergen({ allergy: "garlic", name: "garlic" })
      ).rejects.toMatchObject({
        message: "allergenFieldRequired"
      });
      await expect(
        allergensModel.createAllergen({ allergies: "garlic" })
      ).rejects.toMatchObject({ message: "allergenAllergyRequired" });
      await expect(
        allergensModel.createAllergen({ allergies: "garlic", name: "garlic" })
      ).rejects.toMatchObject({ message: "allergenAllergyRequired" });
    });
  });

  describe("updateAllergen()", () => {
    test("updateAllergen function is defined", () => {
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
        message: "allergenAllergyRequired"
      });
      await expect(allergensModel.updateAllergen(1, {allergy: null})).rejects.toMatchObject({
        message: "allergenAllergyRequired"
      });
      await expect(
        allergensModel.updateAllergen(1, { allergy: "garlic", name: "garlic" })
      ).rejects.toMatchObject({
        message: "allergenFieldRequired"
      });
      await expect(
        allergensModel.updateAllergen(1, { allergies: "garlic" })
      ).rejects.toMatchObject({ message: "allergenAllergyRequired" });
      await expect(
        allergensModel.updateAllergen(1, {
          allergies: "garlic",
          name: "garlic"
        })
      ).rejects.toMatchObject({ message: "allergenAllergyRequired" });
    });
  });

  describe("deleteAllergen()", () => {
    test("deleteAllergen function is defined", () => {
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

    test("should return an error if id is invalid or missing", async () => {
      await expect(allergensModel.deleteAllergen("1")).rejects.toMatchObject({
        message: "allergenNotFound"
      });
      await expect(allergensModel.deleteAllergen(null)).rejects.toMatchObject({
        message: "allergenNotFound"
      });
      await expect(allergensModel.deleteAllergen(-1)).rejects.toMatchObject({
        message: "allergenNotFound"
      });
      await expect(allergensModel.deleteAllergen(100000)).rejects.toMatchObject(
        { message: "allergenNotFound" }
      );
    });
  });
});
