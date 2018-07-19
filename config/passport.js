const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const Auth = mongoose.model('auths')
const keys = require('../config/keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Auth.findById(jwt_payload.id)
	  .then(auth => {
	    if (auth) {
	      return done(null, auth)
	    }
	    return done(null, false)
	  })
      .catch(err => console.log(err))
    })
  )
}
