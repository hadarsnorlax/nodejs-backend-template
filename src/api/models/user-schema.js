const Joi = require('joi');

const userSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(100).required(),
  createdAt: Joi.date().iso(),
  updatedAt: Joi.date().iso().allow(null),
});

module.exports = userSchema;
