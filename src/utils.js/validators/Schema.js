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

export default userSchema;
