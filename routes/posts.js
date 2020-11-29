const express = require('express');
const router  = express.Router();

module.exports = (db, helpers) => {
  // Logging in user
  router.get("/", (req, res) => {
    
    helpers.getAllPosts(db)
    .then(posts => {
      res.json({ posts });
    })
    .catch(err => err);
  });
  return router;
};