const db = require('../../config/mongoose.js')
const categorySchema = require('../category.js')

db.once('open', () => {
  console.log('mongodb connected~')
  categorySchema.create(
    {
      category: '家居物業',
      icon: "fas fa-home"
    },
    {
      category: '交通出行',
      icon: "fas fa-shuttle-van"
    },
    {
      category: '休閒娛樂',
      icon: "fas fa-grin-beam"
    },
    {
      category: '餐飲食品',
      icon: "fas fa-utensils"
    },
    {
      category: '其他',
      icon: "fas fa-pen"
    })
    .then(() => {
      console.log("done")
      db.close()
    })
    .catch((error) => { console.log(error) })
})

module.exports = db


