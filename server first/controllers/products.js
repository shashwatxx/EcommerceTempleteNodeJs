const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    PageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  // console.log("From Shopj.s", adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  const products = Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      docTitile: "Shop",
      path: "/",
      PageTitle: "Shop",
    });
  });
};
