

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) 
    return next()
  // console.log('please login~')
  req.flash('loginMSG', '請登入~')
  return res.redirect('/users/login')
}