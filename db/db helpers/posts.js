const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

// /**
//  * Get all posts for tag
//  * @param {{}} options An object containing query options.
//  * @param {*} limit The number of results to return.
//  * @return {Promise<[{}]>}  A promise to the properties.
//  */
// const getAllPostsForTag = function(options, limit = 100) {
//   const queryParams = [];
//   let queryString = `
//   // SELECT id, user_id, thumbnail_photo, date_created, url, title, description, rating, is_liked
//   FROM properties
//   LEFT JOIN property_reviews ON properties.id = property_id
//   `;

//   if (options.city) {
//     queryParams.push(`%${options.city}%`);
//     queryString += `WHERE city LIKE $${queryParams.length} `;
//   }

//   queryParams.push(limit);
//   queryString += `
//   GROUP BY properties.id
//   ORDER BY cost_per_night
//   LIMIT $${queryParams.length};
//   `;

//   console.log(queryString, queryParams);

//   return pool.query(queryString, queryParams)
//   .then(res => res.rows);

// }
// exports.getAllProperties = getAllProperties;


// SELECT id, user_id, thumbnail_photo, date_created, url, title, description, rating, is_liked
// FROM posts

// -- retrieve all posts for a category
// SELECT id, user_id, thumbnail_photo, date_created, url, title, description, rating, is_liked
// FROM posts
// JOIN categories on category_id = categories.id
// WHERE categories.name = 'nature'

// -- retrive tags for a post
// SELECT id, category_id, post_id, name
// FROM tags
// JOIN posts on post_id = posts.id
// WHERE posts.id = 1

// -- retrieve all comments for a post
// SELECT id, user_id, post_id, date_posted, comment_text
// FROM comments
// WHERE post_id = '1'

// create a new post
