const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load admin model
constAdmin = require('../models/Admin')

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            // Match admin
            Admin.findOne({
                email: email
            }).then(admin => {
                if (!admin) {
                    returndone(null, false, {
                        message: 'That email is not registered'
                    })
                }

                // Match password
                bcrypt.compare(password, admin.password, (err, isMatch) => {
                    if (err) throwerr
                    if (isMatch) {
                        returndone(null, admin)
                    } else {
                        returndone(null, false, {
                            message: 'Password incorrect'
                        })
                    }
                })
            })
        })
    )

    passport.serializeUser(function (admin, done) {
        done(null, admin.id);
    })

    passport.deserializeUser(function (id, done) {
        Admin.findById(id, function (err, admin) {
            done(err, admin);
        });
    });
};