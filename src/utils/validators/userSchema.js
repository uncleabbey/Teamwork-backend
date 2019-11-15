import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      'string.base': 'Email must be string',
      'string.empty': 'Please Enter a Valid Email',
      'string.email': 'Email must be Valid'
    }),
  password: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'password must be string',
      'string.empty': 'Password is required'
    })
});
const signUpSchema = Joi.object().keys({
  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      'string.base': 'Email must be string',
      'string.empty': 'Please Enter a Valid Email',
      'string.email': 'Email must be Valid',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .trim()
    .required()
    .min(8)
    .messages({
      'string.base': 'password must be string',
      'string.min': 'password must be at least 8 characters',
      'string.empty': 'Password is required',
      'any.required': 'Email is required'
    }),
  firstName: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'FirstName must be string',
      'string.empty': 'Please Enter a Valid First Name',
      'any.required': 'firstName is required'
    }),
  lastName: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'lastName must be string',
      'string.empty': 'lastName is required',
      'any.required': 'lastName is required'
    }),
  isAdmin: Joi.boolean().required(),
  gender: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'gender must be string',
      'string.empty': 'gender is required',
      'any.required': 'gender is required'
    }),
  jobRole: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'jobRole must be string',
      'string.empty': 'jobRole is required',
      'any.required': 'jobRole is required'
    }),
  department: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'department must be string',
      'string.empty': 'department is required',
      'any.required': 'department is required'
    }),
  address: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'address must be string',
      'string.empty': 'address is required',
      'any.required': 'address is required'
    })
});

export default { userSchema, signUpSchema };
