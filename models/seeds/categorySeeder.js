const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const categorySchema = require('../category.js')
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!!!')
})

db.once('open', () => {
  console.log('mongodb connected~')
  const category = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
  const icon = ["fas fa-home", "fas fa-shuttle-van", "fas fa-grin-beam", "fas fa-utensils", "fas fa-pen"]
  category.forEach((data, index) => {
    console.log(index)
    categorySchema.create({
      category: data,
      icon: icon[index]
    })
      .then(() => { console.log("done") })
      .catch((error) => { console.log(error) })
  })

})

module.exports = db
  // < i class="fas fa-home" ></i > 家居物業
  // < i class="fas fa-shuttle-van" ></i > 交通出行
  // < i class="fas fa-grin-beam" ></i > 休閒娛樂
  // < i class="fas fa-utensils" ></i > 餐飲食品
  // < i class="fas fa-pen" ></i > 其他



