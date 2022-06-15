import  connection  from "../data/db.js";

export function newUser(username, email, password, urlpicture) {
    return connection.query(`
  INSERT INTO 
    users (username, email, password, "pictureUrl" )
  VALUES ($1, $2, $3, $4)
  RETURNING *
  `, [username, email, password, urlpicture]
  );

}

export function searchUser(email) {
  return connection.query(`
    SELECT * FROM users WHERE email=$1
    `, [email]);
}

export function insertToken(userId, token) {
  return connection.query(`
    INSERT INTO sessions ("userId", token) VALUES ($1, $2)
    `, [userId, token]);
}
