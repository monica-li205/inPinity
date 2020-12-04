const getAllPosts = (db, offset) => {
  const queryString = `
    SELECT posts.*,
    users.username,
    round(avg(ratings.rating)) as rating,
    count(likes.post_id) as num_of_likes
    FROM posts
    JOIN users on users.id = posts.user_id
    LEFT JOIN likes on posts.id = likes.post_id
    LEFT JOIN ratings on posts.id = ratings.post_id
    GROUP BY posts.id, users.username, users.id
    ORDER BY posts.id desc
    LIMIT 20 OFFSET $1;
  `;
  return db
    .query(queryString, [offset])
    .then((res) => res.rows)
    .catch((err) => err);
};
exports.getAllPosts = getAllPosts;

const getAllPostsLoggedIn = (db, id, offset) => {
  const queryString = `
    SELECT user_post.id,
    user_post.title,
    user_post.username,
    user_post.description,
    user_post.thumbnail_photo,
    user_post.url,
    user_post.rating,
    user_post.num_of_likes,
    likes.user_id = $1 as is_liked
    FROM
      (SELECT DISTINCT posts.*,
      users.id as currentuser,
      users.username,
      round(avg(ratings.rating)) as rating ,
      count(likes.post_id) as num_of_likes
      FROM posts
      JOIN users on users.id = posts.user_id
      LEFT JOIN likes on posts.id = likes.post_id
      LEFT JOIN ratings on posts.id = ratings.post_id
      GROUP BY posts.id, users.username, users.id
      ORDER BY posts.id desc)
    as user_post
    LEFT JOIN likes on user_post.id = likes.post_id
    LIMIT 20 OFFSET $2;
  `;
  return db
    .query(queryString, [id, offset])
    .then((res) => res.rows)
    .catch((err) => err);
};
exports.getAllPostsLoggedIn = getAllPostsLoggedIn;

const searchPosts = (db, searchQuery, offset) => {
  // console.log(searchQuery.length);
  if (searchQuery.length <= 2) {
    const queryString = `
    SELECT posts.*, users.username, (select round(avg(rating)) from ratings) as rating, (select sum(is_liked::int) as num_of_likes)
    FROM posts
    LEFT JOIN users on users.id = posts.user_id
    LEFT JOIN likes on posts.id = likes.post_id
    GROUP BY posts.id, users.username
    ORDER BY posts.id desc
    LIMIT 20 OFFSET $1;
  `;
    return db
      .query(queryString, [offset])
      .then((res) => res.rows)
      .catch((err) => err);
  } else {
    return db
      .query(
        `
    SELECT * FROM posts
    WHERE title LIKE $1 OR description like $1
    LIMIT 5
  `,
        [searchQuery]
      )
      .then((res) => res.rows)
      .catch((err) => err);
  }
};
exports.searchPosts = searchPosts;

//get all user's post
const getAllUserPosts = (db, userId, userSession, offset) => {
  const queryString = `
  SELECT posts.*,
  users.username,
  (select round(avg(rating)) from ratings) as rating, likes.user_id = $1 as liked_by_user
  FROM posts
  JOIN users on users.id = posts.user_id
  JOIN likes on users.id = likes.user_id
  WHERE users.id = $2
  GROUP BY posts.id, users.username, likes.user_id
  ORDER BY posts.id desc
  LIMIT 20 OFFSET $3
  `;
  return db
    .query(queryString, [userSession, userId, offset])
    .then((res) => res.rows)
    .catch((err) => err);
};
exports.getAllUserPosts = getAllUserPosts;

const getUserPostCategories = (db, userSession) => {
  const queryString = `
    SELECT DISTINCT posts.category
    FROM posts
    JOIN users on users.id = posts.user_id
    WHERE users.id = $1;
  `;
  return db
    .query(queryString, [userSession])
    .then((res) => res.rows)
    .catch((err) => err);
};
exports.getUserPostCategories = getUserPostCategories;

