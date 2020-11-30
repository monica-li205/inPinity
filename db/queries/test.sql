SELECT posts.*, ROUND(AVG(ratings.rating)) as rating,
FROM ratings
JOIN posts on post_id = posts.id
JOIN users on user_id = posts.user_id
GROUP BY posts.id;