const Joi = require('joi');

// change-password
// /update-desactivated-status/:id

const password = Joi.string();
const activated = Joi.number().max(1).min(0);
const email = Joi.string().email().max(85);

const changePasswordSchema = Joi.object({
  email: email.optional(),
  password: password.optional(),
});

const changeStatusSchema = Joi.object({
  activated: activated.required(),
});

module.exports = {
  changePasswordSchema,
  changeStatusSchema,
};
