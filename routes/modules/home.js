const express = require('express')
const router = express.Router()

const categorySchema = require('../../models/category.js')
const recordSchema = require('../../models/record.js')


router.get('/', (req, res, next) => {
  // console.log('req.user- 2', req.user)
  let totalAmount = 0
  const userId = req.user._id

  categorySchema.find().lean()
    .then(category => {
      recordSchema.find({ userId }).lean()
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
          expense.forEach(data => totalAmount += Number(data.amount))
          res.render('index', { recordRefactor: expense, category, totalAmount })
        })
        .catch(error => { console.log(error) })
    })
    .catch(error => { console.log(error) })
})




router.get('/:id', (req, res, next) => {
  const userId = req.user._id
  const _id = req.params.id

  categorySchema.find().lean()
    .then(categorys => {
      recordSchema.findOne({ userId, _id }).lean()
        .then(record => {
          res.render('edit', { record, categorys })
        })
        .catch(error => { console.log(error) })
    })
    .catch(error => { console.log(error) })
})

router.post('/', (req, res) => {
  // console.log('create', req.body)
  // console.log('req.user',req.user)
  req.body.userId = req.user._id
  // console.log('req.body', req.body)
  recordSchema.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => { console.log(error) })
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  const { name, date, category, amount, merchant } = req.body
  recordSchema.findOne({ userId, _id })
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      record.merchant = merchant
      record.save()
    })
    .then(() => { res.redirect('/') })
    .catch(error => { console.log(error) })
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  recordSchema.findOne({ userId, _id })
    .then(data => data.remove())
    .then(() => res.redirect('/'))
    .catch(error => { console.log(error) })
})


module.exports = router


