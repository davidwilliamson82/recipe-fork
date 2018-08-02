const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  // auth,
  // username,
  // bio,
  // recipes,
  // following
  auth: {
    type: Schema.Types.ObjectId,
    ref: 'auths'
  },
  username: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  recipes: {
    type: [String]
  },
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'auths'
    }
  ]
})

module.exports = Profile = mongoose.model('profiles', ProfileSchema)
