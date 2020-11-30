SELECT posts.*, ROUND(AVG(ratings.rating)) as rating
FROM ratings
JOIN posts on post_id = posts.id
WHERE post_id = 1
GROUP BY posts.id;