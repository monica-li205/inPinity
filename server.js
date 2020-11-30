// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");
const postHelpers = require("./db/db_helpers/posts.js");
const userHelpers = require("./db/db_helpers/users.js");
const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect().catch((err) => console.log(err));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));
app.use(
  cookieSession({
    name: "session",
    keys: ["secret"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const loginPageRouter = require("./routes/login");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db, userHelpers));
app.use("/api/posts", postRoutes(db, postHelpers));
app.use("/login", loginPageRouter());
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users", (req, res) => {
  res.render("users");
});

app.get("/cp", (req, res) => {
  res.render("create_post");
});

app.get("/cb", (req, res) => {
  res.render("create_board");
});

app.get("/upo", (req, res) => {
  res.render("user_posts");
});

app.get("/post", (req, res) => {
  res.render("posts");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/search", (req, res) => {
  res.render("search_result");
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
