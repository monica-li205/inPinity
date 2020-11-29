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
    });
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
    console.log(user);
    const sql = `SELECT * FROM users WHERE email = $1;`;
    const param = [user.email];
    db.query(sql, param)
      .then(data => {
        const userRecord = data.rows[0];
        if (!userRecord || userRecord.password !== user.password) {
          res.status(300).send("not allowed");
          return;
        }
        userRecord.password = undefined;
        console.log(userRecord.id);
        req.session.user_id = userRecord.id;
        // res.send(userRecord);
        const templateVars = {...userRecord};
        console.log(templateVars);
        res.render("index", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.render("index");
  })

  // Edit user info
  router.put("/:id", (req, res) => {
    const data = req.body;
    console.log(req.body);
    if (!req.params.id) {
      res.status(400).send("bad request");
      return;
    }
    const params = [data.email, req.params.id];
    const sql = `UPDATE users SET email = $1 WHERE id = $2 RETURNING *`;
    
    db.query(sql, params)
      .then(data => {
        const userRecord = data.rows[0];
        console.log(userRecord);
        if (!userRecord) {
          res.status(300).send("not allowed");
          return;
        }
        userRecord.password = undefined;
        // req.session.user_id = userRecord.id;
        res.send(userRecord);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  })
  return router;
};
