const mongoose = require('mongoose')
const userSchema = mongoose.Schema

const user = new userSchema({
  name: {required: true, type: String},
  email: { required: true, type: String },
  password: { required: true, type: String },
}, { timestamps: { createdAt: 'created_at' } })

module.exports = mongoose.model("user", user)



