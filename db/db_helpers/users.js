/**
 * Get a single user from the database given their email.
 * @param {String} email
 * @return {Promise<{}>}
 */
const getUserWithEmail = function (db, email) {
  return db
    .query(
      `
  SELECT id, name, username, password, email
  FROM users
  WHERE email = $1
  `,
      [email]
    )
    .then((res) => res.rows[0])
    .catch((err) => console.error("query error", err.stack));
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id
 * @return {Promise<{}>}
 */
const getUserWithId = function (db, id) {
  return db
    .query(
      `
  SELECT *
  FROM users
  WHERE id = $1
  `,
      [id]
    )
    .then((res) => res.rows[0])
    .catch((err) => console.error("query error", err.stack));
};
exports.getUserWithId = getUserWithId;

/**
 * Get a single user from the database given their id.
 * @param {string} username
 * @return {Promise<{}>}
 */
const getUserWithUsername = function (db, username) {
  return db
    .query(
      `
  SELECT *
  FROM users
  WHERE username = $1
  `,
      [username]
    )
    .then((res) => res.rows[0])
    .catch((err) => console.error("query error", err.stack));
};
exports.getUserWithUsername = getUserWithUsername;

/**
 * Add a new user to the database.
 * @param {{name: string, user.username, password: string, email: string}} user
 * @return {Promise<{}>}
 */
const addUser = function (db, user) {
  return db
    .query(
      `
  INSERT INTO users (name, username, password, email)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `,
      [user.name, user.username, user.password, user.email]
    )
    .then((res) => res.rows)
    .catch((err) => err);
};
exports.addUser = addUser;

const editUser = function (db, user, params) {
  const queryParams = [];

  let queryString = `UPDATE users SET`;

  if (params.email) {
    queryParams.push(params.email);
    if (queryParams.length > 1) {
      queryString += `, `;
    }
    queryString += ` email = $${queryParams.length}`;
  }
  if (params.password) {
    queryParams.push(params.password);
    if (queryParams.length > 1) {
      queryString += `, `;
    }
    queryString += ` password = $${queryParams.length}`;
  }
  queryParams.push(user);
  queryString += ` WHERE id = $${queryParams.length}`;

  return db
    .query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((err) => err);
};
exports.editUser = editUser;

const totalPostsByUser = (db, id) => {
  const queryString = `
  SELECT count(posts.id)
  FROM posts
  WHERE user_id = $1;
  `;
  return db
    .query(queryString, [id])
    .then((data) => data.rows[0])
    .catch((err) => err);
};
exports.totalPostsByUser = totalPostsByUser;

const likedPostsByUser = (db, id) => {
  const queryString = `
  SELECT post_id, is_liked
  FROM likes
  WHERE user_id = $1
  AND is_liked = true;
  `;
  return db
    .query(queryString, [id])
    .then((data) => data.rows[0])
    .catch((err) => err);
};
exports.likedPostsByUser = likedPostsByUser;
