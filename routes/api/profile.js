const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// load models
const Auth = require('../../models/Auth')
const Profile = require('../../models/Profile')

router.get('/test', (req, res) => res.json({ msg: 'Profile works'}))

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newProfile = new Profile({
      auth: req.user.id,
      username: req.body.username,
      bio: req.body.bio
    })
    newProfile.save()
	      .then(profile => res.json(profile))
	      .catch(err => res.json(err))
  }
)


module.exports = router
