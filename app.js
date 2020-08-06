const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const post = 3000

app.engine('handlebars', exphbs({ defaultLayout: "main" }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(post, () => {
  console.log('Server is enable...')
})