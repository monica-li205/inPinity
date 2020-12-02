const getAllPosts = (db, offset) => {
  const queryString = `
    SELECT posts.*, coalesce(ROUND(AVG(ratings.rating)), 0) as rating
    FROM ratings
    RIGHT JOIN posts on post_id = posts.id
    GROUP BY posts.id
    ORDER BY id DESC
    LIMIT 20 OFFSET $1;
  `;
  return db
    .query(queryString, [offset])
    .then((res) => res.rows)
    .catch((err) => err);
};
exports.getAllPosts = getAllPosts;

//get all user's post
const getAllUserPosts = (db, offset) => {
  const queryString = `
  SELECT posts.*, rating
  FROM posts
  JOIN ratings ON posts.id = post_id
  WHERE posts.user_id = $1
  `;
  return db
    .query(queryString, [offset])
    .then((res) => res.rows)
    .catch((err) => err);
};
exports.getAllUserPosts = getAllUserPosts;

const getPostWithId = (db, id) => {
  const queryString = `
    SELECT posts.*, ROUND(AVG(ratings.rating)) as rating
    FROM ratings
    JOIN posts on post_id = posts.id
    WHERE posts.id = $1
    GROUP BY posts.id;
  `;
  return db
    .query(queryString, [id])
    .then((res) => res.rows[0])
    .catch((err) => err);
};
exports.getPostWithId = getPostWithId;

const addPost = (db, user, params) => {
  const queryParams = [
    user,
    params.thumbnail_photo,
    params.url,
    params.title,
    params.description,
    params.category,
  ];
  const queryString = `
  INSERT INTO posts (user_id, thumbnail_photo, url, title, description, category)
  VALUES ($1, $2, $3, $4, $5, $6);
  `;
  // if (params.thumbnail_photo.length > 0 &params.url.length > 0 && params.title.length > 0 && params.description.length > 0 && params.category.length > 0) {

  // }
  return db
    .query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((err) => err);
};
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
    queryString += `title = $${queryParams.length}`;
  }
  if (params[0].description) {
    queryParams.push(params[0].description);
    if (queryParams.length > 1) {
      queryString += `, `;
    }
    queryString += ` description = $${queryParams.length}`;
  }
  queryParams.push(id);
  queryString += `
    WHERE id = $${queryParams.length};
  `;
  return db
    .query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((err) => err);
};
exports.editPost = editPost;

const getPostOwner = (db, id) => {
  const queryString = `
    SELECT users.id as post_owner
    FROM posts
    JOIN users ON users.id = user_id
    WHERE posts.id = $1;
  `;

  return db
    .query(queryString, [id])
    .then((data) => data.rows[0])
    .catch((err) => err);
};
exports.getPostOwner = getPostOwner;

const postsWithTheMostLikes = (db, limit = 10) => {
  const queryString = `
  SELECT post_id, count(is_liked) as likes
  FROM likes
  GROUP BY post_id
  ORDER BY count(is_liked) DESC
  LIMIT $1
  `;
  return db
    .query(queryString, [limit])
    .then((data) => data.rows[0])
    .catch((err) => err);
};
exports.postsWithTheMostLikes = postsWithTheMostLikes;
