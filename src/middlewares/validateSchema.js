import Schema from '../utils/validators/userSchema';
import articleSchema from '../utils/validators/articleSchema';
import commentSch from '../utils/validators/commentSchema';
import gifSchema from '../utils/validators/gifSchema';

const { userSchema, signUpSchema } = Schema;
const signInValidator = (req, res, next) => {
  const { error } = userSchema.validate(req.body, {
    allowUnknown: true,
    stripUnknown: true,
    abortEarly: false
  });
  if (error) {
    return res.status(400).json({
      status: 'Error',
      error: error.details[0].message
    });
  }
  return next();
};

const createUserValidator = (req, res, next) => {
  const { error } = signUpSchema.validate(req.body, {
    allowUnknown: true,
    stripUnknown: true,
    abortEarly: false
  });
  if (error) {
    return res.status(400).json({
      status: 'Error',
      error: error.details[0].message
    });
  }
  return next();
};

const articleValidator = (req, res, next) => {
  const { error } = articleSchema.validate(req.body, {
    allowUnknown: true,
    stripUnknown: true,
    abortEarly: false
  });
  if (error) {
    return res.status(400).json({
      status: 'Error',
      error: error.details[0].message
    });
  }
  return next();
};
const commentValidator = (req, res, next) => {
  const { error } = commentSch.validate(req.body, {
    allowUnknown: true,
    stripUnknown: true,
    abortEarly: false
  });
  if (error) {
    return res.status(400).json({
      status: 'Error',
      error: error.details[0].message
    });
  }
  return next();
};
const gifValidator = (req, res, next) => {
  const { error } = gifSchema.validate(req.body, {
    allowUnknown: true,
    stripUnknown: true,
    abortEarly: false
  });
  if (error) {
    return res.status(400).json({
      status: 'Error',
      error: error.details[0].message
    });
  }
  return next();
};
export default {
  signInValidator,
  createUserValidator,
  articleValidator,
  commentValidator,
  gifValidator
};
