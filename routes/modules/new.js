const express = require('express')
const router = express.Router()

const categorySchema = require('../../models/category.js')


router.get('/', (req, res) => {
  categorySchema.find().lean()
    .then(category => {
      res.render('new', { category })
    })
    .catch(error => { console.log(error) })
})

module.exports = router