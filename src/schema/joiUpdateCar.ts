import Joi from 'joi';

const typeNumber = '400| must be a number';

export default Joi.object({
  _id: Joi.string(),
  model: Joi.string().min(3)
    .messages({
      'string.base': '400| must be a string',
      'string.min': '400| must be greater than 2',
    }),
  year: Joi.number().min(1900).max(2022)
    .messages({
      'number.base': typeNumber,
      'number.min': '400| must be greater than 1899',
      'number.max': '400| must be less than 2023',
    }),
  color: Joi.string().min(3)
    .messages({
      'string.base': '400| must be a string',
      'string.min': '400| must be greater than 2',
    }),
  status: Joi.boolean()
    .messages({}),
  buyValue: Joi.number().integer()
    .messages({
      'any.required': '400| Value is required',
      'number.base': '400| Value must be a number',
    }),
  doorsQty: Joi.number().min(2).max(4)
    .messages({
      'number.base': typeNumber,
      'number.min': '400| must be greater than 1',
      'number.max': '400| must be less than 5',
    }),
  seatsQty: Joi.number().min(2).max(7)
    .messages({
      'number.base': typeNumber,
      'number.min': '400| must be greater than 1',
      'number.max': '400| must be less than 8',
    }),
}).min(1).messages({
  'object.min': '400|body cannot be empty',
  'object.unknown': '400| is not allowed',
});