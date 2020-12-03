const express = require("express");
const router = express.Router();

module.exports = (db, helpers) => {
  router.get("/", (req, res) => {
    const offset = Number(Object.values(req.query));

    helpers
      .getAllPosts(db, offset)
      .then((posts) => {
        res.json(posts);
      })
      .catch((err) => err);
  });

  router.get("/search", (req, res) => {
    const query = `%${req.query.q}%`;
    const offset = Number(Object.values(req.query));

    helpers.searchPosts(db, query, offset)
    .then(posts => {
      templateVars = {
        user: undefined,
        posts: posts,
        error: undefined
      }
      res.render("index", templateVars);
    })
    .catch(err => err);
  })

  // Get specific post by ID
  // router.get("/:id", (req, res) => {
  //   helpers
  //     .getPostWithId(db, req.params.id)
  //     .then((post) => {
  //       res.json(post);
  //     })
  //     .catch((err) => err);
  // });

  // Add new post
  router.post("/", (req, res) => {
    const params = req.body;
    const user = req.session.user_id;
    const offset = Number(Object.values(req.query));
    const templateVars = {
      user: user,
      error: "Your post has been submitted",
    };

    const addPost = helpers.addPost(db, user, params);
    const getAllPosts = helpers.getAllPosts(db, offset);
    if (user) {
      helpers
        .addPost(db, user, params)
        .then(post => {
          console.log("added");
          res.redirect("/main");
        })
        .catch((err) => err);
    } else {
      res.status(400).send("Not allowed");
      return;
    }
  });

  // Edit specific post by ID
  router.post("/:id", (req, res) => {
    const queryParams = [req.body];
    helpers
      .editPost(db, req.params.id, queryParams)
      .then(post => {
        res.redirect(`/post/${req.params.id}`)
      })
      .catch((err) => err);
  });

  // Delete post if owner
  router.post("/delete/:id", (req, res) => {
    helpers
      .getPostOwner(db, req.params.id)
      .then((post) => {
        console.log(post.user_id);
        if (post.user_id === req.session.user_id) {
          db.query("DELETE FROM posts WHERE id = $1", [req.params.id])
            .then(data => {
              res.redirect("/main");
            })
            .catch((err) => err);
        } else {
          res.status(400).send("Not allowed");
          return;
        }
      })
      .catch((err) => err);
  });

  router.post("/comment/:id", (req, res) => {
    const comment = req.body.comment;
    const userId = req.session.user_id;
    const postId = req.params.id;
    helpers.commentPost(db, userId, postId, comment)
    .then(data => {
      res.redirect(`/post/${postId}`);
    })
    .catch(err => err);
  })

  return router;
};
