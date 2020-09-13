const Db = require("mongodb/lib/db");
const Product = require("../models/product");
const Order = require("../models/order");
// const { getDb } = require("../util/database");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.render("shop/product-list", {
        prods: products,
        path: "/products",
        PageTitle: "All Products",
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      console.log(product);
      res.render("shop/product-detail", {
        PageTitle: product.title,
        product: product,
        path: "/products",
        isAuthenticated: req.isLoggedIn,

      });
    })
    .catch((err) => console.log(err));
};

exports.getIndexPage = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.render("shop/index", {
        prods: products,
        path: "/",
        PageTitle: "Shop",
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId').execPopulate()
    .then((user) => {
      const products = user.cart.items

      res.render("shop/cart", {
        path: "/cart",
        PageTitle: "Your Cart",
        products: products,
        isAuthenticated: req.session.isLoggedIn
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
    .removeFromCart(prodId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch();
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId').execPopulate()
    .then((user) => {
      const products = user.cart.items.map(i => { return { quantity: i.quantity, product: { ...i.productId._doc } } });
      const order = new Order({
        user: { name: req.user.name, userId: req.user }, products: products
      });
      return order.save();
    }).then((result) => {
      return req.user.clearCart();

    }).then(result => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        PageTitle: "Your Orders",
        orders: orders,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { path: "/checkout", PageTitle: "Checkout" });
};
