const express = require('express')
const router = express.Router()

const categorySchema = require('../../models/category.js')
const recordSchema = require('../../models/record.js')


router.get('/', (req, res, next) => {
  const query = req.query.filter
  const date = req.query.date
  let totalAmount = 0
  const userId = req.user._id

  categorySchema.find().lean()
    .then(category => {
      recordSchema.find({ userId, category: { $regex: query }, date: { $regex: date } }).lean()
        .then(expense => {
          let categoryFind = {}
          expense.forEach((record, index) => {
            categoryFind = category.find(category => category.category === record.category)
            expense[index].icon = categoryFind.icon
            if ((index + 1) % 2 === 1) expense[index].judgeStyle = (index + 1) % 2
          })
          expense.forEach(data => totalAmount += Number(data.amount))
          res.render('index', { recordRefactor: expense, category, totalAmount, query, date })
        })
        .catch(error => { console.log(error) })
    })
    .catch(error => { console.log(error) })
})

module.exports = router


