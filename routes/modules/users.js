const express = require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const userSchema = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  const email = req.flash('email')
  res.render('login', { email })
})

router.post('/login', judgeAccount, passport.authenticate('local', { failureRedirect: '/users/login' }),
  function (req, res) {
    // console.log('req.user -3', req.user)
    // console.log('req.isAuthenticated - 3', req.isAuthenticated())
    res.redirect('/');
  });

function judgeAccount(req, res, next) {
  if (!req.body.email || !req.body.password)
    req.flash('loginMSG', '請填寫帳號/密碼~')
  req.flash('email', req.body.email)
  next()
}




router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // res.render('register')
  const { name, email, password, confirmPassword } = req.body
  // console.log('name', name, email, password, confirmPassword)

  if (!name || !email || !password || !confirmPassword) {
    const registerMSG = '請確認是否有未填寫的欄位~'
    return res.render('register', { name, email, registerMSG })
  }


  if (!(password === confirmPassword)) {
    const registerMSG = '二次密碼不相符，請重新輸入~'
    return res.render('register', { name, email, registerMSG })
  }

  userSchema.findOne({ email })
    .then((user) => {
      if (user) {
        const registerMSG = '帳號已註冊過~'
        return res.render('register', { name, email, registerMSG })
      }

      return bcryptjs
        .genSalt(10)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hash => {
          userSchema.create({ name, email, password: hash })
            .then(user => {
              // console.log("user", user)
              req.flash('registerSuccess', '註冊成功! 請登入')
              res.redirect('/users/login')
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
})

router.get('/logout', (req, res) => {
  // console.log('logout')
  req.logout()
  req.flash('loginMSG', '已登出~')
  res.redirect('/users/login')
})


module.exports = router