const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

/**
 * Get all user's posts
 * @param {string} user_id
 * @return {Promise<[{}]>}
 */
const getAllUsersPosts = function(user_id) {
  return pool.query(`
  SELECT id, user_id, thumbnail_photo, date_created, url, title, description, rating, is_liked
  FROM posts
  WHERE user_id = $1
  `, [user_id])
  .then(res => res.rows);
}
exports.getAllUsersPosts = getAllUsersPosts;

/**
 * Get all user's posts under a single category
 * @param {string} user_id
 * @return {Promise<[{}]>}
 */
const getAllUsersPostsForACategory = function(user_id, category) {
  return pool.query(`
  SELECT id, user_id, thumbnail_photo, date_created, url, title, description, rating, is_liked
  FROM posts
  JOIN categories on posts.id = post_id
  WHERE user_id = $1
  AND categories.name = $2
  `, [user_id, category])
  .then(res => res.rows);
}
exports.getAllUsersPostsForACategory = getAllUsersPostsForACategory;

/**
 * Get user's top 3 posts
 * @param {string} user_id
 * @param {string} category
 * @return {Promise<[{}]>}
 */
const getAllUsersPostsForACategory = function(user_id, category) {
  return pool.query(`
  SELECT id, user_id, thumbnail_photo, date_created, url, title, description, rating, is_liked
  FROM posts
  JOIN categories on posts.id = post_id
  WHERE user_id = $1
  AND categories.name = $2
  `, [user_id, category])
  .then(res => res.rows);
}
exports.getAllUsersPostsForACategory = getAllUsersPostsForACategory;

// -- retrieve user's top 3 posts
// SELECT id, user_id, thumbnail_photo, date_created, url, title, description, rating, is_liked
// FROM posts
// WHERE rating <= 5
// AND rating >=3
// LIMIT 3

// -- retrieve all user's comments
// SELECT id, user_id, post_id, date_posted, comment_text
// FROM commments
// WHERE user_id = 1
