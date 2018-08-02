const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  auth: {
    type: Schema.Types.ObjectId,
    ref: 'auths'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'auths'
    }
  ]
})

module.exports = Comment = mongoose.model('comments', CommentSchema)
