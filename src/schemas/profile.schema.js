const Joi = require('joi');

const firstName = Joi.string().max(65);
const lastName = Joi.string().max(65);
const dni = Joi.string().max(8).min(8);
const phoneNumber = Joi.string().max(15);
const photoName = Joi.string();
const photoUrl = Joi.string();
const birthDate = Joi.date();
const sex = Joi.string().max(15);
const address = Joi.string().max(85);

const updateProfileSchema = Joi.object({
  firstName: firstName.optional(),
  lastName: lastName.optional(),
  dni: dni.optional(),
  phoneNumber: phoneNumber.optional(),
  photoName: photoName.optional(),
  photoUrl: photoUrl.optional(),
  birthDate: birthDate.optional(),
  sex: sex.optional(),
  address: address.optional(),
});

module.exports = {
  updateProfileSchema,
};
