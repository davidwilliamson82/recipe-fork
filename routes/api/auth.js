const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

const Auth = require('../../models/Auth')

router.get('/test', (req, res) => {
  res.json({ msg: 'auth route works' })
})

router.post('/register', (req, res) => {
  const newAuth = new Auth({
    email: req.body.email,
    password: req.body.password
  })

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(
      newAuth.password,
      salt,
      (err, hash) => {
	if (err) throw err
	newAuth.password = hash
	newAuth.save()
	       .then(auth => res.json(auth))
	       .catch(err => res.json(err))
      }
    )
  })
})

module.exports = router
