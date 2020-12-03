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
    const getAllPostsLoggedIn = postHelpers.getAllPostsLoggedIn(db, userSession, offset);
    // const likedPostsByUser = postHelpers.likedPostsByUser(db, userSession);

    Promise.all([getUserRecord, getUserPostsCount, getAllPostsLoggedIn])
    .then((data) => {
      templateVars = {
        user: data[0],
        count: data[1].count,
        posts: data[2],
      };
      console.log(templateVars);
      res.render("main", templateVars);
    })
    .catch((err) => console.log(err));
  });

  // Users Boards

  router.get("/users/:id", (req, res) => {
    const userSession = req.session.user_id;
    const offset = Number(Object.values(req.query));

    const getUserRecord = userHelpers.getUserWithId(db, userSession);
    const getUserPostsCount = userHelpers.totalPostsByUser(db, userSession);
    const getUserPostCategories = postHelpers.getUserPostCategories(db, userSession);
    Promise.all([getUserRecord, getUserPostsCount, getUserPostCategories])
      .then((data) => {
        console.log("data", data[2]);
        templateVars = {
          user: data[0],
          count: data[1].count,
          boards: data[2],
        };
        res.render("users", templateVars);
      })
      .catch((err) => err);
  });

  // users board ->posts
  router.get("/user_posts/:category", (req, res) => {
    const userSession = req.session.user_id;
    const category = req.params.category;
    const offset = Number(Object.values(req.query));

    const getUserRecord = userHelpers.getUserWithId(db, userSession);
    const getUserPostsCount = userHelpers.totalPostsByUser(db, userSession);
    const getPostsByCategory = postHelpers.getPostsByCategory(db, userSession, category, userSession, offset);

    Promise.all([getUserRecord, getUserPostsCount, getPostsByCategory])
    .then(data => {
      templateVars = {
        user: data[0],
        count: data[1].count,
        posts: data[2],
        board: category
      }
      res.render("user_posts", templateVars);
    })
  });

  router.get("/cb", (req, res) => {
    let templateVars = {
      user: userHelpers.getUserWithId(db, req.session.user_id),
    };

    if (!req.session.user_id) {
      templateVars = { user: undefined };
    }

    res.render("create_board", templateVars);
  });


  router.get("/edit-b", (req, res) => {
    let templateVars = {
      user: userHelpers.getUserWithId(db, req.session.user_id),
    };

    if (!req.session.user_id) {
      templateVars = { user: undefined };
    }

    res.render("../edit_board", templateVars);
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
