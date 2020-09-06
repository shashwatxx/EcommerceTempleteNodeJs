const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require('express-handlebars');
// // const pug = require('pug');
const { constants } = require("buffer");
// const { use } = require("./routes/admin");
const adminRoutes = require("./routes/admin");
// const shoproutes = require("./routes/shop");
const errorController = require("./controllers/errorsController");
const mongoConnect = require("./util/database").mongoConnect;

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

// app.use((req, res, next) => {});

app.use("/admin", adminRoutes);
// app.use(shoproutes);

app.use(errorController.get404);
mongoConnect(() => {
  app.listen(3000);
});
