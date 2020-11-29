-- retrieve all posts for homepage
SELECT id, user_id, thumbnail_photo, date_created, url, title, description, is_liked
FROM posts

-- retrieve all posts for a category
SELECT id, user_id, thumbnail_photo, date_created, url, title, description, is_liked
FROM posts
JOIN categories on category_id = categories.id
WHERE categories.name = 'nature'

-- retreive tags for a post
SELECT id, category_id, post_id, name
FROM tags
JOIN posts on post_id = posts.id
WHERE posts.id = 1

-- retrieve all comments for a post
SELECT id, user_id, post_id, date_posted, comment_text
FROM comments
WHERE post_id = '1'
