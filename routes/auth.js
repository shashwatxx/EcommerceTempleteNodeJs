const express = require('express');
const { check, body } = require('express-validator');
const authController = require('../controllers/authController');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', [
    body('email')
        .isEmail()
        .withMessage("Enter correct E-Mail")
        .normalizeEmail(),
    body('password', 'Invalid Password')
        .isLength({ min: 5 })
        .isAlphanumeric().trim()]
    , authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/signup', authController.getSignup);

router.post('/signup', [
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email.').normalizeEmail()
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject(
                        'E-Mail exists already, please pick a different one.'
                    );
                }
            });
        }),
    body(
        'password',
        'Please enter a password with only numbers and text and at least 5 characters.'
    )
        .isLength({ min: 5 })
        .isAlphanumeric().trim(),
    body('confirmPassword').trim().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords have to match!');
        }
        return true;
    })
]
    , authController.postSignup);

router.get('/resetPass', authController.getReset);

router.post('/resetPass', authController.postReset);

router.get('/resetPass/:token', authController.getNewPassword);

router.post('/new-pass', authController.postNewPassword);


module.exports = router;