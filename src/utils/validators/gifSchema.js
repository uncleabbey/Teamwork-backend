import Joi from '@hapi/joi';

const gifSchema = Joi.object().keys({
  title: Joi.string()
    .trim()
    .required(),
  imageUrl: Joi.string()
    .trim()
    .required()
});

export default gifSchema;
