const usersModel = require("../../src/models/01_users");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

describe("Users Model", () => {
  describe("signup()", () => {
    test("signup function is defined", () => {
      expect(usersModel.signup).toBeDefined();
    });

    test("should signup a new user with valid information", async () => {
      const newUser = {
        first_name: "First",
        last_name: "Last",
        email: "example@example.com",
        password: "password"
      };
      const response = await usersModel.signup(newUser);

      expect(response).toBeTruthy();
      expect(response).toBeInstanceOf(Object);
      expect(response).toHaveProperty("id");
      expect(response).toHaveProperty("first_name", "First");
      expect(response).toHaveProperty("last_name", "Last");
      expect(response).toHaveProperty("email", "example@example.com");
      expect(response).toHaveProperty("password");
      expect(response).toMatchObject({
        id: expect.any(Number),
        first_name: expect.any(String),
        last_name: expect.any(String),
        email: expect.any(String),
        password: expect.any(String)
      });
      expect(response.password).not.toMatch(newUser.password);
    });

    test("should return an error if user is registering with an existing email", async () => {
      const newUser = {
        first_name: "First",
        last_name: "Last",
        email: "super@man.com",
        password: "password"
      };
      await expect(usersModel.signup(newUser)).rejects.toMatchObject({
        message: "userExists"
      });
    });

    test("should return an error if the first name is missing", async () => {
      const newUser = {
        last_name: "Last",
        email: "example@example.com",
        password: "password"
      };
      await expect(usersModel.signup(newUser)).rejects.toMatchObject({
        message: "userFirstNameRequired"
      });
    });

    test("should return an error if the last name is missing", async () => {
      const newUser = {
        first_name: "First",
        email: "example@example.com",
        password: "password"
      };
      await expect(usersModel.signup(newUser)).rejects.toMatchObject({
        message: "userLastNameRequired"
      });
    });

    test("should return an error if the email is missing", async () => {
      const newUser = {
        first_name: "First",
        last_name: "Last",
        password: "password"
      };
      await expect(usersModel.signup(newUser)).rejects.toMatchObject({
        message: "userEmailRequired"
      });
    });

    test("should return an error if the password is missing", async () => {
      const newUser = {
        first_name: "First",
        last_name: "Last",
        email: "example@example.com"
      };
      await expect(usersModel.signup(newUser)).rejects.toMatchObject({
        message: "userPasswordRequired"
      });
    });
  });

  describe("login()", () => {
    test("login function is defined", () => {
      expect(usersModel.login).toBeDefined();
    });

    test("should login an existing user with valid fields", async () => {
      const user = {
        email: "super@man.com",
        password: "password"
      };
      const response = await usersModel.login(user);
      const isValid = await promisify(bcrypt.compare)(
        user.password,
        response.password
      );

      expect(response).toHaveProperty("id", 1);
      expect(response).toHaveProperty("first_name", "Clark");
      expect(response).toHaveProperty("last_name", "Kent");
      expect(response).toHaveProperty("email", "super@man.com");
      expect(response).toHaveProperty("password");
      expect(isValid).toBeTruthy();
    });

    test("should return an error if the email is missing", async () => {
      const user = {
        password: "password"
      };
      await expect(usersModel.login(user)).rejects.toMatchObject({
        message: "userEmailRequired"
      });
    });

    test("should return an error if the password is missing", async () => {
      const user = {
        email: "super@man.com"
      };
      await expect(usersModel.login(user)).rejects.toMatchObject({
        message: "userPasswordRequired"
      });
    });

    test("should return an error if user tries to login with wrong email", async () => {
      const user = {
        email: "supersuper@man.com",
        password: "password"
      };

      await expect(usersModel.login(user)).rejects.toMatchObject({
        message: "userInfoInvalid"
      });
    });

    test("should return an error if user tries to login with wrong password", async () => {
      const user = {
        email: "super@man.com",
        password: "password1"
      };

      await expect(usersModel.login(user)).rejects.toMatchObject({
        message: "userInfoInvalid"
      });
    });
  });

  describe("verify()", () => {
    test("verify function is defined", () => {
      expect(usersModel.verify).toBeDefined();
    });

    test("should verify a user id if user exists", async () => {
      const id = 1;
      const response = await usersModel.verify(id);
      expect(response.id).toEqual(id);
      expect(response).toMatchObject({
        id: expect.any(Number),
        first_name: expect.any(String),
        last_name: expect.any(String),
        email: expect.any(String),
        password: expect.any(String)
      });
    });

    test("should return an error if user id does not exist ", async () => {
      const id = -1;
      await expect(usersModel.verify(id)).rejects.toMatchObject({
        message: "userInfoInvalid"
      });
    });
  });
});
