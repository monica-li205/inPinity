const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
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
