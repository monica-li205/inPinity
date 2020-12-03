--  if the user is logged in--> the heart icon is coloured in
-- > the user_id and post_id appears in the likes table

-- get all the posts that the user has fave'd
-- SELECT user_post.id,
--     user_post.title,
--     user_post.username,
--     user_post.description,
--     user_post.thumbnail_photo,
--     user_post.rating,
--     user_post.num_of_likes,
--     likes.user_id as liked_by_user
--   FROM
--     (SELECT posts.*,
--     users.id as currentuser,
--     users.username,
--     round(avg(ratings.rating)) as rating ,
--     count(likes.post_id) as num_of_likes
--     FROM posts
--     JOIN users on users.id = posts.user_id
--     LEFT JOIN likes on posts.id = likes.post_id
--     LEFT JOIN ratings on posts.id = ratings.post_id
--     GROUP BY posts.id, users.username, users.id
--     ORDER BY posts.id desc)
--   as user_post

--  LEFT JOIN likes on user_post.id = likes.post_id


-- SELECT posts.* as post
-- FROM posts
-- WHERE  post.liked_user_id = user.id
