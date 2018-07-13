const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')

const auth = require('./routes/api/auth.js')
const profile = require('./routes/api/profile.js')
const recipe = require('./routes/api/recipe.js')
const comment = require('./routes/api/comment.js')

const app = express()

const db = keys.mongoURI

mongoose.connect(db, { useNewUrlParser: true })
	       .then(() => console.log('Connected to MongoDB'))
	       .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.json({ msg: 'hooray!' })
})

const port = process.env.PORT || 5000

app.listen(port, console.log(`listening on port ${port}`))
