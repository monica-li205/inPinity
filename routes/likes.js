const express = require("express");
const router = express.Router();
const postHelper = require("../db/db_helpers/posts.js");

module.exports = (db, helpers) => {
  router.post("/", (req, res) => {
    const user_id = req.session.user_id;
    const post_id = req.body.post_id;
    postHelper.likePost(db, user_id, post_id);
    console.log(user_id, post_id);
    res.send('hello');

  })
  return router;
}

// const express = require("express");
// const router = express.Router();
// const postHelper = require("../db/db_helpers/posts.js");

// module.exports = (db, helpers) => {
//   router.post("/:id", (req, res) => {
//     const user_id = req.session.user_id;
//     const post_id = req.params.id;

//     postHelper
//       .likePost(db, user_id, post_id)
//       .then((data) => {
//         console.log("likePOST", data);
//         // res.redirect("/main");
//       })
//       .catch((err) => err);
//   });

//   router.post("/:id", (req, res) => {
//     const user_id = req.session.user_id;
//     const post_id = req.params.id;
//     postHelper
//       .dislikePost(db, user_id, post_id)
//       .then((data) => {
//         console.log("dislikePOST", data);
//         // res.redirect("/main");
//       })
//       .catch((err) => err);
//   });
//   return router;
// };
