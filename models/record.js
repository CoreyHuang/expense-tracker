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
