import Joi from 'joi';

export default Joi.object({
  _id: Joi.string(),
  model: Joi.string().required().min(3)
    .messages({
      'any.required': '400|Model is required',
      'string.base': '400|Model must be a string',
      'string.min': '400|Model must be greater than 2',
    }),
  year: Joi.number().required().min(1900).max(2022)
    .messages({
      'any.required': '400|Year is required',
      'number.base': '400|Year must be a number',
      'number.min': '400|Year must be greater than 1899',
      'number.max': '400|Year must be less than 2023',
    }),
  color: Joi.string().required().min(3)
    .messages({
      'any.required': '400|Color is required',
      'string.base': '400|Color must be a string',
      'string.min': '400|Color must be greater than 2',
    }),
  status: Joi.boolean()
    .messages({}),
  buyValue: Joi.number().required().integer()
    .messages({
      'any.required': '400|Buy Value is required',
      'number.base': '400|Buy Value must be a number',
    }),
  doorsQty: Joi.number().required().min(2).max(4)
    .messages({
      'any.required': '400|Doors Qty is required',
      'number.base': '400|Doors Qty must be a number',
      'number.min': '400|Doors Qty  must be greater than 1',
      'number.max': '400|Doors Qty  must be less than 5',
    }),
  seatsQty: Joi.number().required().min(2).max(7)
    .messages({
      'any.required': '400|Seats Qty is required',
      'number.base': '400|Seats Qty must be a number',
      'number.min': '400|Seats Qty must be greater than 1',
      'number.max': '400|Seats Qty must be less than 8',
    }),
}).min(1).messages({
  'object.min': '400|Object not be a empty',
});