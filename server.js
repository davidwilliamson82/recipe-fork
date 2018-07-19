const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const bodyParser = require('body-parser')
const passport = require('passport')

const auth = require('./routes/api/auth.js')
const profile = require('./routes/api/profile.js')
const recipe = require('./routes/api/recipe.js')
const comment = require('./routes/api/comment.js')

const app = express()

const db = keys.mongoURI

mongoose.connect(db, { useNewUrlParser: true })
	       .then(() => console.log('Connected to MongoDB'))
	       .catch(err => console.log(err))

app.use(passport.initialize())
require('./config/passport')(passport)


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/auth', auth)
app.use('/api/profile', profile)

const port = process.env.PORT || 5000

app.listen(port, console.log(`listening on port ${port}`))
