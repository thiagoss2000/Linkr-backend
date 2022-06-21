import connection from "../data/dbL.js";

export async function getLikes(req, res) {
    const { post_id } = req.query;
    const user_id = 1
    try {
        const likes = await connection.query(`SELECT 
            COUNT(*) FROM likes WHERE post_id = $1
        `, [post_id]);

        const users = await connection.query(`SELECT 
            followers.followers_id
            FROM followers 
            JOIN likes ON followers.followers_id = likes.user_id
            WHERE followers.following_id = $2 AND likes.post_id = $1
        `, [post_id, user_id]);

        const likeUser = await connection.query(`SELECT 
            * FROM likes WHERE post_id = $1 AND user_id = $2
        `, [post_id, user_id]);

        res.status(200).send(likeUser.rows);
    } catch (e){
        console.log(e)
        res.sendStatus(500);
    }
}
