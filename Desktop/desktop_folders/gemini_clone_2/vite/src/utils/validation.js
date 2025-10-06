import Joi from 'joi';

// Phone number validation schema
export const phoneSchema = Joi.object({
  phoneNumber: Joi.string()
    .pattern(/^\d+$/)
    .min(7)
    .max(15)
    .required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Phone number must contain only digits',
      'string.min': 'Phone number must be at least 7 digits',
      'string.max': 'Phone number must be at most 15 digits',
      'any.required': 'Phone number is required'
    })
});

// OTP validation schema
export const otpSchema = Joi.object({
  otp: Joi.string()
    .length(6)
    .pattern(/^\d+$/)
    .required()
    .messages({
      'string.empty': 'OTP is required',
      'string.length': 'OTP must be exactly 6 digits',
      'string.pattern.base': 'OTP must be exactly 6 digits',
      'any.required': 'OTP is required'
    })
});

// Chatroom validation schema
export const chatroomSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Chatroom title is required',
      'string.max': 'Chatroom title must be at most 50 characters',
      'any.required': 'Chatroom title is required'
    })
});

// Validate phone number
export const validatePhone = (data) => {
  const { error } = phoneSchema.validate(data, { abortEarly: false });
  if (error) {
    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.context.key] = detail.message;
    });
    return { success: false, errors };
  }
  return { success: true, errors: {} };
};

// Validate OTP
export const validateOtp = (data) => {
  const { error } = otpSchema.validate(data, { abortEarly: false });
  if (error) {
    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.context.key] = detail.message;
    });
    return { success: false, errors };
  }
  return { success: true, errors: {} };
};

// Validate chatroom
export const validateChatroom = (data) => {
  const { error } = chatroomSchema.validate(data, { abortEarly: false });
  if (error) {
    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.context.key] = detail.message;
    });
    return { success: false, errors };
  }
  return { success: true, errors: {} };
};