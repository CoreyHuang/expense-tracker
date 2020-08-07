const mongoose = require('mongoose')
const Schema = mongoose.Schema

const category = new Schema ({
  category: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  } 
})

module.exports = mongoose.model("category", category)   