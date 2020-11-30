/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db, helpers) => {

  router.get("/", (req, res) => {
    db.query("SELECT * FROM users;")
    .then(data => {
      const users = data.rows;
      res.json({ users });
    })
  })

  // Get user by ID
  router.get("/:id", (req, res) => {
    helpers.getUserWithId(db, req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          error: err.message
        });
    });``
  });

  // Register new user
  router.post("/", (req, res) => {
    const user = req.body;
    helpers.getUserWithUsername(db, user.username)
    .then(data => {
      if (data) {
        res.status(400).send("User exists");
        return;
      } 
      helpers.addUser(db, user)
      .then(data => {
        const newUser = data.rows;
        res.json(newUser);
      })
      .catch(err => err);
    })
    .catch(err => err);
  })

  // Login user
  router.post("/login", (req, res) => {
    const user = req.body;
    const email = user.email;

    helpers.getUserWithEmail(db, email)
    .then(data => {
      const userRecord = data;
      if (!userRecord || userRecord.password !== user.password) {
        res.status(400).send("Invalid login");
        return;
      }
      userRecord.password = undefined;
      req.session.user_id = userRecord.id;
      const templateVars = {...userRecord};
      console.log(templateVars);
      res.render("index", templateVars);
    })
    .catch(err => err);
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.render("index");
  })

  // Edit user info
  router.put("/:id", (req, res) => {

    helpers.getUserWithId(db, req.params.id)
    .then(user => {
      if (!user || user.id !== req.session.user_id) {
        res.status(400).send("Unauthorized");
      }
      const params = req.body;
      helpers.editUser(db, user.id, params)
      .then(res.status(200).send("User info successfully changed"))
      .catch(err => err);
    })
    .catch(err => err);
  })
  return router;
};
