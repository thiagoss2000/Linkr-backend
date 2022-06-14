import  connection  from "../data/db.js";

export function newUser(name, email, password) {
    return connection.query(`
  INSERT INTO 
    users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `, [name, email, password]
  );

}
