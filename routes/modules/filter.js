const express = require('express')
const router = express.Router()

const categorySchema = require('../../models/category.js')
const recordSchema = require('../../models/record.js')


router.get('/', getCategory, getRecord, (recordRefactor, req, res, next) => {
  const query = req.query.filter
  let recordFilter = recordRefactor
  let totalAmount = 0
  categorySchema.find().lean()
    .then(category => {
      recordFilter = recordFilter.filter(data => data.category.includes(query))
      recordFilter.forEach(data => totalAmount += Number(data.amount))
      res.render('index', { recordRefactor: recordFilter, category, totalAmount, query })
    })
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