const express = require("express");
const router = express.Router();

module.exports = (db, userHelpers, postHelpers) => {
  router.get("/", (req, res) => {
    const offset = Number(Object.values(req.query));

    let templateVars = {
      user: undefined,
      error: undefined,
<<<<<<< HEAD
    };
    if (req.session.user_id) {
      res.redirect("/main");
    } else {
      res.render("index", templateVars);
    }
  });

  router.get("/main", (req, res) => {
    let templateVars = {};
    helpers
      .getUserWithId(db, req.session.user_id)
      .then((data) => {
        helpers.totalPostsByUser(db, data.id).then((result) => {
          templateVars = {
            user: data,
            count: result.count,
          };
          res.render("main", templateVars);
        });
=======
      posts: undefined
    }
    postHelpers.getAllPosts(db, offset)
    .then(posts => {
      if (req.session.user_id) {
        templateVars = {
          posts: posts
        }
        res.render("main", templateVars);
      } else {
        templateVars = {
          user: undefined,
          posts: posts,
          error: undefined
        }
        console.log(posts);
        res.render("index", templateVars);
        // res.render("index", templateVars);
      }
    })
    .catch(err => err);
  })

  router.get("/main", (req, res) => {
    let templateVars = {};
    

    userHelpers.getUserWithId(db, req.session.user_id)
    .then(data => {
      userHelpers.totalPostsByUser(db, data.id)
      .then(result => {
        templateVars = {
          user: data,
          count: result.count
        } 
        res.render("main", templateVars);
>>>>>>> d9ecb60c0b5ab9f8c7cfc5bc93e0835918e42c7b
      })
      .catch((err) => err);
  });

  router.get("/users", (req, res) => {
    let templateVars = {};
    helpers
      .getUserWithId(db, req.session.user_id)
      .then((data) => {
        helpers.totalPostsByUser(db, data.id).then((result) => {
          templateVars = {
            user: data,
            count: result.count,
          };
          res.render("users", templateVars);
        });
      })
      .catch((err) => err);
  });

  router.get("/cp", (req, res) => {
    let templateVars = {
<<<<<<< HEAD
      user: helpers.getUserWithId(db, req.session.user_id),
=======
      user: userHelpers.getUserWithId(db, req.session.user_id)
>>>>>>> d9ecb60c0b5ab9f8c7cfc5bc93e0835918e42c7b
    };

    if (!req.session.user_id) {
      templateVars = { user: undefined };
    }

    res.render("create_post", templateVars);
  });

  router.get("/cb", (req, res) => {
    let templateVars = {
      user: helpers.getUserWithId(db, req.session.user_id),
    };

    if (!req.session.user_id) {
      templateVars = { user: undefined };
    }

    res.render("create_board", templateVars);
  });

  router.get("/upo", (req, res) => {
    let templateVars = {};
    helpers
      .getUserWithId(db, req.session.user_id)
      .then((data) => {
        helpers.totalPostsByUser(db, data.id).then((result) => {
          templateVars = {
            user: data,
            count: result.count,
          };
          res.render("user_posts", templateVars);
        });
      })
      .catch((err) => err);
  });

  router.get("/users", (req, res) => {
    let templateVars = {};
    helpers
      .getUserWithId(db, req.session.user_id)
      .then((data) => {
        helpers.totalPostsByUser(db, data.id).then((result) => {
          templateVars = {
            user: data,
            count: result.count,
          };
          res.render("users", templateVars);
        });
      })
      .catch((err) => err);
  });
  router.get("/login", (req, res) => {
    let templateVars = {
<<<<<<< HEAD
      user: helpers.getUserWithId(db, req.session.user_id),
=======
      user: userHelpers.getUserWithId(db, req.session.user_id)
>>>>>>> d9ecb60c0b5ab9f8c7cfc5bc93e0835918e42c7b
    };

    if (!req.session.user_id) {
      templateVars = { user: undefined };
    }
    res.render("login", templateVars);
  });

  router.post("/", (req, res) => {
    const user = req.body;
    const email = user.email;

<<<<<<< HEAD
    helpers
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
        res.redirect("/main");
      })
      .catch((err) => err);
=======
    userHelpers.getUserWithEmail(db, email)
    .then(data => {
      const userRecord = data;
      
      if (!userRecord || userRecord.password !== user.password) {
        // res.status(400).send("Invalid login");
        // res.status(401).send("Unauthorized");
        const templateVars = {
          user: undefined,
          error: "Invalid login",
        }
        res.status(401).render("index", templateVars);
        return;
      }
      
      userRecord.password = undefined;
      req.session.user_id = userRecord.id;
      // res.render("main", templateVars);
      res.render("main", templateVars);
      // res.redirect("/main");
    })
    .catch(err => err);
>>>>>>> d9ecb60c0b5ab9f8c7cfc5bc93e0835918e42c7b
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
};
