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
