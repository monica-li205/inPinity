const express = require("express");
const router = express.Router();

module.exports = (db, helpers, userHelpers) => {
  router.get("/", (req, res) => {
    const offset = Number(Object.values(req.query));

    helpers
      .getAllPosts(db, offset)
      .then((posts) => {
        res.json(posts);
      })
      .catch((err) => err);
  });

  router.post("/search", (req, res) => {
    const query = `%${req.body.q}%`;
    const userSession = req.session.user_id;

    const getUserRecord = userHelpers.getUserWithId(db, userSession);
    const searchPost = helpers.searchPosts(db, query);

    Promise.all([getUserRecord, searchPost])
    .then(data => {
      const searchQueryShow = query.slice(1, query.length - 1);
      templateVars = {
        user: data[0],
        posts: data[1],
        search: searchQueryShow,
        searchCount: data[1].length
      }
      res.render("search_result", templateVars);
    }) 
  });

  // Add new post
  router.post("/", (req, res) => {
    const params = req.body;
    const user = req.session.user_id;
    const offset = Number(Object.values(req.query));
    const templateVars = {
      user: user,
      error: "Your post has been submitted",
    };

    // const addPost = helpers.addPost(db, user, params);
    // const getAllPosts = helpers.getAllPosts(db, offset);
    if (user) {
      helpers
        .addPost(db, user, params)
        .then((post) => {
          res.redirect("/main");
        })
        .catch((err) => err);
    } else {
      res.status(400).send("Not allowed");
      return;
    }
  });

  router.post("/rate/:id", (req, res) => {
    const postId = req.params.id;
    const postRating = req.body.rating;
    const userId = req.session.user_id;

    helpers.ratePost(db, userId, postId, postRating)
    .then(data => {
      res.redirect(`/post/${postId}`);
    })
    .catch(err => err);
  })

  // Edit specific post by ID
  router.post("/:id", (req, res) => {
    const queryParams = [req.body];
    helpers
      .editPost(db, req.params.id, queryParams)
      .then((post) => {
        res.redirect(`/post/${req.params.id}`);
      })
      .catch((err) => err);
  });

  // Delete post if owner
  router.post("/delete/:id", (req, res) => {
    helpers
      .getPostOwner(db, req.params.id)
      .then((post) => {
        if (post.user_id === req.session.user_id) {
          db.query("DELETE FROM posts WHERE id = $1", [req.params.id])
            .then((data) => {
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
    helpers
      .commentPost(db, userId, postId, comment)
      .then((data) => {
        res.redirect(`/post/${postId}`);
      })
      .catch((err) => err);
  });

  return router;
};
