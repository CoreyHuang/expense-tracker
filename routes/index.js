const express = require('express')
const router = express.Router()


const homeRoute = require('./modules/home')
const users = require('./modules/users')
const auth = require('../middleware/auth')
const authFacebook = require('./modules/authFacebook.js')

router.use('/users', users)
router.use('/auth', authFacebook)
router.use('/', auth, homeRoute)

module.exports = router