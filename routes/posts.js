const express = require('express');
const router  = express.Router();

module.exports = (db, helpers) => {
  router.get("/", (req, res) => {
    
    helpers.getAllPosts(db)
    .then(posts => {
      res.json({ posts });
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

  // Edit specific post by ID
  router.put("/:id", (req, res) => {
    const queryParams = [req.body];
    helpers.editPost(db, req.params.id, queryParams)
    .then(post => {
      res.json(post);
    })
    .catch(err => err);
  })
  return router;
};