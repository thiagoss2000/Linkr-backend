import connection from "../data/db.js";

export function searchUser(username) {
    return connection.query(`
      SELECT users.id, users.username, users."pictureUrl" FROM users WHERE username ~ $1
    `, [`^${username}.*`]);
}