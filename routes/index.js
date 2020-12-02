/* eslint-disable camelcase */
const { response } = require("express");
const express = require("express");
const router = express.Router();

module.exports = (db, userHelpers, postHelpers) => {
  let templateVars;
  router.get("/", (req, res) => {
    const offset = Number(Object.values(req.query));
    templateVars = {
      user: undefined,
      error: undefined,
      posts: undefined,
    };
    postHelpers
      .getAllPosts(db, offset)
      .then((posts) => {
        if (req.session.user_id) {
          res.redirect("/main");
        } else {
          templateVars = {
            user: undefined,
            posts: posts,
            error: undefined,
          };
          res.render("index", templateVars);
        }
      })
      .catch((err) => err);
  });

  router.get("/main", (req, res) => {
    const offset = Number(Object.values(req.query));
    const userSession = req.session.user_id;

    const getUserRecord = userHelpers.getUserWithId(db, userSession);
    const getUserPostsCount = userHelpers.totalPostsByUser(db, userSession);
    const getAllPosts = postHelpers.getAllPosts(db, offset);

    Promise.all([getUserRecord, getUserPostsCount, getAllPosts])
      .then((data) => {
        templateVars = {
          user: data[0],
          count: data[1].count,
          posts: data[2],
        };
        res.render("main", templateVars);
      })
      .catch((err) => err);
  });

  // Users Boards

  router.get("/users/:id", (req, res) => {
    const userSession = req.session.user_id;
    const offset = Number(Object.values(req.query));

    const getUserRecord = userHelpers.getUserWithId(db, userSession);
    const getUserPostsCount = userHelpers.totalPostsByUser(db, userSession);
    const getAllUserPosts = postHelpers.getAllUserPosts(db, offset);
    Promise.all([getUserRecord, getUserPostsCount, getAllUserPosts])
      .then((data) => {
        console.log("data", data[0]);
        templateVars = {
          user: data[0].id,
          count: data[1].count,
          posts: data[2],
        };
        res.render("users", templateVars);
      })
      .catch((err) => err);
  });

  // users board ->posts
  router.get("/user_posts/:id", (req, res) => {
    const userSession = req.session.user_id;
    const offset = Number(Object.values(req.query));
    const getUserRecord = userHelpers.getUserWithId(db, userSession);
    const getUserPostsCount = userHelpers.totalPostsByUser(db, userSession);
    const getAllUserPosts = postHelpers.getAllUserPosts(db, offset);
    Promise.all([getUserRecord, getUserPostsCount, getAllUserPosts])
      .then((data) => {
        console.log("data", data[0]);
        templateVars = {
          user: data[0].id,
          count: data[1].count,
          posts: data[2],
        };
        res.render("user_posts", templateVars);
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
  // login route
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
        // fetch user -> need to find out the function
        userRecord.password = undefined;
        req.session.user_id = userRecord.id;
        console.log("userRecord", userRecord);
        res.redirect("/main");
      })
      .catch((err) => err);
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
};
