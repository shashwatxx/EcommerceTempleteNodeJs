const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require('express-handlebars');
// // const pug = require('pug');

const adminRoutes = require("./routes/admin");
const shoproutes = require("./routes/shop");
const errorController = require("./controllers/errorsController");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const Order = require("./models/order");
const OrderItem = require("./models/order-items");
const CartItem = require("./models/cart-item");
const { constants } = require("buffer");
const { use } = require("./routes/admin");

const app = express();
// app.engine('hbs', expressHbs);
app.set("view engine", "ejs");
// app.set("views", "views");  Not required if the name of html folder is views

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shoproutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Shashwat", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
    // console.log(user);
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
