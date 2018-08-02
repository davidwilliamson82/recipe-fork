const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const ObjectId = require('mongodb').ObjectId

// load models
const Auth = require('../../models/Auth')
const Recipe = require('../../models/Recipe')

router.get('/test', (req, res) => res.json({ msg: 'Recipe works'}))

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newRecipe = new Recipe({
      auth: req.user.id,
      title: req.body.title,
      steps: req.body.steps.split(','),
      comments: []
    })
    newRecipe.save()
	      .then(recipe => res.json(recipe))
	      .catch(err => res.json(err))
  }
)

router.get('/', (req, res) => {
  Recipe.find()
	 .then(recipe => res.json(recipe))
	 .catch(err =>res.json(err))
})

/* router.get(
 *   '/following',
 *   passport.authenticate('jwt', { session: false }),
 *   (req, res) => {
 *     
 *     Recipe.findOne({ auth: req.user.id })
 * 	   .then(recipe => {
 * 	     const following = recipe.following
 * 	     console.log(`following: ${typeof 
 * following[0]}`)
 * 	     console.log(`this recipe auth: ${typeof recipe.auth}`)
 * 	     Recipe.find({ auth: { $in: { following } } })
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
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      const recipeFields = {
	title: req.body.title,
	steps: req.body.steps.split(',')
      }
    Recipe.findOneAndUpdate(
      { $and: [ { _id: req.params.id }, { auth: req.user.id } ] },
      { $set: recipeFields },
      { new: true }

    )
	   .then(recipe => res.json(recipe))
	   .catch(err => res.json(err))
     
  }
)

router.put(
  '/comment/:comment',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Recipe.findOneAndUpdate(
      { auth: req.user.id },
      { $addToSet: { comments: ObjectId(req.params.comment) } },
      { new: true}
    )
	   .then(recipe => res.json(recipe))
	   .catch(err => res.json(err))
	   
  }
)

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.id === req.params.id) {
      Recipe.findOneAndDelete({ _id: req.params.id })
	     .then(recipe => res.json({ success: 'True'}))
	     .catch(err => res.json(err))
    } else {
      res.status(400).json({ unauthorized: 'You can only delete your own recipe.' })
    }
  }
)

module.exports = router
