const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

/**
 * Get a single user from the database given their email.
 * @param {String} email
 * @return {Promise<{}>}
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT id, name, username, password, email
  FROM users
  WHERE email = $1
  `, [email])
  .then(res => res.rows[0])
  .catch(err => console.error('query error', err.stack));
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id
 * @return {Promise<{}>}
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT id, name, username, password, email
  FROM users
  WHERE id = $1
  `, [id])
  .then(res => res.rows[0])
  .catch(err => console.error('query error', err.stack));
}
exports.getUserWithId = getUserWithId;

/**
 * Get a single user from the database given their id.
 * @param {string} username
 * @return {Promise<{}>}
 */
const getUserWithUsername = function(username) {
  return pool.query(`
  SELECT id, name, username, password, email
  FROM users
  WHERE username = $1
  `, [username])
  .then(res => res.rows[0])
  .catch(err => console.error('query error', err.stack));
}
exports.getUserWithUsername = getUserWithUsername;

/**
 * Add a new user to the database.
 * @param {{name: string, user.username, password: string, email: string}} user
 * @return {Promise<{}>}
 */
const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users (name, username, password, email)
  VALUES ($1, $2, $3, $4);
  `, [user.name, user.username, user.password, user.email])
  .then(user)
  .catch(err => console.error('query error', err.stack));
}
exports.addUser = addUser;