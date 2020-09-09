const express = require("express");
const path = require("path");

const admincontroller = require("../controllers/adminController");
const router = express.Router();

router.get("/add-product", admincontroller.getAddProduct);

router.get("/products", admincontroller.getProducts);
router.post("/add-product", admincontroller.postAddProduct);
router.get("/edit-product/:productId", admincontroller.getEditProduct);
// router.post("/edit-product", admincontroller.postEditProduct);
// router.post("/delete-product", admincontroller.postDeleteProduct);

// router.get("/products", admincontroller.getAdminProducts);

// exports.routes = router;
module.exports = router;
