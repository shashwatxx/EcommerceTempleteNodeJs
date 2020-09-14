"use strict";

var bcrypt = require('bcryptjs');

var User = require('../models/user');

exports.getLogin = function (req, res, next) {
  res.render('auth/login', {
    path: '/login',
    PageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = function (req, res, next) {
  User.findById('5f5bf480f7bcdb0d2bfb6fd5').then(function (user) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save(function (err) {
      console.log(err);
      res.redirect('/');
    });
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.getSignup = function (req, res, next) {
  res.render('auth/signup', {
    path: '/signup',
    PageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postSignup = function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  User.findOne({
    email: email
  }).then(function (userDoc) {
    if (userDoc) {
      console.log("User Already Exist");
      return res.redirect('/signup');
    }

    return bcrypt.hash(password, 12).then(function (hashedPassword) {
      var user = new User({
        email: email,
        password: hashedPassword,
        cart: {
          items: []
        }
      });
      return user.save();
    }).then(function () {
      res.redirect('/login');
    });
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.postLogout = function (req, res, next) {
  req.session.destroy(function (err) {
    console.log(err);
    res.redirect('/');
  });
};