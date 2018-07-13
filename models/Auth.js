const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AuthSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = Auth = mongoose.model('auths', AuthSchema)
