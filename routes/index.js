const express = require('express');
const router = express.Router();

module.exports = (db, helpers) => {
  router.get("/", (req, res) => {
    const templateVars = {
      user: undefined
    }
    if (req.session.user_id) {
      res.redirect("/main");
    } else {
      res.render("index", templateVars);
    }
  })

  router.get("/main", (req, res) => {
    const templateVars = {
      user: helpers.getUserWithId(db, req.session.user_id)
    }
    res.render("main", templateVars);
  })

  router.get("/cp", (req, res) => {
    let templateVars = {
      user: helpers.getUserWithId(db, req.session.user_id)
    };
    
    if (!req.session.user_id) {
      templateVars = { user: undefined };
    }

    res.render("create_post", templateVars);
  });

  router.get("/login", (req, res) => {
    let templateVars = {
      user: helpers.getUserWithId(db, req.session.user_id)
    };
    
    if (!req.session.user_id) {
      templateVars = { user: undefined };
    }
    res.render("login", templateVars);
  })

  router.post("/", (req, res) => {
    const user = req.body;
    const email = user.email;

    helpers.getUserWithEmail(db, email)
    .then(data => {
      const userRecord = data;
      if (!userRecord || userRecord.password !== user.password) {
        // res.status(400).send("Invalid login");
        res.status(401).send("Unauthorized");
        return;
      }

      userRecord.password = undefined;
      req.session.user_id = userRecord.id;
      const templateVars = {user: userRecord};
      // res.render("main", templateVars);
      res.redirect("/main");
    })
    .catch(err => err);
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  })
  
  return router;
}