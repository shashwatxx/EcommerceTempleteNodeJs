"use strict";

var products = [];

exports.getAddProduct = function (req, res, next) {
  res.render("add-product", {
    PageTitle: "Add Product",
    path: '/admin/add-product'
  });
};

exports.postAddProduct = function (req, res, next) {
  console.log(req.body);
  products.push({
    title: req.body.title
  });
  res.redirect("/");
};

exports.getProducts = function (req, res, next) {
  // console.log("From Shopj.s", adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  res.render("shop", {
    prods: products,
    docTitile: "Shop",
    path: '/',
    PageTitle: "Shop"
  });
};