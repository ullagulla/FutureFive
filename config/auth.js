module.exports = {
  ensureAuthenticated: function(req, res, next) {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Du måste logga in');
    res.redirect('/admin/signin');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/admin/addproducts', {user:null});      
  }
};
