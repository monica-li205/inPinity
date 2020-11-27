/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // Login user
  router.get("/", (req, res) => {
    db.query()
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  // Registering new user
  router.post("/", (req, res) => {
    const queryString = `
    `;
    db.query()
    .then(res => res.rows)
    .catch(err => err);
  });
  // Edit user info
  router.patch("/:id", (req, res) => {
    const id = req.params.body[id];
    db.quer()
    .then(res => res.rows)
    .catch(err => err);
  })
  return router;
};
