function isValidUserCreate({ first_name, last_name, email, password }) {
  if (!first_name) throw new Error("userFirstNameRequired");
  if (!last_name) throw new Error("userLastNameRequired");
  if (!email) throw new Error("userEmailRequired");
  if (!password) throw new Error("userPasswordRequired");
}

function isValidUserLogin({ email, password }) {
  if (!email) throw new Error("userEmailRequired");
  if (!password) throw new Error("userPasswordRequired");
}

module.exports = {
  isValidUserCreate,
  isValidUserLogin
};
