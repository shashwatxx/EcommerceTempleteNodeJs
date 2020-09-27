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
    body('imageUrl'),
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
    body('price').isFloat(),
    body('description')
        .isLength({ min: 5, max: 400 })
        .trim()
], isAuth, admincontroller.postEditProduct);

router.delete("/product/:productId", isAuth, admincontroller.deleteProduct);

module.exports = router;
