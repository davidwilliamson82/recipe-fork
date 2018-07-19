const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
  const errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''
  
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
