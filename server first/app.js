const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { constants } = require("buffer");
const adminRoutes = require("./routes/admin");
const shoproutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const errorController = require("./controllers/errorsController");
const e = require("express");
const User = require("./models/user");
const app = express();
app.set("view engine", "ejs");


app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5f5bf480f7bcdb0d2bfb6fd5")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shoproutes);
app.use(authRoutes);
app.use(errorController.get404);
mongoose
  .connect(
    "mongodb+srv://shashwat:2eAxUNsTSMK3N3Um@cluster0.ofh41.mongodb.net/shop?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((res) => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Shashwat", email: "test@test.com", cart: { items: [] }
        });
        user.save();
      }
    })


    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
