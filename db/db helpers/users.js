const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

// /**
//  * Get a single user from the database given their email.
//  * @param {String} email The email of the user.
//  * @return {Promise<{}>} A promise to the user.
//  */
// const getUserWithEmail = function(email) {
//   return pool.query(`
//   SELECT *
//   FROM users
//   WHERE email = $1
//   `, [email])
//   .then(res => res.rows[0])
//   .catch(err => console.error('query error', err.stack));
// }
// exports.getUserWithEmail = getUserWithEmail;

// /**
//  * Get a single user from the database given their id.
//  * @param {string} id The id of the user.
//  * @return {Promise<{}>} A promise to the user.
//  */
// const getUserWithId = function(id) {
//   return pool.query(`
//   SELECT *
//   FROM users
//   WHERE id = $1
//   `, [id])
//   .then(res => res.rows[0])
//   .catch(err => console.error('query error', err.stack));
// }
// exports.getUserWithId = getUserWithId;
