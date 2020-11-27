const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // Logging in user
  router.get("/", (req, res) => {
    db.query()
    .then(res => res.rows)
    .catch(err => err);
  });

  router.post("/", (req, res) => {
    db.query()
    .then(res => res.rows[0])
    .catch(err => err);
  })
  return router;
};