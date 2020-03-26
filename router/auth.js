module.exports = {
  ensureAuthenticated: function (req, res, next) {
    req.admin = req.user
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Du måste logga in');
    res.redirect('/admin/signin');
  },
  forwardAuthenticated: function (req, res, next) {
    req.admin = req.user
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/admin/addproducts', {
      user: null
    });
  },
  checkAuthentication: function (req, res, next) {
    req.admin = req.user
    return next();
  }
};