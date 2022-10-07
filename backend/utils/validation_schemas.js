const yup = require('yup')

/*
    Validation schemas for yup.
*/

const addUserValidationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  passwordConfirmation: yup
    .string('Confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm your password!'),
})

const signInValidationSchema = yup.object({
  email: yup
    .string('Enter the email for the new user')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter the password for the new user')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
})

module.exports = { addUserValidationSchema, signInValidationSchema }