-- retrieve user with email
SELECT name, username, password, email
FROM users
WHERE email = 'alice@gmail.com'

-- retrieve user with username
SELECT name, username, password, email
FROM users
WHERE username = 'Alice123'

-- retrieve all user's posts
SELECT id, user_id, thumbnail_photo, date_created, url, title, description, rating, is_liked
FROM posts
WHERE user_id = 1

-- retrieve all user's collections

-- retrieve all the posts for a user's collection

-- retrieve user's top 3 posts
SELECT id, user_id, thumbnail_photo, date_created, url, title, description, rating, is_liked
FROM posts
WHERE rating <= 5
LIMIT 3

-- retrieve all user's comments
SELECT

