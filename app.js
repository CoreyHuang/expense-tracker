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
if (process.env.PORT) {
  require('./models/seeds/categorySeeder')
  require('./models/seeds/recordSeeder')
}
// console.log('test-db')

app.engine('handlebars', exphbs({ defaultLayout: "main" }))
app.set('view engine', 'handlebars')

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

app.listen(post, () => {
  console.log('Server is enable...')
})

