const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
  const errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!Validator.isLength(data.password, { min: 2, max: 30 })) {
    errors.password = 'Password must be between 2 and 30 characters long.'
  }

    return {
      errors,
      isValid: isEmpty(errors)
    }
}
