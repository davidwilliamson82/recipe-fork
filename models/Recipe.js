const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RecipeSchema = new Schema({
  // auth,
  // username,
  // bio,
  // recipes,
  // following
  auth: {
    type: Schema.Types.ObjectId,
    ref: 'auths'
  },
  title: {
    type: String,
    required: true
  },
  steps: {
    type: [String]
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'auths'
    }
  ]
})

module.exports = Recipe = mongoose.model('recipes', RecipeSchema)
