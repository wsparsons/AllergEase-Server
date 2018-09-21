const usersModel = require("../../src/models/users");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

describe("Users Model", () => {
  describe("create()", () => {
    test("create function should exists", () => {
      expect(usersModel.create).toBeDefined();
    });

    test("should create a new user with valid information", async () => {
      const newUser = {
        first_name: "First",
        last_name: "Last",
        email: "example@example.com",
        password: "password"
      };
      const response = await usersModel.create(newUser);

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

    test("should return an error if the first name is missing", async () => {
      const newUser = {
        last_name: "Last",
        email: "example@example.com",
        password: "password"
      };
      await expect(usersModel.create(newUser)).rejects.toMatchObject({
        message: "userFirstNameRequired"
      });
    });

    test("should return an error if the last name is missing", async () => {
      const newUser = {
        first_name: "First",
        email: "example@example.com",
        password: "password"
      };
      await expect(usersModel.create(newUser)).rejects.toMatchObject({
        message: "userLastNameRequired"
      });
    });

    test("should return an error if the email is missing", async () => {
      const newUser = {
        first_name: "First",
        last_name: "Last",
        password: "password"
      };
      await expect(usersModel.create(newUser)).rejects.toMatchObject({
        message: "userEmailRequired"
      });
    });

    test("should return an error if the password is missing", async () => {
      const newUser = {
        first_name: "First",
        last_name: "Last",
        email: "example@example.com"
      };
      await expect(usersModel.create(newUser)).rejects.toMatchObject({
        message: "userPasswordRequired"
      });
    });
  });

  describe("login()", () => {
    test("login function should exists", () => {
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

    test("should return an error if existing user gives wrong email", async () => {
      const user = {
        email: "supersuper@man.com",
        password: "password"
      };

      await expect(usersModel.login(user)).rejects.toMatchObject({
        message: "userInfoInvalid"
      });
    });

    test("should return an error if existing user gives wrong password", async () => {
      const user = {
        email: "super@man.com",
        password: "password1"
      };

      await expect(usersModel.login(user)).rejects.toMatchObject({
        message: "userInfoInvalid"
      });
    });
  });
});