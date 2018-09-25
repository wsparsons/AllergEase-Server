const table = "aliases";

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(table)
    .del()
    .then(function() {
      // Inserts seed entries
      return knex(table).insert([
        { id: 1, allergen_id: 1, description: "Arachic oil" },
        { id: 2, allergen_id: 1, description: "Arachis" },
        { id: 3, allergen_id: 1, description: "Arachis hypogaea" },
        { id: 4, allergen_id: 1, description: "Artificial nuts" },
        { id: 5, allergen_id: 1, description: "Beer nuts" },
        { id: 6, allergen_id: 1, description: "Boiled peanuts" },
        { id: 7, allergen_id: 1, description: "Peanut oil" },
        { id: 8, allergen_id: 1, description: "Cold pressed peanut oil" },
        { id: 9, allergen_id: 1, description: "extruded peanut oil" },
        { id: 10, allergen_id: 1, description: "expelled peanut oil" },
        { id: 11, allergen_id: 1, description: "Crushed nuts" },
        { id: 12, allergen_id: 1, description: "crushed peanuts" },
        { id: 13, allergen_id: 1, description: "Earth nuts" },
        { id: 14, allergen_id: 1, description: "Goober peas" },
        { id: 15, allergen_id: 1, description: "Ground nuts" },
        { id: 16, allergen_id: 1, description: "Ground peanuts" },
        { id: 17, allergen_id: 1, description: "Hydrolyzed peanut protein" },
        { id: 18, allergen_id: 1, description: "Mandelonas" },
        { id: 19, allergen_id: 1, description: "Mixed nuts" },
        { id: 20, allergen_id: 1, description: "Monkey nuts" },
        { id: 21, allergen_id: 1, description: "Nu nuts flavored nuts" },
        { id: 22, allergen_id: 1, description: "Nut pieces" },
        { id: 23, allergen_id: 1, description: "Nutmeat" },
        { id: 24, allergen_id: 1, description: "Peanuts" },
        { id: 25, allergen_id: 1, description: "peanut butter" },
        { id: 26, allergen_id: 1, description: "peanut butter chips" },
        { id: 27, allergen_id: 1, description: "peanut butter morsels" },
        { id: 28, allergen_id: 1, description: "Peanut flour" },
        { id: 29, allergen_id: 1, description: "Peanut paste" },
        { id: 30, allergen_id: 1, description: "Peanut sauce" },
        { id: 31, allergen_id: 1, description: "peanut syrup" },
        { id: 32, allergen_id: 1, description: "Spanish peanuts" },
        { id: 33, allergen_id: 1, description: "Virginia peanuts" },
        { id: 34, allergen_id: 2, description: "Almond" },
        { id: 35, allergen_id: 2, description: "Beechnut" },
        { id: 36, allergen_id: 2, description: "Brazil nut" },
        { id: 37, allergen_id: 2, description: "Bush nut" },
        { id: 38, allergen_id: 2, description: "Butternut" },
        { id: 39, allergen_id: 2, description: "Cashew" },
        { id: 40, allergen_id: 2, description: "Chestnut" },
        { id: 41, allergen_id: 2, description: "Coconut" },
        { id: 42, allergen_id: 2, description: "Filbert" },
        { id: 43, allergen_id: 2, description: "Ginko nut" },
        { id: 44, allergen_id: 2, description: "Hazelnut" },
        { id: 45, allergen_id: 2, description: "Hickory nut" },
        { id: 46, allergen_id: 2, description: "Lichee nut" },
        { id: 47, allergen_id: 2, description: "Macadamia nut" },
        { id: 48, allergen_id: 2, description: "Nangai nut" },
        { id: 49, allergen_id: 2, description: "Pecan" },
        { id: 50, allergen_id: 2, description: "Pine nut" },
        { id: 51, allergen_id: 2, description: "Pistachio" },
        { id: 52, allergen_id: 2, description: "Shea nut" },
        { id: 53, allergen_id: 2, description: "Walnut" },
        { id: 54, allergen_id: 3, description: "acidophilus milk" },
        { id: 55, allergen_id: 3, description: "buttermilk" },
        { id: 56, allergen_id: 3, description: "buttermilk blend" },
        { id: 57, allergen_id: 3, description: "buttermilk solids" },
        { id: 58, allergen_id: 3, description: "cultured milk" },
        { id: 59, allergen_id: 3, description: "condensed milk" },
        { id: 60, allergen_id: 3, description: "dried milk" },
        { id: 61, allergen_id: 3, description: "dry milk solids" },
        { id: 62, allergen_id: 3, description: "DMS" },
        { id: 63, allergen_id: 3, description: "evaporated milk" },
        { id: 64, allergen_id: 3, description: "fat‐free milk" },
        { id: 65, allergen_id: 3, description: "fully cream milk powder" },
        { id: 66, allergen_id: 3, description: "goat’s milk" },
        { id: 67, allergen_id: 3, description: "Lactaid milk" },
        { id: 68, allergen_id: 3, description: "lactose free milk" },
        { id: 69, allergen_id: 3, description: "low fat milk" },
        { id: 70, allergen_id: 3, description: "malted milk" },
        { id: 71, allergen_id: 3, description: "milk derivative" },
        { id: 72, allergen_id: 3, description: "milk powder" },
        { id: 73, allergen_id: 3, description: "milk protein" },
        { id: 74, allergen_id: 3, description: "milk solids" },
        { id: 75, allergen_id: 3, description: "milk solid pastes" },
        { id: 76, allergen_id: 3, description: "nonfat dry milk" },
        { id: 77, allergen_id: 3, description: "nonfat milk" },
        { id: 78, allergen_id: 3, description: "nonfat milk solids" },
        { id: 79, allergen_id: 3, description: "pasteurized milk" },
        { id: 80, allergen_id: 3, description: "powdered milk" },
        { id: 81, allergen_id: 3, description: "sheep’s milk" },
        { id: 82, allergen_id: 3, description: "skim milk" },
        { id: 83, allergen_id: 3, description: "skim milk powder" },
        { id: 84, allergen_id: 3, description: "sour milk" },
        { id: 85, allergen_id: 3, description: "sour milk solids" },
        {
          id: 86,
          allergen_id: 3,
          description: "sweet cream buttermilk powder"
        },
        { id: 87, allergen_id: 3, description: "sweetened condensed milk" },
        {
          id: 88,
          allergen_id: 3,
          description: "sweetened condensed skim milk"
        },
        { id: 89, allergen_id: 3, description: "whole milk" },
        { id: 90, allergen_id: 3, description: "1% milk" },
        { id: 91, allergen_id: 3, description: "2% milk" },
        { id: 92, allergen_id: 3, description: "artificial butter" },
        { id: 93, allergen_id: 3, description: "artificial butter flavor" },
        { id: 94, allergen_id: 3, description: "butter" },
        { id: 95, allergen_id: 3, description: "butter extract" },
        { id: 96, allergen_id: 3, description: "butter fat" },
        { id: 97, allergen_id: 3, description: "butter flavored oil" },
        { id: 98, allergen_id: 3, description: "butter solids" },
        { id: 99, allergen_id: 3, description: "dairy butter" },
        { id: 100, allergen_id: 3, description: "natural butter" },
        { id: 101, allergen_id: 3, description: "natural butter flavor" },
        { id: 102, allergen_id: 3, description: "whipped butter" },
        { id: 103, allergen_id: 3, description: "casein" },
        { id: 104, allergen_id: 3, description: "caseinate" },
        { id: 105, allergen_id: 3, description: "ammonium caseinate" },
        { id: 106, allergen_id: 3, description: "calcium caseinate" },
        { id: 107, allergen_id: 3, description: "hydrolyzed casein" },
        {
          id: 108,
          allergen_id: 3,
          description: "iron caseinate magnesium caseinate"
        },
        { id: 109, allergen_id: 3, description: "potassium caseinate" },
        { id: 110, allergen_id: 3, description: "sodium caseinate" },
        { id: 111, allergen_id: 3, description: "zinc caseinate" },
        { id: 112, allergen_id: 3, description: "cheese" },
        { id: 113, allergen_id: 3, description: "cheese flavor" },
        { id: 114, allergen_id: 3, description: "artificial cheese flavor" },
        { id: 115, allergen_id: 3, description: "natural cheese flavor" },
        { id: 116, allergen_id: 3, description: "cheese food" },
        { id: 117, allergen_id: 3, description: "cottage cheese" },
        { id: 118, allergen_id: 3, description: "cream cheese" },
        { id: 119, allergen_id: 3, description: "imitation cheese" },
        {
          id: 120,
          allergen_id: 3,
          description: "vegetarian cheeses with casein"
        },
        { id: 121, allergen_id: 3, description: "Cream" },
        { id: 122, allergen_id: 3, description: "Whipped cream" },
        { id: 123, allergen_id: 3, description: "Curds" },
        { id: 124, allergen_id: 3, description: "Custard" },
        { id: 125, allergen_id: 3, description: "Dairy product solids" },
        { id: 126, allergen_id: 3, description: "Galactose" },
        { id: 127, allergen_id: 3, description: "Ghee" },
        { id: 128, allergen_id: 3, description: "Half & Half" },
        { id: 129, allergen_id: 3, description: "hydrolysate" },
        { id: 130, allergen_id: 3, description: "casein hydrolysate" },
        { id: 131, allergen_id: 3, description: "milk protein hydrolysate" },
        { id: 132, allergen_id: 3, description: "protein hydrolysate" },
        { id: 133, allergen_id: 3, description: "whey hydrolysate" },
        { id: 134, allergen_id: 3, description: "whey protein hydrolysate" },
        { id: 135, allergen_id: 3, description: "ice cream" },
        { id: 136, allergen_id: 3, description: "ice milk" },
        { id: 137, allergen_id: 3, description: "sherbet" },
        { id: 138, allergen_id: 3, description: "Lactalbumin" },
        { id: 139, allergen_id: 3, description: "lactalbumin phosphate" },
        { id: 140, allergen_id: 3, description: "Lactate solids" },
        { id: 141, allergen_id: 3, description: "Lactyc yeast" },
        { id: 142, allergen_id: 3, description: "Lactitol monohydrate" },
        { id: 143, allergen_id: 3, description: "Lactoglobulin" },
        { id: 144, allergen_id: 3, description: "Lactose" },
        { id: 145, allergen_id: 3, description: "Lactulose" },
        { id: 146, allergen_id: 3, description: "Milk fat" },
        { id: 147, allergen_id: 3, description: "anhydrous milk fat" },
        { id: 148, allergen_id: 3, description: "Nisin preparation" },
        { id: 149, allergen_id: 3, description: "Nougat" },
        { id: 150, allergen_id: 3, description: "Pudding" },
        { id: 151, allergen_id: 3, description: "Quark" },
        { id: 152, allergen_id: 3, description: "Recaldent" },
        { id: 153, allergen_id: 3, description: "Rennet" },
        { id: 154, allergen_id: 3, description: "rennet casein" },
        { id: 155, allergen_id: 3, description: "Simplesse" },
        { id: 156, allergen_id: 3, description: "Sour cream" },
        { id: 157, allergen_id: 3, description: "sour cream solids" },
        { id: 158, allergen_id: 3, description: "imitation sour cream" },
        { id: 159, allergen_id: 3, description: "whey" },
        { id: 160, allergen_id: 3, description: "acid whey" },
        { id: 161, allergen_id: 3, description: "cured whey" },
        { id: 162, allergen_id: 3, description: "delactosed whey" },
        { id: 163, allergen_id: 3, description: "demineralized whey" },
        { id: 164, allergen_id: 3, description: "hydrolyzed whey" },
        { id: 165, allergen_id: 3, description: "powdered whey" },
        { id: 166, allergen_id: 3, description: "reduced mineral whey" },
        { id: 167, allergen_id: 3, description: "sweet dairy whey" },
        { id: 168, allergen_id: 3, description: "whey" },
        { id: 169, allergen_id: 3, description: "whey protein" },
        { id: 170, allergen_id: 3, description: "whey protein concentrate" },
        { id: 171, allergen_id: 3, description: "whey powder" },
        { id: 172, allergen_id: 3, description: "whey solids" },
        { id: 173, allergen_id: 3, description: "Yogurt" },
        { id: 174, allergen_id: 3, description: "regular yogurt" },
        { id: 175, allergen_id: 3, description: "frozen yogurt" },
        { id: 176, allergen_id: 3, description: "yogurt powder" },
        { id: 177, allergen_id: 4, description: "Albumin" },
        { id: 178, allergen_id: 4, description: "Apovitellin" },
        {
          id: 179,
          allergen_id: 4,
          description: "Cholesterol free egg substitute"
        },
        { id: 180, allergen_id: 4, description: "Eggbeaters" },
        { id: 181, allergen_id: 4, description: "Dried egg solids" },
        { id: 182, allergen_id: 4, description: "dried egg" },
        { id: 183, allergen_id: 4, description: "Egg" },
        { id: 184, allergen_id: 4, description: "egg white" },
        { id: 185, allergen_id: 4, description: "egg yolk" },
        { id: 186, allergen_id: 4, description: "Egg wash" },
        { id: 187, allergen_id: 4, description: "Eggnog" },
        { id: 188, allergen_id: 4, description: "Fat substitutes" },
        { id: 189, allergen_id: 4, description: "Globulin" },
        { id: 190, allergen_id: 4, description: "Livetin" },
        { id: 191, allergen_id: 4, description: "Lysozyme" },
        { id: 192, allergen_id: 4, description: "Mayonnaise" },
        { id: 193, allergen_id: 4, description: "Meringue" },
        { id: 194, allergen_id: 4, description: "meringue powder" },
        { id: 195, allergen_id: 4, description: "Ovalbumin" },
        { id: 196, allergen_id: 4, description: "Ovoglobulin" },
        { id: 197, allergen_id: 4, description: "Ovomucin" },
        { id: 198, allergen_id: 4, description: "Ovomucoid" },
        { id: 199, allergen_id: 4, description: "Ovotransferrin" },
        { id: 200, allergen_id: 4, description: "Ovovitelia" },
        { id: 201, allergen_id: 4, description: "Ovovitellin" },
        { id: 202, allergen_id: 4, description: "Powdered eggs" },
        { id: 203, allergen_id: 4, description: "Silici albuminate" },
        { id: 204, allergen_id: 4, description: "Simplesse" },
        { id: 205, allergen_id: 4, description: "Surimi" },
        { id: 206, allergen_id: 4, description: "Trailblazer" },
        { id: 207, allergen_id: 4, description: "Vitellin" },
        { id: 208, allergen_id: 4, description: "Whole egg" },
        { id: 209, allergen_id: 5, description: "Bean curd" },
        { id: 210, allergen_id: 5, description: "Edamame" },
        { id: 211, allergen_id: 5, description: "soybeans in pods" },
        { id: 212, allergen_id: 5, description: "Hydrolyzed soy protein" },
        { id: 213, allergen_id: 5, description: "Kinako" },
        { id: 214, allergen_id: 5, description: "roasted soybean flour" },
        { id: 215, allergen_id: 5, description: "Koya dofu" },
        { id: 216, allergen_id: 5, description: "freeze dried tofu" },
        { id: 217, allergen_id: 5, description: "Miso" },
        { id: 218, allergen_id: 5, description: "Natto" },
        { id: 219, allergen_id: 5, description: "Okara" },
        { id: 220, allergen_id: 5, description: "soy pulp" },
        { id: 221, allergen_id: 5, description: "Shoyu" },
        { id: 222, allergen_id: 5, description: "Soy albumin" },
        { id: 223, allergen_id: 5, description: "Soy concentrate" },
        { id: 224, allergen_id: 5, description: "Soy fiber" },
        { id: 225, allergen_id: 5, description: "Soy formula" },
        { id: 226, allergen_id: 5, description: "Soy grits" },
        { id: 227, allergen_id: 5, description: "Soy milk" },
        { id: 228, allergen_id: 5, description: "Soy miso" },
        { id: 229, allergen_id: 5, description: "Soy nuts" },
        { id: 230, allergen_id: 5, description: "Soy nut butter" },
        { id: 231, allergen_id: 5, description: "Soy protein " },
        { id: 232, allergen_id: 5, description: "soy protein concentrate" },
        { id: 233, allergen_id: 5, description: "soy protein isolate" },
        { id: 234, allergen_id: 5, description: "Soy sauce" },
        { id: 235, allergen_id: 5, description: "Soy sprouts" },
        { id: 236, allergen_id: 5, description: "Soya" },
        { id: 237, allergen_id: 5, description: "Soya flour" },
        { id: 238, allergen_id: 5, description: "Soybeans" },
        { id: 239, allergen_id: 5, description: "Soybean granules" },
        { id: 240, allergen_id: 5, description: "Soybean curd" },
        { id: 241, allergen_id: 5, description: "Soybean flour" },
        { id: 242, allergen_id: 5, description: "Soy lecithin" },
        { id: 243, allergen_id: 5, description: "Soybean paste" },
        { id: 244, allergen_id: 5, description: "Supro" },
        { id: 245, allergen_id: 5, description: "Tamari" },
        { id: 246, allergen_id: 5, description: "Tempeh" },
        { id: 247, allergen_id: 5, description: "Teriyaki sauce" },
        { id: 248, allergen_id: 5, description: "Textured soy flour" },
        { id: 249, allergen_id: 5, description: "TSF" },
        { id: 250, allergen_id: 5, description: "Textured soy protein" },
        { id: 251, allergen_id: 5, description: "TSP" },
        { id: 252, allergen_id: 5, description: "Textured vegetable protein" },
        { id: 253, allergen_id: 5, description: "TVP" },
        { id: 254, allergen_id: 5, description: "Tofu" },
        { id: 255, allergen_id: 5, description: "Yaki-dofu" },
        { id: 256, allergen_id: 5, description: "Grilled tofu" },
        { id: 257, allergen_id: 5, description: "Yuba" },
        { id: 258, allergen_id: 5, description: "bean curd" },
        { id: 259, allergen_id: 6, description: "All purpose flour" },
        { id: 260, allergen_id: 6, description: "bread" },
        { id: 261, allergen_id: 6, description: "white flour" },
        { id: 262, allergen_id: 6, description: "wheat flour" },
        { id: 263, allergen_id: 6, description: "bread crumbs" },
        { id: 264, allergen_id: 6, description: "Bulgur" },
        { id: 265, allergen_id: 6, description: "Cereal extract" },
        { id: 266, allergen_id: 6, description: "Couscous" },
        { id: 267, allergen_id: 6, description: "Cracker meal" },
        { id: 268, allergen_id: 6, description: "Einkorn" },
        { id: 269, allergen_id: 6, description: "Emmer " },
        { id: 270, allergen_id: 6, description: "farro" },
        { id: 271, allergen_id: 6, description: "Farina" },
        { id: 272, allergen_id: 6, description: "atta flour" },
        { id: 273, allergen_id: 6, description: "club flour" },
        { id: 274, allergen_id: 6, description: "common flour" },
        { id: 275, allergen_id: 6, description: "durum flour" },
        { id: 276, allergen_id: 6, description: "einkorn flour" },
        { id: 277, allergen_id: 6, description: "emmer flour" },
        { id: 278, allergen_id: 6, description: "farina flour" },
        { id: 279, allergen_id: 6, description: "graham flour" },
        { id: 280, allergen_id: 6, description: "kamut flour" },
        { id: 281, allergen_id: 6, description: "maida flour" },
        { id: 282, allergen_id: 6, description: "semolina flour" },
        { id: 283, allergen_id: 6, description: "spelt flour" },
        { id: 284, allergen_id: 6, description: "triticale flour" },
        { id: 285, allergen_id: 6, description: "triticum flour" },
        { id: 286, allergen_id: 6, description: "all purpose flour" },
        { id: 287, allergen_id: 6, description: "bread flour" },
        { id: 288, allergen_id: 6, description: "bromated flour" },
        { id: 289, allergen_id: 6, description: "cake flour" },
        { id: 290, allergen_id: 6, description: "enriched flour" },
        { id: 291, allergen_id: 6, description: "high gluten flour" },
        { id: 292, allergen_id: 6, description: "high protein flour" },
        { id: 293, allergen_id: 6, description: "instant pastry flour" },
        { id: 294, allergen_id: 6, description: "phosphated flour" },
        { id: 295, allergen_id: 6, description: "plain flour" },
        { id: 296, allergen_id: 6, description: "soft wheat flour" },
        { id: 297, allergen_id: 6, description: "steel ground flour" },
        { id: 298, allergen_id: 6, description: "stone flour" },
        { id: 299, allergen_id: 6, description: "ground flour" },
        { id: 300, allergen_id: 6, description: "self-rising flour" },
        { id: 301, allergen_id: 6, description: "unbleached flour" },
        { id: 302, allergen_id: 6, description: "white flour" },
        { id: 303, allergen_id: 6, description: "whole wheat flour" },
        { id: 304, allergen_id: 6, description: "Fu" },
        { id: 305, allergen_id: 6, description: "wheat gluten" },
        { id: 306, allergen_id: 6, description: "vital gluten" },
        { id: 307, allergen_id: 6, description: "vital wheat gluten" },
        { id: 308, allergen_id: 6, description: "fu gluten" },
        { id: 309, allergen_id: 6, description: "Kamut" },
        { id: 310, allergen_id: 6, description: "khorasan wheat" },
        { id: 311, allergen_id: 6, description: "Malt" },
        { id: 312, allergen_id: 6, description: "malt extract" },
        { id: 313, allergen_id: 6, description: "Matzo" },
        { id: 314, allergen_id: 6, description: "Matzoh" },
        { id: 315, allergen_id: 6, description: "Matza" },
        { id: 316, allergen_id: 6, description: "Matzah" },
        { id: 317, allergen_id: 6, description: "Matzo meal" },
        { id: 318, allergen_id: 6, description: "Matzoh meal" },
        { id: 319, allergen_id: 6, description: "Matza meal" },
        { id: 320, allergen_id: 6, description: "Matzah meal" },
        { id: 321, allergen_id: 6, description: "Noodles, pasta" },
        { id: 322, allergen_id: 6, description: "Pasta noodles" },
        { id: 323, allergen_id: 6, description: "Seitan" },
        { id: 324, allergen_id: 6, description: "Semolina" },
        { id: 325, allergen_id: 6, description: "Spelt" },
        { id: 326, allergen_id: 6, description: "Tabbouleh" },
        { id: 327, allergen_id: 6, description: "Triticale" },
        { id: 328, allergen_id: 6, description: "Triticum" },
        { id: 329, allergen_id: 6, description: "whole wheat" },
        { id: 330, allergen_id: 6, description: "Wheat" },
        { id: 331, allergen_id: 6, description: "whole wheat" },
        { id: 332, allergen_id: 6, description: "wheat berries" },
        { id: 333, allergen_id: 6, description: "wheat bran" },
        { id: 334, allergen_id: 6, description: "whole wheat bread" },
        { id: 335, allergen_id: 6, description: "whole wheat flour" },
        { id: 336, allergen_id: 6, description: "wheat germ" },
        { id: 337, allergen_id: 6, description: "wheat germ oil" },
        { id: 338, allergen_id: 6, description: "wheat protein isolate" },
        { id: 339, allergen_id: 6, description: "wheat starch" },
        { id: 340, allergen_id: 6, description: "wheat sprouts" },
        { id: 341, allergen_id: 6, description: "sprouted wheat" },
        { id: 342, allergen_id: 6, description: "Wheatgrass" }
      ]);
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`
      );
    });
};