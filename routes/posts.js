const express = require('express');
const router  = express.Router();

module.exports = (db, helpers) => {
  router.get("/", (req, res) => {
    const offset = Number(Object.values(req.query));
    
    helpers.getAllPosts(db, offset)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => err);
  });

  // Get specific post by ID
  router.get("/:id", (req, res) => {
    helpers.getPostWithId(db, req.params.id)
    .then(post => {
      res.json(post);
    })
    .catch(err => err);
  })

  // Add new post
  router.post("/", (req, res) => {
    const params = req.body;
    const user = req.session.user_id;
    const templateVars = {
      user: user,
      error: undefined
    }
    if (user) {
      helpers.addPost(db, user, params)
      .then(post => {
        // res.render("main", templateVars)
        res.redirect("/main");
      })
      .catch(err => err);
    } else {
      res.status(400).send("Not allowed");
      return;
    }
  })

  // Edit specific post by ID
  router.put("/:id", (req, res) => {
    const queryParams = [req.body];
    helpers.editPost(db, req.params.id, queryParams)
    .then(post => {
      res.json(post);
    })
    .catch(err => err);
  })

  // Delete post if owner
  router.delete("/:id", (req, res) => {
    helpers.getPostOwner(db, req.params.id)
    .then(post => {
      if (post.post_owner === req.session.user_id) {
        db.query("DELETE FROM posts WHERE id = $1", [req.params.id])
        .then(res.status(200).send("Post deleted"))
        .catch(err => err);
      }
      res.status(400).send("Not allowed");
      return;
    })
    .catch(err => err);
  })

  return router;
};