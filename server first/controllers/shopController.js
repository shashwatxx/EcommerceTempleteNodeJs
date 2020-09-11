const Db = require("mongodb/lib/db");
const Product = require("../models/product");
const { getDb } = require("../util/database");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      console.log(products);
      res.render("shop/product-list", {
        prods: products,
        path: "/products",
        PageTitle: "All Products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  //Approach to find using Where Query
  // Product.findById(productId)
  //   .then((products) => {
  //     res.render("shop/product-detail", {
  //       PageTitle: products.title,
  //       product: products,
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => console.log(err));
  //Approach to find using Primary key
  Product.findById(productId)
    .then((product) => {
      console.log(product);
      res.render("shop/product-detail", {
        PageTitle: product.title,
        product: product,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndexPage = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      console.log(products);
      res.render("shop/index", {
        prods: products,
        path: "/",
        PageTitle: "Shop",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      res.render("shop/cart", {
        path: "/cart",
        PageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product).then((result) => {
        res.redirect("/cart");
      });
    })
    .then((result) => {
      console.log(result);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCartById(prodId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch();
};

exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        PageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { path: "/checkout", PageTitle: "Checkout" });
};
