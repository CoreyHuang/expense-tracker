const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const post = 3000

app.engine('handlebars', exphbs({ defaultLayout: "main" }))
app.set('view engine', 'handlebars')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => { console.log('mongodb error!!!') })
db.once('open', () => { console.log('mongodb connected~') })
const categorySchema = require('./models/category.js')
const recordSchema = require('./models/record.js')
// const { findById } = require('./models/category.js')

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
////////////////////////////////////////////////////////////////////////////////////////
app.get('/new', (req, res) => {
  categorySchema.find().lean()
    .then(category => {
      res.render('new', { category })
    })
    .catch(error => { console.log(error) })
})

app.post('/', (req, res) => {
  console.log("post", req.body)
  recordSchema.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => { console.log(error) })
})

app.get('/filter', getCategory, getRecord, (recordRefactor, req, res, next) => {
  // console.log("req.query", req.query) 
  const query = req.query.filter
  let recordFilter = recordRefactor
  let totalAmount = 0
  categorySchema.find().lean()
    .then(category => {
      // console.log('recordFilter', recordFilter)
      recordFilter = recordFilter.filter(data => data.category.includes(query))
      recordFilter.forEach(data => totalAmount += Number(data.amount))
      res.render('index', { recordRefactor: recordFilter, category, totalAmount, query })
    })
    .catch(error => { console.log(error) })
})


app.get('/', getCategory, getRecord, (recordRefactor, req, res, next) => {
  categorySchema.find().lean()
    .then(category => {
      console.log('recordRefactor', recordRefactor)
      let totalAmount = 0
      recordRefactor.forEach(data => totalAmount += Number(data.amount))
      res.render('index', { recordRefactor, category, totalAmount })
    })
    .catch(error => { console.log(error) })
})

function getCategory(req, res, next) {
  categorySchema.find().lean()
    .then(categorys => {
      console.log('1')
      next(categorys)
    })
    .catch(error => { console.log(error) })
}

function getRecord(categorys, req, res, next) {
  console.log('2')
  recordSchema.find().lean()
    .then(records => {

      const recordRefactor = records
      let categoryFind = {}
      recordRefactor.forEach((record, index) => {
        categoryFind = categorys.find(category => category.category === record.category)
        recordRefactor[index].icon = categoryFind.icon
        if ((index + 1) % 2 === 1) recordRefactor[index].judgeStyle = (index + 1) % 2
      })
      // console.log('recordRefactor', recordRefactor)
      next(recordRefactor)
    })
    .catch(error => { console.log(error) })
}

app.get('/:id', getCategory, (categorys, req, res, next) => {
  console.log("data-1", req.params.id)
  console.log("categorys", categorys)
  recordSchema.findById(req.params.id).lean()
    .then(record => {
      console.log("data-2", record)
      res.render('edit', { record, categorys })
    })
    .catch(error => { console.log(error) })
})

app.put('/:id', (req, res) => {
  console.log("data-put", req.body)
  console.log("data-put", req.params)
  const { name, date, category, amount } = req.body
  console.log("data-body", name, date, category, amount)
  recordSchema.findById(req.params.id)
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      record.save()
    })
    .then(() => { res.redirect('/') })
    .catch(error => { console.log(error) })
})

app.delete('/:id', (req, res) => {
  console.log('delete', req.params)
  recordSchema.findById(req.params.id)
    .then(data => data.remove())
    .then(() => res.redirect('/'))
    .catch(error => { console.log(error) })
})


app.listen(post, () => {
  console.log('Server is enable...')
})


