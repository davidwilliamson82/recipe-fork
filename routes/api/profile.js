const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const ObjectId = require('mongodb').ObjectId

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

router.get('/', (req, res) => {
  Profile.find()
	 .then(profile => res.json(profile))
	 .catch(err =>res.json(err))
})

/* router.get(
 *   '/following',
 *   passport.authenticate('jwt', { session: false }),
 *   (req, res) => {
 *     
 *     Profile.findOne({ auth: req.user.id })
 * 	   .then(profile => {
 * 	     const following = profile.following
 * 	     console.log(`following: ${typeof 
 * following[0]}`)
 * 	     console.log(`this profile auth: ${typeof profile.auth}`)
 * 	     Profile.find({ auth: { $in: { following } } })
 * 				      .then(followed => {
 * 					if (followed.length === 0) {
 * 					  res.json({ nofollowed: 'follow someone' })
 * 					} else {
 * 					  res.json(followed)
 * 					}
 * 				      }
 * 				      )
 * 				      .catch(err => res.json(err))
 * 	   })
 * 	   .catch(err => res.json(err))
 *   }
 * ) */


router.put(
  '/:auth',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.id === req.params.auth) {
    const profileFields = {
      username: req.body.username,
      bio: req.body.bio
    }
    Profile.findOneAndUpdate(
      { auth: req.params.auth },
      { $set: profileFields },
      { new: true }
    )
	   .then(profile => res.json(profile))
	   .catch(err => res.json(err))
     } else {
      res.status(400).json({ unauthorized: 'You can only update your own profile.' })
    } 
  }
)

router.put(
  '/follow/:auth',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndUpdate(
      { auth: req.user.id },
      { $addToSet: { following: ObjectId(req.params.auth) } },
      { new: true}
    )
	   .then(profile => res.json(profile))
	   .catch(err => res.json(err))
	   
  }
)

router.delete(
  '/:auth',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.id === req.params.auth) {
      Profile.findOneAndDelete({ auth: req.params.auth })
	     .then(profile => res.json({ success: 'True'}))
	     .catch(err => res.json(err))
    } else {
      res.status(400).json({ unauthorized: 'You can only delete your own profile.' })
    }
  }
)

module.exports = router
