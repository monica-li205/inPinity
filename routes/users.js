/* eslint-disable camelcase */
/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db, helpers) => {
  let templateVars = {};
  router.get("/", (req, res) => {
    db.query("SELECT * FROM users;").then((data) => {
      const users = data.rows;
      res.json({
        users,
      });
    });
  });

  // Get user by ID
  // router.get("/:id", (req, res) => {
  //   console.log("/:id");
  //   helpers
  //     .getUserWithId(db, req.params.id)
  //     .then((user) => {
  //       res.json(user);
  //     })
  //     .catch((err) => {
  //       res.status(500).json({
  //         error: err.message,
  //       });
  //     });
  //   ``;
  // });

  // Register new user
  router.post("/", (req, res) => {
    const user = req.body;
    templateVars = {
      user: undefined,
      error: undefined,
    };
    helpers
      .getUserWithUsername(db, user.username)
      .then((data) => {
        if (data) {
          templateVars = {
            user: undefined,
            error: "User exists",
          };
          res.status(400).render("index", templateVars);
          return;
        }
        helpers
          .addUser(db, user)
          .then((data) => {
            const newUser = data[0];
            req.session.user_id = newUser.id;
            console.log(newUser.id);
            res.redirect("/");
          })
          .catch((err) => err);
      })
      .catch((err) => err);
  });

  // Edit user info
  router.post("/:id", (req, res) => {
    helpers
      .getUserWithId(db, req.params.id)
      .then((user) => {
        if (!user || user.id !== req.session.user_id) {
          templateVars = {
            user: undefined,
            error: "Invalid login"
          }
          res.redirect("/main");
        }
        const params = req.body;
        helpers
          .editUser(db, user.id, params)
          .then(data => {
            console.log(data);
            res.redirect("/main");
          })
          .catch((err) => err);
      })
      .catch((err) => err);
  });
  return router;
};
