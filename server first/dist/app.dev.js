"use strict";

var http = require("http");

var path = require("path");

var express = require("express");

var bodyParser = require("body-parser"); // const expressHbs = require('express-handlebars');
// // const pug = require('pug');


var adminRoutes = require("./routes/admin");

var shoproutes = require("./routes/shop");

var errorController = require('./controllers/errors');

var app = express(); // app.engine('hbs', expressHbs);

app.set("view engine", "ejs"); // app.set("views", "views");  Not required if the name of html folder is views

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express["static"](path.join(__dirname, "public")));
app.use("/admin", adminRoutes);
app.use(shoproutes);
app.use(errorController.get404);
app.listen(3000);