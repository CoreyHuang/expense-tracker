const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const recordSchema = require('../record.js')
// const categorySchema = require('../category.js')
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!!!')
})

db.once('open', () => {
  console.log('mongodb connected~')
  recordSchema.create({
    name: '午餐',
    category: '餐飲食品',
    date: '2019/04/23',
    amount: '60',
    },
    {
      name: '晚餐',
      category: '餐飲食品',
      date: '2019/04/23',
      amount: '60',
    },
    {
      name: '捷運',
      category: '交通出行',
      date: '2019/04/23',
      amount: '120',
    },
    {
      name: '電影 : 驚奇隊長',
      category: '休閒娛樂',
      date: '2019/04/23',
      amount: '220',
    },
    {
      name: '租金',
      category: '家居物業',
      date: '2019/04/01',
      amount: '25000',
    })
    .then(() => { console.log("done") })
    .catch((error) => { console.log(error) })
  // console.log("recordSchema.create", recordSchema.create)
})

module.exports = db

  // const category = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
  // category.forEach(data => {
  //   categorySchema.create({
  //     category: data
  //   })
  //     .then(() => { console.log("done") })
  //     .catch((error) => { console.log(error) })
  // })
