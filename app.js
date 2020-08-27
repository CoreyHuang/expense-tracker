const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const categorySchema = require('./models/category.js')
const recordSchema = require('./models/record.js')
const bodyParser = require('body-parser')
const router = require('./routes/index.js')
require('./config/mongoose.js')

const app = express()
const post = process.env.PORT || 3000

app.engine('handlebars', exphbs({ defaultLayout: "main" }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

app.listen(post, () => {
  console.log('Server is enable...')
})

