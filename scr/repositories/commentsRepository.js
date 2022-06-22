import connection from "../data/dbL.js";

const limitSearch = 5;

export async function postComments(req, res) {
    const { post_id, text } = req.body;                
    const user_id = res.locals.rows[0].user_id;
    try {
        await connection.query(`INSERT INTO comments 
            (post_id, user_id, text) VALUES ($1, $2, $3)  
        `, [post_id, user_id, text]);
        res.sendStatus(201)
    } catch (e){
        console.log(e)
        res.sendStatus(500);
    }
}

export async function getComments(req, res) {
    const { post_id, page } = req.query;                 
    const user_id = res.locals.rows[0].user_id;
    try {
        const comment = await connection.query(`SELECT comments.id, comments.user_id, 
            comments.text, users.image, users.user_name, followers.followers_id 
            FROM comments
            JOIN users ON comments.user_id = users.id
            LEFT JOIN followers 
            ON followers.following_id = $2 AND followers.followers_id = comments.user_id
            WHERE comments.post_id = $1
            ORDER BY comments.id DESC
            LIMIT ${limitSearch}
            OFFSET ${page * limitSearch}
        `, [post_id, user_id]);
        res.send(comment.rows)
    } catch (e){
        res.sendStatus(422);
    }
}

export async function deleteComments(req, res) {
    const { comment_id } = req.query;                 
    const user_id = res.locals.rows[0].user_id;
    try {
        const id = await connection.query(`DELETE FROM comments
            WHERE id = $1 AND user_id = $2 RETURNING id
        `, [comment_id, user_id]);
        if (id.rows.length == 0) return res.sendStatus(401);
        res.sendStatus(204)
    } catch (e){
        console.log(e)
        res.sendStatus(500);
    }
}