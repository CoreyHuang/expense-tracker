if (process.env.NODE_ENV !== 'production')
  require('dotenv').config()

const mongoose = require('mongoose')
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker'
mongoose.connect(process.env.mongodb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', () => { console.log('mongodb error!!!') })
db.once('open', () => { console.log('mongodb connected~') })

module.exports = db