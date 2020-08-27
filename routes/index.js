const express = require('express')
const router = express.Router()



const newRoute = require('./modules/new')
const filterRoute = require('./modules/filter')
const homeRoute = require('./modules/home')
const users = require('./modules/users')
const auth = require('../middleware/auth')

router.use('/new', auth, newRoute)
router.use('/filter', auth, filterRoute)
router.use('/users', users)
router.use('/', auth, homeRoute)

module.exports = router