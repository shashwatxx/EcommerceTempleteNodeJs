const express = require("express");
const path = require("path");

const isAuth = require('../middleware/is-auth');
const { body } = require('express-validator');
const admincontroller = require("../controllers/adminController");
const router = express.Router();

router.get("/add-product", isAuth, admincontroller.getAddProduct);

router.get("/products", isAuth, admincontroller.getProducts);
router.post("/add-product", [
    body('title')
        .isString()
        .isLength({ min: 3 })
        .trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description')
        .isLength({ min: 5, max: 400 })
        .trim()
], isAuth, admincontroller.postAddProduct);
router.get("/edit-product/:productId", isAuth, admincontroller.getEditProduct);
router.post("/edit-product", [
    body('title')
        .isString()
        .isLength({ min: 3 })
        .trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description')
        .isLength({ min: 5, max: 400 })
        .trim()
], isAuth, admincontroller.postEditProduct);
router.post("/delete-product", isAuth, admincontroller.postDeleteProduct);

// router.get("/products", admincontroller.getAdminProducts);

// exports.routes = router;
module.exports = router;
