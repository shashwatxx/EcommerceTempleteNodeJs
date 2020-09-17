"use strict";

var express = require("express");

var path = require("path");

var productsController = require('../controllers/products');

var router = express.Router();
router.get("/add-product", productsController.getAddProduct);
router.post("/add-product", productsController.postAddProduct); // exports.routes = router;

module.exports = router;