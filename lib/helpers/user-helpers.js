const getUserWithUsername = function (db, username) {
  const queryString = `
  SELECT * FROM users
  WHERE username = $1;
  `;

  return db.query(queryString, [username])
    .then(res => {
      return res.rows.length === 1 ? res.rows[0] : null;
    });
}
exports.getUserWithUsername = getUserWithUsername;

const getUserWithId = function (db, id) {
  const queryString = `
  SELECT * FROM users
  WHERE id = $1;
  `;

  return db.query(queryString, [id])
    .then(res => {
      return res.rows.length === 1 ? res.rows[0] : null;
    });
}
exports.getUserWithId = getUserWithId;

const addUser = function (db, user) {
  const queryString = `
  INSERT INTO users (name, username, password, email)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;

  return db.query(queryString, [user.name, user.username, user.password, user.email])
    .then(res => res.rows[0])
    .catch(err => err);
}
exports.addUser = addUser;
