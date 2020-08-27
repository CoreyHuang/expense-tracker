const express = require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const userSchema = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login',test , passport.authenticate('local', { failureRedirect: '/users/login' }),
  function (req, res) {
    console.log('req.user -3', req.user)
    console.log('req.isAuthenticated - 3', req.isAuthenticated())
    res.redirect('/');
  });

  function test (req, res ,next) {
    // console.log('req.isAuthenticated', req.isAuthenticated())
    // console.log('req.user', req.user)
    // console.log('req.body', req.body)
    console.log('判斷是否帳密為空' )
    next()
  }




router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // res.render('register')
  const { name, email, password, confirmPassword } = req.body
  console.log('name', name, email, password, confirmPassword)

  if (!name || !email || !password || !confirmPassword)
    return res.redirect('/users/register')

  if (!password === confirmPassword)
    return res.redirect('/users/register')

  bcryptjs
    .genSalt(10)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hash => {
      userSchema.create({ name, email, password: hash })
        .then(user => {
          console.log("user", user)
          res.redirect('/users/login')
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  console.log('logout')
  req.logout()
  res.redirect('/users/login')
})


module.exports = router