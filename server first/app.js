const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { constants } = require("buffer");

const adminRoutes = require("./routes/admin");
const shoproutes = require("./routes/shop");
const errorController = require("./controllers/errorsController");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

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
  User.findbyId("5f5a5889deb1e532c15cc42e")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shoproutes);

mongoose
  .connect(
    "mongodb+srv://shashwat:2eAxUNsTSMK3N3Um@cluster0.ofh41.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((res) => {
    app.listen(3000);
  })
  .catch();
