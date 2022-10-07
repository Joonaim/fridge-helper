const { addUserValidationSchema, signInValidationSchema } = require('./validation_schemas')

/*
    Middleware validation functions.
*/

const validateAddUserForm = (req, res, next) => {
  const formData = req.body
  addUserValidationSchema.validate(formData).catch(err => {
    console.log('We caught an error while validating a form -- ' + err.errors)
    res.status(422).send()
  }).then(valid => {
    if (valid) {
      next()
    } else {
      res.status(422).send()
    }
  })
}

const validateSignInForm = (req, res, next) => {
  const formData = req.body
  signInValidationSchema.validate(formData).catch(err => {
    console.log('We caught an error while validating a form -- ' + err.errors)
    res.status(422).send()
  }).then(valid => {
    if (valid) {
      next()
    } else {
      res.status(422).send()
    }
  })
}

module.exports = { validateAddUserForm, validateSignInForm }