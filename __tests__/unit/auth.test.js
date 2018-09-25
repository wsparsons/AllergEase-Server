require("dotenv").load();
const { createToken, parseToken, isLoggedIn } = require("../../src/lib/auth");
const { sign, verify } = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

describe("Util: Auth", () => {
  describe("createToken()", () => {
    test("createToken function is defined", () => {
      expect(createToken).toBeDefined();
    });

    test("creates a valid JWT token with the given ID", () => {
      const actual = createToken(1);

      expect(actual).toBeTruthy();
      expect(verify(actual, SECRET_KEY)).toBeTruthy();
    });
  });

  describe("parseToken()", () => {
    test("parseToken function is defined", () => {
      expect(parseToken).toBeDefined();
    });

    test("parses a valid JWT token", () => {
      const actual = createToken(1);
      const token = sign({ sub: 1 }, SECRET_KEY, { expiresIn: "10 seconds" });

      expect(actual).toBeTruthy();
      expect(verify(actual, SECRET_KEY).id).toEqual(verify(token, SECRET_KEY).id)
    });
  });

  // describe("isLoggedIn()", ()=> {
  //   test("isLoggedIn function should exists", () => {
  //     expect(isLoggedIn).toBeDefined()
  //   })
  // })
});

