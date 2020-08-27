const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const categorySchema = require('./models/category.js')
const recordSchema = require('./models/record.js')
const bodyParser = require('body-parser')
const router = require('./routes/index.js')
const session = require('express-session')
const usePassport = require('./config/passport')
const localStorage = require('./middleware/localStorage')
const flash = require('connect-flash')

require('./config/mongoose.js')

const app = express()
const post = process.env.PORT || 3000

app.engine('handlebars', exphbs({ defaultLayout: "main" }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: 'test777',
  resave: false, 
  saveUninitialized: true
}))
app.use(flash())
usePassport(app)
app.use(localStorage)

app.use(router)

app.listen(post, () => {
  console.log('Server is enable...')
})

