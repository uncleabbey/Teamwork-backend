import Schema from '../utils/validators/schema';

const signInValidator = (req, res, next) => {
  const { error } = Schema.validate(req.body, {
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

export default signInValidator;
