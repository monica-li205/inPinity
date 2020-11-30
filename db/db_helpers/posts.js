const getAllPosts = (db, offset) => {
  const queryString = `
    SELECT posts.*, ROUND(AVG(ratings.rating)) as rating
    FROM ratings
    JOIN posts on post_id = posts.id
    GROUP BY posts.id
    LIMIT 10 OFFSET $1;
  `
  return db.query(queryString, [offset])
  .then(res => res.rows)
  .catch(err => err);
}
exports.getAllPosts = getAllPosts;

const getPostWithId = (db, id) => {
  const queryString = `
    SELECT posts.*, ROUND(AVG(ratings.rating)) as rating
    FROM ratings
    JOIN posts on post_id = posts.id
    WHERE posts.id = $1
    GROUP BY posts.id;
  `;
  return db.query(queryString, [id])
  .then(res => res.rows[0])
  .catch(err => err);
}
exports.getPostWithId = getPostWithId;

const addPost = (db, user, params) => {
  const queryParams = [
    user,
    params.thumbnail_photo,
    params.url,
    params.title,
    params.description
  ];
  const queryString = `
  INSERT INTO posts (user_id, thumbnail_photo, url, title, description)
  VALUES ($1, $2, $3, $4, $5);
  `
  return db.query(queryString, queryParams)
  .then(res => res.rows)
  .catch(err => err);
}
exports.addPost = addPost;

const editPost = (db, id, params) => {
  const queryParams = [];

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

const getPostOwner = (db, id) => {
  const queryString = `
    SELECT users.id as post_owner
    FROM posts
    JOIN users ON users.id = user_id
    WHERE posts.id = $1;
  `;

  return db.query(queryString, [id])
  .then(data => data.rows[0])
  .catch(err => err);
}
exports.getPostOwner = getPostOwner;