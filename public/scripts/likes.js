// const { Pool } = require("pg");

$(document).ready(function () {
//   /**
//  * Add a property to the database
//  * @param {{}} post An object containing all of the property details.
//  * @return {Promise<{}>} A promise to the property.
//  */
//   const likePost = function(post) {
//     return Pool.query(`
//     INSERT INTO likes (user_id, post_id)
//     VALUES ($1, $2)
//     RETURNING *
//     `, [post.user_id, post.post_id])
//     .then(res => res.rows[0])
//     .catch(err => console.error('query error', err.stack));
//   }
  $('.fa fa-heart mr-2 liked').click(function() {
    const currentPost = $(this)
    alert('hello');
    console.log('isclicked');
    // likePost(currentPost);
  })
});
