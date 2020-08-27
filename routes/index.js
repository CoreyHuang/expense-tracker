const express = require('express')
const router = express.Router()



const newRoute = require('./modules/new')
const filterRoute = require('./modules/filter')
const homeRoute = require('./modules/home')
const users = require('./modules/users')

router.use('/new', newRoute)
router.use('/filter', filterRoute)
router.use('/users', users)
router.use('/', homeRoute)

module.exports = router