import Joi from '@hapi/joi';

const commentSch = Joi.object().keys({
  comment: Joi.string()
    .trim()
    .required()
});

export default commentSch;
