const userSchema = require('../user.js')
const recordSchema = require('../record.js')
const db = require('../../config/mongoose.js')
const bcryptjs = require('bcryptjs')

const userAccount = {
  name: "這裡是哪",
  email: "test@example.com",
  password: "123",
}

let userData = [
  {
    name: '午餐',
    category: '餐飲食品',
    merchant: '不知道',
    date: '2020-04-23',
    amount: '60',
  },

  {
    name: '晚餐',
    category: '餐飲食品',
    merchant: '那是啥',
    date: '2020-05-23',
    amount: '60',
  },

  {
    name: '捷運',
    category: '交通出行',
    merchant: '不確定',
    date: '2020-04-23',
    amount: '120',
  },

  {
    name: '電影 : 驚奇隊長',
    category: '休閒娛樂',
    merchant: '看那邊',
    date: '2020-04-23',
    amount: '220',
  },

  {
    name: '租金',
    category: '家居物業',
    merchant: '有沒有',
    date: '2020-05-01',
    amount: '25000',
  },
]

db.once('open', async () => {
  try {
    const account = await createUser(userAccount)
    await createUserDate(userData, account)
    process.exit()
  }
  catch (e) { console.log(e) }
})


function createUser (userAccount) {
  return new Promise((resolve, reject) => {
    bcryptjs.genSalt(10)
      .then(salt => bcryptjs.hash(userAccount.password, salt))
      .then(hash => {
        userAccount.password = hash
        userSchema.create(userAccount)
          .then((user) => resolve(user))
          .catch(() => reject('Account create error'))
      })
      .catch(() => reject('password hash error'))
  })
}


function createUserDate (userData, user) {
  return new Promise((resolve, reject) => {
    Promise.all(Array.from({ length: userData.length }, (x, i) =>
      recordSchema.create(Object.assign(userData[i], { userId: user._id }))
    ))
      .then(() => resolve())
      .catch(() => reject('user data create error'))
  })
}
