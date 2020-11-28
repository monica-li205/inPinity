const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

// -- retrieve all user's posts
// SELECT id, user_id, thumbnail_photo, date_created, url, title, description, rating, is_liked
// FROM posts
// WHERE user_id = 1

// -- retrieve all user's posts under a single category
// SELECT id, user_id, thumbnail_photo, date_created, url, title, description, rating, is_liked
// FROM posts
// JOIN categories on posts.id = post_id
// WHERE user_id = 1
// AND categories.name = 'nature'

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
