const Joi = require('joi');

// User Registration Validation Schema
const registerValidation = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .required()
    .messages({
      'string.pattern.base':
        'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.',
    }),
});

// User Login Validation Schema
const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Middleware to Validate Request Body
const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map((detail) => detail.message),
    });
  }
  next();
};

module.exports = {
  registerValidation,
  loginValidation,
  validateRequest,
};
