import connection from "../data/dbL.js";

export async function getUsers(req, res) {
    const { search_user } = req.query
    const user_id = res.locals.rows[0].user_id;

    try {
        if(search_user == '') return res.send([]);
        const idUser = await connection.query(`SELECT 
            users.id, users.user_name, users.image, followers.followers_id
            FROM users
            LEFT JOIN followers 
            ON followers.following_id = $2 AND followers.followers_id = users.id
            WHERE user_name ~ $1
        `, [`${search_user}`, user_id]);
        
        res.send(idUser.rows);
    } catch (e){
        console.log(e)
        res.sendStatus(500);
    }
}