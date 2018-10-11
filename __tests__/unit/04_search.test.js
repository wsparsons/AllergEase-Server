const searchModel = require("../../src/models/04_search");

describe("Search Model", () => {
  describe("findProductValence()", () => {
    test("findProductValence function is defined", () => {
      expect(searchModel.findProductValence).toBeDefined();
    });

    test("should return valence and product info when userId is valid and product barcode is valid and found", async () => {
      let userId = 1;
      let barcode = { barcode: "768395486389" };
      const response = await searchModel.findProductValence(userId, barcode);

      expect(response).toBeInstanceOf(Object);
      expect(response).toMatchObject({
        valence: expect.any(Boolean),
        product: expect.any(Object),
        found: expect.any(String)
      });
      expect(response.product).toMatchObject({
        name: expect.any(String),
        ndbno: expect.any(String),
        barcode: expect.any(String),
        ingredients: expect.any(String),
        manufacturer: expect.any(String),
        image: expect.any(String)
      });
    });

    test("should return an error if product barcode is not found ", async () => {
      let userId = 1;
      let barcode = { barcode: "768395486389abc" };

      await expect(
        searchModel.findProductValence(userId, barcode)
      ).rejects.toMatchObject({
        message: "usdaProductNotFound"
      });
    });

    test("should return an error if userId is missing or invalid", async () => {
      let userId = null;
      let barcode = { barcode: "768395486389" };

      await expect(
        searchModel.findProductValence(userId, barcode)
      ).rejects.toMatchObject({
        message: "unauthorizedAccess"
      });
    });

    test("should return an error if product barcode is not invalid or missing ", async () => {
      let userId = 1;
      let barcode = { barcode: null };

      await expect(
        searchModel.findProductValence(userId, barcode)
      ).rejects.toMatchObject({
        message: "barcodeRequired"
      });
    });
  });
});
