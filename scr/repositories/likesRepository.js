import connection from "../data/dbL.js";

const limitSearch = 3;

export async function getLikes(req, res) {
    const { post_id } = req.query;
    const user_id = res.locals.user.id;
    try {
        const numLikes = await connection.query(`SELECT 
            COUNT(*) FROM likes WHERE post_id = $1
        `, [post_id]);

        const likeUser = await connection.query(`SELECT usr.user_name as user, flr.user_name as "userFollower"
            FROM likes
            LEFT JOIN users usr 
            ON likes.user_id = usr.id AND $2 = usr.id
            LEFT JOIN followers 
            ON followers.following_id = $2 AND followers.followers_id = likes.user_id
            LEFT JOIN users flr 
            ON flr.id = followers.followers_id
            WHERE likes.post_id = $1 AND (likes.user_id = usr.id OR followers.followers_id = likes.user_id)
            ORDER BY CASE WHEN usr.user_name IS NULL THEN 1 ELSE 0 END, usr.user_name
            LIMIT ${limitSearch}
        `, [post_id, user_id]);

        const object = {
            likeUser: likeUser.rows,
            numLikes: numLikes.rows[0].count
        }

        res.send(object);
    } catch (e){
        console.log(e)
        res.sendStatus(500);
    }
}

export async function postLikes(req, res) {
    const { post_id } = req.query;
    const user_id = res.locals.user.id;
    try {
        const likeUser = await connection.query(`SELECT 
            * FROM likes WHERE post_id = $1 AND user_id = $2
        `, [post_id, user_id]);
        console.log(likeUser)

        if (likeUser.rows.length == 0) {
            await connection.query(`INSERT INTO likes (post_id, user_id)
                VALUES ($1, $2)  
            `, [post_id, user_id]);
            res.status(201).send(true)
        }else {
            await connection.query(`DELETE FROM likes 
                WHERE post_id = $1 AND user_id = $2
            `, [post_id, user_id]);
            res.status(200).send(false)
        }
    } catch (e){
        console.log(e)
        res.sendStatus(500);
    }
}