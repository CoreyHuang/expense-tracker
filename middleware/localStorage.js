

module.exports = (req, res, next) => {
  res.locals.isAuthenticate = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.registerSuccess = req.flash('registerSuccess')
  next()
}