const express = require('express')
const router = express.Router()

const categorySchema = require('../../models/category.js')
const recordSchema = require('../../models/record.js')


router.get('/', getCategory, getRecord, (recordRefactor, req, res, next) => {
  categorySchema.find().lean()
    .then(category => {
      let totalAmount = 0
      recordRefactor.forEach(data => totalAmount += Number(data.amount))
      res.render('index', { recordRefactor, category, totalAmount })
    })
    .catch(error => { console.log(error) })
})

router.get('/:id', getCategory, (categorys, req, res, next) => {
  recordSchema.findById(req.params.id).lean()
    .then(record => {
      res.render('edit', { record, categorys })
    })
    .catch(error => { console.log(error) })
})

router.post('/', (req, res) => {
  // console.log('create', req.body)
  recordSchema.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => { console.log(error) })
})

router.put('/:id', (req, res) => {
  const { name, date, category, amount, merchant } = req.body
  recordSchema.findById(req.params.id)
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
  recordSchema.findById(req.params.id)
    .then(data => data.remove())
    .then(() => res.redirect('/'))
    .catch(error => { console.log(error) })
})


module.exports = router


// function ////////////////////////////////////////////////////////////
function getCategory(req, res, next) {
  categorySchema.find().lean()
    .then(categorys => {
      next(categorys)
    })
    .catch(error => { console.log(error) })
}

function getRecord(categorys, req, res, next) {
  recordSchema.find().lean()
    .then(records => {

      const recordRefactor = records
      let categoryFind = {}
      recordRefactor.forEach((record, index) => {
        categoryFind = categorys.find(category => category.category === record.category)
        recordRefactor[index].icon = categoryFind.icon
        if ((index + 1) % 2 === 1) recordRefactor[index].judgeStyle = (index + 1) % 2
      })
      next(recordRefactor)
    })
    .catch(error => { console.log(error) })
}