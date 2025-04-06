var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var emailsRouter = require("./routes/emails");
var sequenceRouter = require("./routes/sequence");
const connectDB = require("./config/database");

dotenv.config();

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

connectDB();

app.use((req, res, next) => {
  console.log(`🔍 Request Received: ${req.method} ${req.url}`);
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/emails", emailsRouter);
app.use("/api/sequences", sequenceRouter);

module.exports = app;
