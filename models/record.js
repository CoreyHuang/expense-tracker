const mongoose = require('mongoose')
const Schema = mongoose.Schema

const record = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("record", record)


// 支出名稱：name
// 類別：category
// 日期：date
// 金額：amount