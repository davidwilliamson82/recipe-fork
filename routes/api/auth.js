const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

const Auth = require('../../models/Auth')
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

router.get('/test', (req, res) => {
  res.json({ msg: 'auth route works' })
})

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  
  if (!isValid) {
    res.status(400).json(errors)
  } else {
    Auth.findOne({ email: req.body.email })
	.then(auth => {
	  if (auth) {
	    res.status(400).json({ emailtaken: 'There is already an auth with that Id' })
	  } else {
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
	  }
	})
	.catch(err => {
	  res.json({ error: err })
	})
  }
})

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)
  
  if (!isValid) {
    res.status(400).json(errors)
  } else {
  
    const email = req.body.email
    const password = req.body.password

    Auth.findOne({ email })
		      .then(auth => {
			// check if Auth
			if (!auth) {
			  res.status(404).json({ noauth: 'there is no auth with that email' })
			}
			
			// check password
			bcrypt.compare(password, auth.password)
			      .then(isMatch => {
				if (!isMatch) {
				  res.status(400).json({ wrongpassword: 'No dice' })
				} else {
				  const payload = { id: auth._id, email: auth.email }

				  jwt.sign(
				    payload,
				    keys.secretOrKey,
				    { expiresIn: 3600 },
				    (err, token) => {
				      res.json({
					msg: 'Success',
					token: `Bearer ${token}`
				      })
				    }
				    
				  )
				}
			      })
			      .catch(err => res.status(400).json({ password: 'wrong password'}))
		      })
		      .catch(err => res.json({ errors: err }))
  } 
})

module.exports = router
