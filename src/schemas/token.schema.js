const Joi = require('joi');

const idUser = Joi.string().uuid();

const addBlackTokenSchema = Joi.object({
  idUser: idUser.required(),
});

module.exports = {
  addBlackTokenSchema,
};
