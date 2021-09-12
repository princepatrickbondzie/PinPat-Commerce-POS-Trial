const joi = require("joi");

const registerValidator = joi.Object({
  fullName: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required().min(8),
  confirmPassword: joi.string().required().valid(joi.ref("password")),
  //   role: joi.string(),
});

const loginValidator = joi.Object({
  email: joi.string().required(),
  password: joi.string().required(),
});

module.exports = {
  registerValidator,
  loginValidator,
};
