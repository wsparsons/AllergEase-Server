const productsModel = require("../../src/models/products");

describe("Products Model", () => {
  describe("getAllProducts()", () => {
    test("getAllProducts function is defined", () => {
      expect(productsModel.getAllProducts).toBeDefined();
    });

    test("should return an array of Products", async () => {
      const response = await productsModel.getAllProducts();

      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toBeInstanceOf(Object);
      expect(response[0]).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        ndbno: expect.any(String),
        barcode: expect.any(String),
        ingredients: expect.any(String),
        manufacturer: expect.any(String),
        image: expect.any(String)
      });
    });
  });

  describe("findProduct()", () => {
    test("findProduct function is defined", () => {
      expect(productsModel.findProduct).toBeDefined();
    });

    test("should return an product when given an id", async () => {
      const response = await productsModel.findProduct(1);

      expect(response).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        ndbno: expect.any(String),
        barcode: expect.any(String),
        ingredients: expect.any(String),
        manufacturer: expect.any(String),
        image: expect.any(String)
      });
    });

    test("should return an error if id is invalid or missing", async () => {
      await expect(productsModel.findProduct()).rejects.toMatchObject({
        message: "productNotFound"
      });

      await expect(productsModel.findProduct(-1)).rejects.toMatchObject({
        message: "productNotFound"
      });

      await expect(productsModel.findProduct("one")).rejects.toMatchObject({
        message: "productNotFound"
      });

      await expect(productsModel.findProduct(100000)).rejects.toMatchObject({
        message: "productNotFound"
      });
    });
  });

  describe("createProduct()", () => {
    test("createProduct function is defined", () => {
      expect(productsModel.createProduct).toBeDefined();
    });

    test("should create a new product", async () => {
      const peanutCup = {
        name: "REESE'S, CUPS, PEANUT BUTTER, UPC: 768395486389",
        ndbno: "45153778",
        barcode: "768395486389",
        ingredients:
          "MILK CHOCOLATE (SUGAR; COCOA BUTTER; CHOCOLATE; NONFAT MILK; MILK FAT; LACTOSE; SOY LECITHIN; PGPR, EMULSIFIER); PEANUTS; SUGAR; DEXTROSE; SALT; TBHQ (PRESERVATIVE)",
        manufacturer: "Ross Acquisition Inc.",
        image: "https://binged.it/2NrXsfC"
      };
      const startLength = await productsModel.getAllProducts();
      const response = await productsModel.createProduct(peanutCup);
      const endLength = await productsModel.getAllProducts();

      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toBeInstanceOf(Object);
      expect(response[0]).toMatchObject(peanutCup);
      expect(response[0]).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        ndbno: expect.any(String),
        barcode: expect.any(String),
        ingredients: expect.any(String),
        manufacturer: expect.any(String),
        image: expect.any(String)
      });
      expect(endLength.length).toEqual(startLength.length + 1);
    });

    test("should return an error if body has invalid or missing params", async () => {
      const peanutCup = {
        name: "REESE'S CUPS, PEANUT BUTTER",
        barcode: "768395486389",
        ndbno: "45153778",
        ingredients:
          "MILK CHOCOLATE (SUGAR; COCOA BUTTER; CHOCOLATE; NONFAT MILK; MILK FAT; LACTOSE; SOY LECITHIN; PGPR, EMULSIFIER); PEANUTS; SUGAR; DEXTROSE; SALT; TBHQ (PRESERVATIVE)",
        manufacturer: "Ross Acquisition Inc.",
        image: "https://binged.it/2NrXsfC",
        food: "name of food"
      };
      await expect(
        productsModel.createProduct(peanutCup)
      ).rejects.toMatchObject({
        message: "productFieldRequired"
      });
    });

    test("should return an error if body name has invalid or missing params", async () => {
      const peanutCup = {
        ndbno: "45153778",
        barcode: "768395486389",
        ingredients:
          "MILK CHOCOLATE (SUGAR; COCOA BUTTER; CHOCOLATE; NONFAT MILK; MILK FAT; LACTOSE; SOY LECITHIN; PGPR, EMULSIFIER); PEANUTS; SUGAR; DEXTROSE; SALT; TBHQ (PRESERVATIVE)",
        manufacturer: "Ross Acquisition Inc.",
        image: "https://binged.it/2NrXsfC"
      };
      await expect(
        productsModel.createProduct(peanutCup)
      ).rejects.toMatchObject({
        message: "productNameRequired"
      });
      await expect(
        productsModel.createProduct({
          name: "REESE'S, CUPS, PEANUT BUTTER, UPC: 768395486389",
          ...peanutCup,
          names: "Reeses"
        })
      ).rejects.toMatchObject({
        message: "productFieldRequired"
      });
    });

    test("should return an error if body ndbno has invalid or missing params", async () => {
      const peanutCup = {
        name: "REESE'S CUPS, PEANUT BUTTER",
        barcode: "768395486389",
        ingredients:
          "MILK CHOCOLATE (SUGAR; COCOA BUTTER; CHOCOLATE; NONFAT MILK; MILK FAT; LACTOSE; SOY LECITHIN; PGPR, EMULSIFIER); PEANUTS; SUGAR; DEXTROSE; SALT; TBHQ (PRESERVATIVE)",
        manufacturer: "Ross Acquisition Inc.",
        image: "https://binged.it/2NrXsfC"
      };
      await expect(
        productsModel.createProduct(peanutCup)
      ).rejects.toMatchObject({
        message: "productNdbnoRequired"
      });
      await expect(
        productsModel.createProduct({
          ndbno: "45153778",
          ...peanutCup,
          ndbnos: "45153778"
        })
      ).rejects.toMatchObject({
        message: "productFieldRequired"
      });
    });

    test("should return an error if body barcode has invalid or missing params", async () => {
      const peanutCup = {
        name: "REESE'S, CUPS, PEANUT BUTTER, UPC: 768395486389",
        ndbno: "45153778",
        ingredients:
          "MILK CHOCOLATE (SUGAR; COCOA BUTTER; CHOCOLATE; NONFAT MILK; MILK FAT; LACTOSE; SOY LECITHIN; PGPR, EMULSIFIER); PEANUTS; SUGAR; DEXTROSE; SALT; TBHQ (PRESERVATIVE)",
        manufacturer: "Ross Acquisition Inc.",
        image: "https://binged.it/2NrXsfC"
      };
      await expect(
        productsModel.createProduct(peanutCup)
      ).rejects.toMatchObject({
        message: "productBarcodeRequired"
      });
      await expect(
        productsModel.createProduct({
          barcode: "768395486389",
          ...peanutCup,
          barcodes: "768395486389"
        })
      ).rejects.toMatchObject({
        message: "productFieldRequired"
      });
    });

    test("should return an error if body ingredients has invalid or missing params", async () => {
      const peanutCup = {
        name: "REESE'S CUPS, PEANUT BUTTER",
        barcode: "768395486389",
        ndbno: "45153778",
        manufacturer: "Ross Acquisition Inc.",
        image: "https://binged.it/2NrXsfC"
      };
      await expect(
        productsModel.createProduct(peanutCup)
      ).rejects.toMatchObject({
        message: "productIngredientsRequired"
      });
      await expect(
        productsModel.createProduct({
          ingredients: "45153778",
          ...peanutCup,
          food: "45153778"
        })
      ).rejects.toMatchObject({
        message: "productFieldRequired"
      });
    });

    test("should return an error if body manufacturer has invalid or missing params", async () => {
      const peanutCup = {
        name: "REESE'S CUPS, PEANUT BUTTER",
        barcode: "768395486389",
        ndbno: "45153778",
        ingredients:
          "MILK CHOCOLATE (SUGAR; COCOA BUTTER; CHOCOLATE; NONFAT MILK; MILK FAT; LACTOSE; SOY LECITHIN; PGPR, EMULSIFIER); PEANUTS; SUGAR; DEXTROSE; SALT; TBHQ (PRESERVATIVE)",
        image: "https://binged.it/2NrXsfC"
      };
      await expect(
        productsModel.createProduct(peanutCup)
      ).rejects.toMatchObject({
        message: "productManufacturerRequired"
      });
      await expect(
        productsModel.createProduct({
          manufacturer: "Ross Acquisition Inc.",
          ...peanutCup,
          food: "45153778"
        })
      ).rejects.toMatchObject({
        message: "productFieldRequired"
      });
    });

    test("should return an error if body image has invalid or missing params", async () => {
      const peanutCup = {
        name: "REESE'S CUPS, PEANUT BUTTER",
        barcode: "768395486389",
        ndbno: "45153778",
        ingredients:
          "MILK CHOCOLATE (SUGAR; COCOA BUTTER; CHOCOLATE; NONFAT MILK; MILK FAT; LACTOSE; SOY LECITHIN; PGPR, EMULSIFIER); PEANUTS; SUGAR; DEXTROSE; SALT; TBHQ (PRESERVATIVE)",
        manufacturer: "Ross Acquisition Inc."
      };
      await expect(
        productsModel.createProduct(peanutCup)
      ).rejects.toMatchObject({
        message: "productImageRequired"
      });
      await expect(
        productsModel.createProduct({
          image: "https://binged.it/2NrXsfC",
          ...peanutCup,
          food: "45153778"
        })
      ).rejects.toMatchObject({
        message: "productFieldRequired"
      });
    });
  });

  describe("updateProduct()", () => {
    test("updateProduct function is defined", () => {
      expect(productsModel.updateProduct).toBeDefined();
    });

    test("should update the product with given params", async () => {
      const peanutCup = {
        id: 4,
        name: "reese's cup",
        ndbno: "45153778",
        barcode: "768395486389",
        ingredients:
          "MILK CHOCOLATE (SUGAR; COCOA BUTTER; CHOCOLATE; NONFAT MILK; MILK FAT; LACTOSE; SOY LECITHIN; PGPR, EMULSIFIER); PEANUTS; SUGAR; DEXTROSE; SALT; TBHQ (PRESERVATIVE)",
        manufacturer: "Ross Acquisition Inc.",
        image: "https://binged.it/2NrXsfC"
      };
      const response = await productsModel.updateProduct(4, {
        name: "reese's cup"
      });

      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toBeInstanceOf(Object);
      expect(response[0]).toMatchObject(peanutCup);
      expect(response[0]).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        ndbno: expect.any(String),
        barcode: expect.any(String),
        ingredients: expect.any(String),
        manufacturer: expect.any(String),
        image: expect.any(String)
      });
    });

    test("should return an error if id is invalid or missing", async () => {
      const peanutCup = { name: "reese's cup" };

      await expect(
        productsModel.updateProduct("1", peanutCup)
      ).rejects.toMatchObject({ message: "productNotFound" });
      await expect(
        productsModel.updateProduct(100000, peanutCup)
      ).rejects.toMatchObject({ message: "productNotFound" });
      await expect(
        productsModel.updateProduct(-1, peanutCup)
      ).rejects.toMatchObject({ message: "productNotFound" });
      await expect(
        productsModel.updateProduct(null, peanutCup)
      ).rejects.toMatchObject({ message: "productNotFound" });
    });

    test("should return an error if body has invalid or missing params", async () => {
      const peanutCup = {
        name: "REESE'S, CUPS, PEANUT BUTTER, UPC: 768395486389",
        ndbno: "45153778",
        barcode: "768395486389",
        ingredients:
          "MILK CHOCOLATE (SUGAR; COCOA BUTTER; CHOCOLATE; NONFAT MILK; MILK FAT; LACTOSE; SOY LECITHIN; PGPR, EMULSIFIER); PEANUTS; SUGAR; DEXTROSE; SALT; TBHQ (PRESERVATIVE)",
        manufacturer: "Ross Acquisition Inc.",
        image: "https://binged.it/2NrXsfC"
      };
      await expect(
        productsModel.updateProduct(1, { ...peanutCup, food: "yumm yumm food" })
      ).rejects.toMatchObject({
        message: "productFieldRequired"
      });
      await expect(
        productsModel.updateProduct(1, { name: null })
      ).rejects.toMatchObject({ message: "productFieldRequired" });
    });
  });

  describe("deleteProduct()", () => {
    test("deleteProduct function is defined", () => {
      expect(productsModel.deleteProduct).toBeDefined();
    });

    test("should delete an product when given an id", async () => {
      const startLength = await productsModel.getAllProducts();
      const response = await productsModel.deleteProduct(2);
      const endLength = await productsModel.getAllProducts();
      const chips = {
        id: 2,
        name: "PICO DE GALLO BEAN & RICE CHIPS, UPC: 852565003053",
        ndbno: "45342958",
        barcode: "852565003053",
        ingredients:
          "BLACK BEANS, NAVY BEANS, BROWN RICE, ORGANIC BROWN RICE, SAFFLOWER OR SUNFLOWER OIL, SEASONING BLEND (TOMATO*, SEA SALT, TORULA YEAST, ONION*, SPICES, TAPIOCA MALTODEXTRIN, YEAST EXTRACT, DEHYDRATED GREEN BELL PEPPER, GARLIC*, DEHYDRATED PARSLEY, EXTRACTIVES OF PAPRIKA, SAFFLOWER OIL, NATURAL SMOKE FLAVOR, DEHYDRATED CILANTRO, SPICE EXTRACTIVE).",
        manufacturer: "Beanfields, LLC",
        image: "https://binged.it/2D6k3tv"
      };

      expect(endLength.length).toEqual(startLength.length - 1);
      expect(response[0]).toMatchObject(chips);
      expect(response[0]).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        ndbno: expect.any(String),
        barcode: expect.any(String),
        ingredients: expect.any(String),
        manufacturer: expect.any(String),
        image: expect.any(String)
      });
    });

    test("should return an error if id is invalid or missing", async () => {
      await expect(productsModel.deleteProduct("1")).rejects.toMatchObject({
        message: "productNotFound"
      });
      await expect(productsModel.deleteProduct(null)).rejects.toMatchObject({
        message: "productNotFound"
      });
      await expect(productsModel.deleteProduct(-1)).rejects.toMatchObject({
        message: "productNotFound"
      });
      await expect(productsModel.deleteProduct(100000)).rejects.toMatchObject({
        message: "productNotFound"
      });
    });
  });
});
