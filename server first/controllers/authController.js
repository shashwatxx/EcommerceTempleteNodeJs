const User = require('../models/user');

exports.getLogin = (req, res, next) => {

  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    PageTitle: "Login",
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('5f5bf480f7bcdb0d2bfb6fd5')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
};

exports.postlogOut = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });

};