const express = require("express");
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', (req, res, next) => { 
    res.render('/');
})

module.exports = router;