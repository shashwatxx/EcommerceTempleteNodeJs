const express = require('express');
const { check, body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/signup', authController.getSignup);

router.post('/signup', [
    check('email').isEmail()
        .withMessage("Please Enter a Valid Email"),
    body('password', "Password Should be of atleast 6 Characters ").isLength({ min: 6 })
    , body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match!!");
        }
        return true;
    })]
    , authController.postSignup);

router.get('/resetPass', authController.getReset);

router.post('/resetPass', authController.postReset);

router.get('/resetPass/:token', authController.getNewPassword);

router.post('/new-pass', authController.postNewPassword);


module.exports = router;