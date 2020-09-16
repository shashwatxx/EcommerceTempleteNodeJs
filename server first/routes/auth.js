const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/signup', authController.getSignup);

router.post('/signup', authController.postSignup);

router.get('/resetPass', authController.getReset);

router.post('/resetPass', authController.postReset);

router.get('/resetPass/:token', authController.getNewPassword);

router.post('/new-pass', authController.postNewPassword);


module.exports = router;