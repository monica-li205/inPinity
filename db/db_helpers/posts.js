const getAllPosts = (db) => {
  const queryString = `
    SELECT * FROM posts;
  `
  return db.query(queryString)
  .then(res => res.rows)
  .catch(err => err);
}
exports.getAllPosts = getAllPosts;

const getPostWithId = (db, id) => {
  const queryString = `
    SELECT * FROM posts
    WHERE id = $1;
  `;
  return db.query(queryString, [id])
  .then(res => res.rows[0])
  .catch(err => err);
}
exports.getPostWithId = getPostWithId;

const editPost = (db, id, params) => {
  const queryParams = [];

  console.log(queryParams);
  let queryString = `
    UPDATE posts SET
  `;
  if (params[0].title) {
    queryParams.push(params[0].title);
    if (queryParams.length > 1) {
      queryString += `, `;
    }
    queryString += `title = $${queryParams.length}`
  }
  if (params[0].description) {
    queryParams.push(params[0].description);
    if (queryParams.length > 1) {
      queryString += `, `;
    }
    queryString += ` description = $${queryParams.length}`
  }
  queryParams.push(id);
  queryString += `
    WHERE id = $${queryParams.length};
  `;
  return db.query(queryString, queryParams)
  .then(res => res.rows)
  .catch(err => err);
}
exports.editPost = editPost;