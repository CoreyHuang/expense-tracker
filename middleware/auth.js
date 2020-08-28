

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) 
    return next()
  req.flash('loginMSG', '請登入~')
  return res.redirect('/users/login')
}