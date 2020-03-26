const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const Product = require('../models/product')

const ADD_PRODUCT = '/admin/addproducts'
const SIGNIN = '/admin/signin'
const SIGNUP = '/admin/signup'
const SIGNOUT = '/admin/signout'

// Load User model
const Admin = require('../models/Admin')

const {
  ensureAuthenticated,
  forwardAuthenticated
} = require('./auth')
const verifyToken = require("./verify")

// Login Page
router.get(SIGNIN, verifyToken, forwardAuthenticated, (req, res) => res.render('admin/signin', {
  user: req.body.user,
  admin: req.admin
}))

// Register Page
router.get(SIGNUP, verifyToken, forwardAuthenticated, (req, res) => res.render('admin/signup', {
  user: req.body.user,
  admin: req.admin
}))

// Register
router.post(SIGNUP, (req, res) => {
  const {
    name,
    email,
    password,
    password2
  } = req.body

  if (!name || !email || !password || !password2) {
    req.flash(
      'error_msg',
      'Alla fält måste vara ifyllda'
    )
    return res.redirect(SIGNUP);
  }

  if (password != password2) {
    req.flash(
      'error_msg',
      'Lösenordet stämmer inte överens'
    )
    return res.redirect(SIGNUP);
  }

  if (password.length < 6) {
    req.flash(
      'error_msg',
      'Ditt lösenord måste minst vara sex tecken långt'
    )
    return res.redirect(SIGNUP);
  }
  Admin.findOne({
    email: email
  }).then(admin => {
    if (admin) {
      req.flash(
        'error_msg',
        'Din email är redan registrerad'
      )
      res.redirect(SIGNUP);
    } else {
      const newAdmin = new Admin({
        name,
        email,
        password
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin
            .save()
            .then(() => {
              req.flash(
                'success_msg',
                'Du är nu registerad och kan logga in'
              )
              res.redirect(SIGNIN);
            })
            .catch(err => console.log(err));
        })
      })
    }
  })
})

// Login
router.post(SIGNIN, (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: ADD_PRODUCT,
    failureRedirect: SIGNIN,
    failureFlash: true
  })(req, res, next)
})

// Logout
router.get(SIGNOUT, (req, res) => {
  req.logout();
  req.flash('success_msg', 'Du är utloggad')
  res.redirect(SIGNIN)
})

router.get(ADD_PRODUCT, verifyToken, ensureAuthenticated, (req, res) => {

  res.render('admin/add-product', {
    user: req.body.user,
    admin: req.admin
  })
})


router.post(ADD_PRODUCT, ensureAuthenticated, async (req, res) => {

  await new Product({
    name: req.body.productName,
    price: req.body.productPrice,
    imageUrl: "/img/" + req.body.imageUrl,
    description: req.body.productDescription,
    adminId: req.admin,
    adminName: req.admin.name
  }).save()

  return res.redirect(ADD_PRODUCT)
})

router.get("/admin/edit/:id", verifyToken, ensureAuthenticated, async (req, res) => {

  const product = await Product.findById({
    _id: req.params.id
  })

  res.render("admin/edit-product", {
    user: req.body.user,
    admin: req.admin,
    product
  })

})

router.post("/admin/edit/:id", ensureAuthenticated, async (req, res) => {

  await Product.updateOne({
    _id: req.params.id
  }, {
    $set: {
      name: req.body.productName,
      price: req.body.productPrice,
      description: req.body.productDescription,
      adminId: req.admin,
      adminName: req.admin.name
    }
  })

  res.redirect("/products")

})


module.exports = router;