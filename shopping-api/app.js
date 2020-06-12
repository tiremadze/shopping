var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
// const session = require("express-session");
var logger = require("morgan");
var cors = require("cors");
global.appRoot = path.resolve(__dirname);
var indexRouter = require("./routes/index");

var app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(session({ secret: "SESSION SECRET" }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = app;
