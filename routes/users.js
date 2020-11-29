/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Login user


  router.get("/", (req, res) => {
    const queryString = "SELECT * FROM users"
    db.query(queryString)
      .then(data => {
        const users = data.rows;
        console.log(users);
        res.json({
          users
        });
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  });


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
    req.session.user_id = null;
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
