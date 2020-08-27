const mongoose = require('mongoose')
const { schema } = require('./category')
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
  userId : {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    index: true,
  },
  merchant: { type: String },
}, { timestamps: { createdAt: 'created_at' } })

module.exports = mongoose.model("record", record)