const getPostsByCategory = (db, userSession, category, userId, offset) => {
  const queryString = `
  SELECT posts.*,
  users.username,
  (select round(avg(rating)) from ratings) as rating, likes.user_id = $1 as liked_by_user
  FROM posts
  JOIN users on users.id = posts.user_id
  JOIN likes on users.id = likes.user_id
  WHERE posts.category = $2 AND users.id = $3
  GROUP BY posts.id, users.username, likes.user_id
  ORDER BY posts.id desc
  LIMIT 20 OFFSET $4
  `;
  return db
    .query(queryString, [userSession, category, userId, offset])
    .then((res) => res.rows)
    .catch((err) => err);
};
exports.getPostsByCategory = getPostsByCategory;

const getAllPostsInCategory = (db, userSession, category) => {
  const queryString = `
  SELECT posts.*,
  users.username,
  (select round(avg(rating)) from ratings) as rating, likes.user_id = $1 as liked_by_user
  FROM posts
  JOIN users on users.id = posts.user_id
  JOIN likes on users.id = likes.user_id
  WHERE posts.category = $2
  GROUP BY posts.id, users.username, likes.user_id
  ORDER BY posts.id desc
  LIMIT 20
  `;
  return db
    .query(queryString, [userSession, category])
    .then((res) => res.rows)
    .catch((err) => err);
};
exports.getAllPostsInCategory = getAllPostsInCategory;

const getPostWithId = (db, id) => {
  const queryString = `
  SELECT users.username, posts.*, coalesce(ROUND(AVG(ratings.rating)),0) as rating, comments.comment_text
  FROM posts
  LEFT JOIN comments on comments.post_id = posts.id
  LEFT JOIN users on users.id = comments.user_id
  LEFT JOIN ratings on posts.id = ratings.post_id
  WHERE posts.id = $1
  GROUP BY posts.id, comments.id, users.id;
  `;
  return db
    .query(queryString, [id])
    .then((res) => res.rows)
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
    SELECT users.id as user_id, users.username as username
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

const postsWithTheMostLikes = (db, offset) => {
  const queryString = `
  SELECT posts.*,
  users.username,
  round(avg(ratings.rating)) as rating,
  count(likes.post_id) as num_of_likes
  FROM posts
  JOIN users on users.id = posts.user_id
  LEFT JOIN likes on posts.id = likes.post_id
  LEFT JOIN ratings on posts.id = ratings.post_id
  GROUP BY posts.id, users.username, users.id
  ORDER BY num_of_likes desc
  LIMIT 5 OFFSET $1
  `;
  return db
    .query(queryString, [offset])
    .then((data) => data.rows)
    .catch((err) => err);
};
exports.postsWithTheMostLikes = postsWithTheMostLikes;

const likePost = function (db, user_id, post_id) {
  // const q1 = `
  //   SELECT * FROM likes WHERE post_id = $1;
  // `

  // db.query(q1, [post_id])
  // .then(res => {
  //   if (res.rows.length > 0) {
  //     console.log("exists, removing like");
  //     return db.query(`DELETE FROM likes WHERE post_id = $1 AND user_id = $2 RETURNING *`, [post_id, user_id])
  //     .then(res => res);
  //   } else {
  //     const q2 = `
  //     INSERT INTO likes (user_id, post_id)
  //     VALUES ($1, $2)
  //     RETURNING *
  //     `;
  //     console.log("does not exist, adding");
  //     return db.query(q2, [user_id, post_id])
  //     .then(res => res);
  //   }
  // })

  const queryString = `
  INSERT INTO likes (user_id, post_id)
  VALUES ($1, $2)
  RETURNING *`;

  return db.query(queryString, [user_id, post_id]).then((data) => data.rows);
};
exports.likePost = likePost;

const dislikePost = (db, user_id, post_id) => {
  const queryString = `
  DELETE FROM likes
  WHERE user_id = $1 AND post_id = $2
  AND EXISTS
  (SELECT * FROM likes
  WHERE user_id = $1 AND post_id = $2 LIMIT 1)
  RETURNING *
  `;
  return db.query(queryString, [user_id, post_id]).then((data) => data.rows);
};

exports.dislikePost = dislikePost;

const commentPost = (db, user_id, post_id, comment) => {
  const queryString = `
  INSERT INTO comments (user_id, post_id, comment_text)
  VALUES ($1, $2, $3);
  `;
  return db
    .query(queryString, [user_id, post_id, comment])
    .then((res) => res.rows)
    .catch((err) => err);
};
exports.commentPost = commentPost;
