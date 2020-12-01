const express = require("express");
const router = express.Router();

module.exports = (db, userHelpers, postHelpers) => {
  router.get("/", (req, res) => {
    const offset = Number(Object.values(req.query));

    let templateVars = {
      user: undefined,
      error: undefined,
      posts: undefined,
    };
    postHelpers
      .getAllPosts(db, offset)
      .then((posts) => {
        if (req.session.user_id) {
          templateVars = {
            posts: posts,
          };
          res.render("main", templateVars);
        } else {
          templateVars = {
            user: undefined,
            posts: posts,
            error: undefined,
          };
          console.log(posts);
          res.render("index", templateVars);
          // res.render("index", templateVars);
        }
      })
      .catch((err) => err);
  });

  router.get("/main", (req, res) => {
    const offset = Number(Object.values(req.query));
    let templateVars = {
      user: undefined,
      error: undefined,
      posts: undefined,
    };
    postHelpers
      .getAllPosts(db, offset)
      .then((posts) => {
        if (req.session.user_id) {
          templateVars = {
            posts: posts,
          };
          res.render("main", templateVars);
        }
      })
      .catch((err) => err);
  });

  router.get("/cp", (req, res) => {
    let templateVars = {
      user: userHelpers.getUserWithId(db, req.session.user_id),
    };

    if (!req.session.user_id) {
      templateVars = { user: undefined };
    }

    res.render("create_post", templateVars);
  });

  router.get("/login", (req, res) => {
    let templateVars = {
      user: userHelpers.getUserWithId(db, req.session.user_id),
    };

    if (!req.session.user_id) {
      templateVars = { user: undefined };
    }
    res.render("login", templateVars);
  });

  router.post("/", (req, res) => {
    const user = req.body;
    const email = user.email;

    userHelpers
      .getUserWithEmail(db, email)
      .then((data) => {
        const userRecord = data;

        if (!userRecord || userRecord.password !== user.password) {
          // res.status(400).send("Invalid login");
          // res.status(401).send("Unauthorized");
          const templateVars = {
            user: undefined,
            error: "Invalid login",
          };
          res.status(401).render("index", templateVars);
          return;
        }

        userRecord.password = undefined;
        req.session.user_id = userRecord.id;
        // res.render("main", templateVars);
        res.render("main", templateVars);
        // res.redirect("/main");
      })
      .catch((err) => err);
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
};
