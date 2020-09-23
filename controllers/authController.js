const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const { validationResult } = require('express-validator');

const User = require('../models/user');
const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: "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"
  }
}));

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/login', {
    path: '/login',
    PageTitle: 'Login',
    errorMessage: message, oldInput: {
      email: "", password: null
    },
    validationErrors: []
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      path: '/login',
      PageTitle: 'Login',
      errorMessage: errors.array()[0].msg, oldInput: {
        email: email,
        password: password,

      },
      validationErrors: errors.array()
    });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(422).render('auth/login', {
          path: '/login',
          PageTitle: 'Login',
          errorMessage: "User Not Found , Please Signup!!",
          oldInput: {
            email: email,
            password: password,

          },
          validationErrors: [{ param: 'email' }]
        });
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              return res.redirect('/');
            });
          } else {

            return res.status(422).render('auth/login', {
              path: '/login',
              PageTitle: 'Login',
              errorMessage: "You Entered Wrong Password",
              oldInput: {
                email: email,
                password: password,

              },
              validationErrors: [{ param: 'password' }]
            });
          }





        })
        .catch((err) => {
          console.log(err);
          res.redirect('/login');
        });

    })
    .catch((err) => console.log(err));
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/signup', {
    path: '/signup',
    PageTitle: 'Signup',
    errorMessage: message,
    oldInput: {
      email: "", password: null, confirmPassword: null
    },
    validationErrors: []
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('auth/signup', {
      path: '/signup',
      PageTitle: 'Signup',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: req.body.confirmPassword
      },
      validationErrors: errors.array()
    });;
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] },
      });

      return user.save();
    })
    .then((result) => {
      res.redirect('/login');
      // return transporter.sendMail({
      //   to: email,
      //   from: 'Shashwat Node App <support@oviotech.in>',
      //   subject: "Sign Up Succesfull!!",
      //   html: '<h1>You Sucessfully Signed up</h1><br><h2>Login to Continue!!</h2>'
      // });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/resetPassword',
    { path: '/resetPass', PageTitle: "Reset Password", errorMessage: message }
  );
}

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/resetPass');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          req.flash('error', "No Account with this email Found!!");
          return res.redirect('/resetPass');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();

      }
      ).then(result => {
        res.redirect('/');
        transporter.sendMail({
          to: req.body.email,
          from: 'Shashwat Node App <support@oviotech.in>',
          subject: "Reset Password!!!",
          html: `
          <p> You requested a password rest</p>
          <p>Click this <a href="http://localhost:3000/resetPass/${token}">link</a> to set a new password</p>

          `
        });

      }).catch(err => console.log(err));
  })
}

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() }
  })
    .then(user => {

      // if (!user) { return res.redirect('PageNotFound') }

      let message = req.flash('error');
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }

      res.render('auth/new-pass', {
        path: '/new-pass',
        PageTitle: 'New Password',
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token
      });

    })
    .catch(err => console.log(err));
}
exports.postNewPassword = (req, res, next) => {

  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;
  User.findOne({ resetToken: passwordToken, resetTokenExpiration: { $gt: Date.now() }, _id: userId })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    }).then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      resetUser.save();
    }).then(result => {
      res.redirect('/login');
    })
    .catch(err => console.log(err));

};