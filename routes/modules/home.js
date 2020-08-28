const express = require('express')
const router = express.Router()

const categorySchema = require('../../models/category.js')
const recordSchema = require('../../models/record.js')


router.get('/', (req, res, next) => {
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

router.get('/filter', (req, res, next) => {
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

router.get('/new', (req, res) => {
  categorySchema.find().lean()
    .then(category => {
      res.render('new', { category })
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
  req.body.userId = req.user._id
  recordSchema.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => { console.log(error) })
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  recordSchema.findOne({ userId, _id })
    .then(record => Object.assign(record, req.body).save())
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


