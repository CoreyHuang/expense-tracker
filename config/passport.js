const passport = require('passport')
const LocalStrategy = require('passport-local')
const userSchema = require('../models/user')
const bcryptjs = require('bcryptjs')
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = (app) => {

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true },
    (req, email, password, done) => {

      userSchema.findOne({ email })
        .then(user => {
          if (!user) {
            req.flash('loginMSG', "查無此帳號~")
            return done(null, false)
          }
          return bcryptjs.compare(password, user.password)
            .then(judge => {
              if (!judge) {
                req.flash('loginMSG', "密碼錯誤~")
                return done(null, false)
              }
              return done(null, user)
            })
        })
        .catch(err => done(err, false))
    }
  ));


  passport.use(new FacebookStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    userSchema.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcryptjs
          .genSalt(10)
          .then(salt => bcryptjs.hash(randomPassword, salt))
          .then(hash => userSchema.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
      .catch(err => done(err, false))

  }))


  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    userSchema.findById(id).lean()
      .then(user => done(null, user))
      .catch(err => done(err, false))
  });
}