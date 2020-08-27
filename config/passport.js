const passport = require('passport')
const LocalStrategy = require('passport-local')
const userSchema = require('../models/user')
const bcryptjs = require('bcryptjs')

module.exports = (app) => {

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy({ usernameField: 'email' },
    (email, password, done) => {
      // console.log('email', email)
      // console.log('password', password)
  
      userSchema.findOne({ email })
        .then(user => {
          // console.log('user', user)
          if (!user) {
            console.log('user is not find')
            return done(null, false)
          }
          return bcryptjs.compare(password, user.password)
            .then(judge => {
              if (!judge) {
                console.log('password error')
                return done(null, false)
              }
              console.log('account pass')
              return done(null, user)
            })
        })
        .catch(err => done(err, false))
    }
  ));

  passport.serializeUser(function (user, done) {
    console.log('serializeUser')
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    userSchema.findById(id).lean()
      .then(user => {
        // console.log('deserializeUser', user)
        done(null, user)
      })
      .catch(err => done(err, false))
  });
}