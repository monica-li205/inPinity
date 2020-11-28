const dbParams = require("../../lib/db")

const getAllPosts = (db) => {
  const queryString = `
    SELECT * FROM posts;
  `
  return db.query(queryString)
  .then(res => res.rows)
  .catch(err => err);
}
exports.getAllPosts = getAllPosts;