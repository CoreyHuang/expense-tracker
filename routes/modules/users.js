const express = require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const userSchema = require('../../models/user')


router.get('/login', (req, res) => {
  res.render('login')
})

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

module.exports = router