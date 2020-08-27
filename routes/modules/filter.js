const express = require('express')
const router = express.Router()

const categorySchema = require('../../models/category.js')
const recordSchema = require('../../models/record.js')


router.get('/', (req, res, next) => {
  const query = req.query.filter
  const date = req.query.date
  console.log('query', req.query.filter)
  console.log('date', req.query.date)
  let totalAmount = 0

  categorySchema.find().lean()
    .then(category => {
      recordSchema.find().lean()
        .then(expense => {

          let categoryFind = {}
          expense.forEach((record, index) => {
            categoryFind = category.find(category => category.category === record.category)
            expense[index].icon = categoryFind.icon
            if ((index + 1) % 2 === 1) expense[index].judgeStyle = (index + 1) % 2
          })
          return expense
        })
        .then((expense) => {
          // const [yearDB, monthDB] = expense.date.split('-')
          const [year, month] = date.split('-')
          date ? expense = expense.filter(data => data.category.includes(query)
            && year === data.date.split('-')[0]
            && month === data.date.split('-')[1])
            : expense = expense.filter(data => data.category.includes(query))
          expense.forEach(data => totalAmount += Number(data.amount))
          res.render('index', { recordRefactor: expense, category, totalAmount, query, date })
        })
        .catch(error => { console.log(error) })
    })
    .catch(error => { console.log(error) })
})

module.exports = router


