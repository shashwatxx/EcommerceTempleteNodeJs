"use strict";

var express = require("express");

var path = require("path");

var productsController = require('../controllers/products');

var router = express.Router();
router.get("/", productsController.getProducts);
module.exports = router;