

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) 
    return next()
  console.log('please login~')
  return res.redirect('/users/login')
}