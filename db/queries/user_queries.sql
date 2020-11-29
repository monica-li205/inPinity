-- retrieve user with email
SELECT id, name, username, password, email
FROM users
WHERE email = 'alice@gmail.com'

-- retrieve user with id
SELECT id, name, username, password, email
FROM users
WHERE id = 1

-- retrieve user with username
SELECT id, name, username, password, email
FROM users
WHERE username = 'Alice123'

-- retrieve all user's posts
SELECT id, user_id, thumbnail_photo, date_created, url, title, description, rating, is_liked
FROM posts
WHERE user_id = 1

-- retrieve all user's posts under a single category
SELECT id, user_id, thumbnail_photo, date_created, url, title, description, rating, is_liked
FROM posts
JOIN categories on posts.id = post_id
WHERE user_id = 1
AND categories.name = 'nature'

-- retrieve user's top 3 posts
SELECT id, user_id, thumbnail_photo, date_created, url, title, description, rating, is_liked
FROM posts
WHERE rating <= 5
AND rating >=3
LIMIT 3

-- retrieve all user's comments
SELECT id, user_id, post_id, date_posted, comment_text
FROM commments
WHERE user_id = 1

