const table = "products";

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(table)
    .del()
    .then(function() {
      // Inserts seed entries
      return knex(table).insert([
        {
          id: 1,
          name:
            "BLUE DIAMOND ALMONDS, MINI NUT-THINS, ALMOND & RICE CRACKER SNACKS, CHEDDAR CHEESE, UPC: 041570130025",
          ndbno: "45224339",
          barcode: "041570130025",
          ingredients:
            "RICE FLOUR, ALMONDS, CHEDDAR SEASONING (CHEDDAR CHEESE POWDER [CHEDDAR CHEESE {PASTEURIZED MILK, CHEESE CULTURES, SALT, ENZYMES}, DISODIUM PHOSPHATE], SALT, MALTODEXTRIN, NATURAL CHEESE FLAVOR, [CHEDDAR CHEESE {PASTEURIZED MILK, CHEESE CULTURES, SALT, ENZYMES}, YEAST EXTRACT, XANTHAN GUM], CULTURED WHEY, ONION, EXTRACTIVE OF TURMERIC, GARLIC, EXTRACTIVE OF ANNATTO, LACTIC ACID), POTATO STARCH, EXPELLER PRESSED SAFFLOWER OIL, SOY LECITHIN",
          manufacturer: "BLUE DIAMOND GROWERS",
          image: "https://binged.it/2DbZBHB"
        },
        {
          id: 2,
          name: "PICO DE GALLO BEAN & RICE CHIPS, UPC: 852565003053",
          ndbno: "45342958",
          barcode: "852565003053",
          ingredients:
            "BLACK BEANS, NAVY BEANS, BROWN RICE, ORGANIC BROWN RICE, SAFFLOWER OR SUNFLOWER OIL, SEASONING BLEND (TOMATO*, SEA SALT, TORULA YEAST, ONION*, SPICES, TAPIOCA MALTODEXTRIN, YEAST EXTRACT, DEHYDRATED GREEN BELL PEPPER, GARLIC*, DEHYDRATED PARSLEY, EXTRACTIVES OF PAPRIKA, SAFFLOWER OIL, NATURAL SMOKE FLAVOR, DEHYDRATED CILANTRO, SPICE EXTRACTIVE).",
          manufacturer: "Beanfields, LLC",
          image: "https://binged.it/2D6k3tv"
        },
        {
          id: 3,
          name: "BEANITOS, BLACK BEAN CHIPS, THE ORIGINAL, UPC: 812891020735",
          ndbno: "45161457",
          barcode: "812891020735",
          ingredients:
            "WHOLE BLACK BEANS, PURE SUNFLOWER OIL, LONG GRAIN, RICE, NATURAL FLAVOR, SEA SALT.",
          manufacturer: "BEANITOS, INC.",
          image: "https://binged.it/2NlWjX8"
        },
        {
          id: 4,
          name: "REESE'S, CUPS, PEANUT BUTTER, UPC: 768395486389",
          ndbno: "45153778",
          barcode: "768395486389",
          ingredients:
            "MILK CHOCOLATE (SUGAR; COCOA BUTTER; CHOCOLATE; NONFAT MILK; MILK FAT; LACTOSE; SOY LECITHIN; PGPR, EMULSIFIER); PEANUTS; SUGAR; DEXTROSE; SALT; TBHQ (PRESERVATIVE)",
          manufacturer: "Ross Acquisition Inc.",
          image: "https://binged.it/2NrXsfC"
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`
      );
    });
};
