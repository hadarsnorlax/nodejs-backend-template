const joi = require('joi');

const bookSchema = joi.object({
  id: joi.number().integer().min(1).required(),
  title: joi.string().min(1).max(150).required(),
  author: joi.string().min(1).max(100).required(),
  isbn: joi.string().min(10).max(13).required(),
  publicationDate: joi.date().iso().required(),
  genre: joi.string().min(1).max(50).required(),
  createdAt: joi.date().iso(),
  updatedAt: joi.date().iso().allow(null),
});

module.exports = bookSchema;
