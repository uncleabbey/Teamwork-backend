import Joi from '@hapi/joi';

const articleSchema = Joi.object().keys({
  title: Joi.string()
    .trim()
    .required(),
  article: Joi.string()
    .trim()
    .required()
});

export default articleSchema;
