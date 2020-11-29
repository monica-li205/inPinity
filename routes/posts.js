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
  return router;
};