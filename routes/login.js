const express = require('express');
const router = express.Router();

module.exports = (db, helpers) => {
  router.get("/", (req, res) => {
    res.render("login");
  })

  return router;
}