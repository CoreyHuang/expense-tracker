const express = require('express')
const router = express.Router()



const newRoute = require('./modules/new')
const filterRoute = require('./modules/filter')
const homeRoute = require('./modules/home')
const users = require('./modules/users')
const auth = require('../middleware/auth')
const authFacebook = require('./modules/authFacebook.js')

router.use('/new', auth, newRoute)
router.use('/filter', auth, filterRoute)
router.use('/users', users)
router.use('/auth', authFacebook)
router.use('/', auth, homeRoute)

module.exports = router