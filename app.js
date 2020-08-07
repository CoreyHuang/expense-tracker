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


  // < i class="fas fa-home" ></i > 家居物業
  // < i class="fas fa-shuttle-van" ></i > 交通出行
  // < i class="fas fa-grin-beam" ></i > 休閒娛樂
  // < i class="fas fa-utensils" ></i > 餐飲食品
  // < i class="fas fa-pen" ></i > 其他