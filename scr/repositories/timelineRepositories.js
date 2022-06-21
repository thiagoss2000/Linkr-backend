import connection from "../data/dbL.js";
import urlMetadata from "url-metadata";
import findHashtags from "find-hashtags";

const limitSearch = 2;

export async function getPosts(req, res) {
    const { page } = req.query;
    const userId = res.locals.rows[0].user_id;   

    try {
        const metadata = await connection.query(`SELECT 
            posts.id, posts.link, posts.title, 
            metadata.subject, metadata.presentation, metadata.image
            FROM followers JOIN posts
            ON followers.followers_id = posts.user_id
            JOIN metadata
            ON posts.id = metadata.id
            WHERE followers.following_id = $1 AND deleted_at IS NULL
            LIMIT ${limitSearch}
            OFFSET ${page * limitSearch}
        `, [userId]);


        res.status(200).send(metadata.rows);
    } catch (e){
        console.log(e)
        res.sendStatus(500);
    }
}

export async function getPostsId(req, res) {
    const id = req.params;
    const { page } = req.query;
    const userId = id.userId;

    try {
        const metadata = await connection.query(`SELECT 
            posts.id, posts.link, posts.title, 
            metadata.subject, metadata.presentation, metadata.image
            FROM posts JOIN metadata
            ON posts.id = metadata.id
            WHERE posts.user_id = $1 AND deleted_at IS NULL
            LIMIT ${limitSearch}
            OFFSET ${page * limitSearch}
        `, [userId]);

        res.status(200).send(metadata.rows);
    } catch (e){
        console.log(e)
        res.sendStatus(500);
    }
}

export async function postTimeline(req, res, next) {
    const { title, link } = req.body;
        const wordKeys = findHashtags(title);
    try {
        const metadata = await urlMetadata(link);
        const id = await connection.query(`INSERT INTO posts (user_id, link, title) 
            VALUES ($1, $2, $3) RETURNING id
        `, [res.locals.rows[0].user_id, link, title);                                  
        
        await connection.query(`INSERT INTO metadata (id, subject, presentation, image) 
            VALUES ($1, $2, $3, $4)
        `, [id.rows[0].id, metadata.name, metadata.description, metadata.image]);
       
        res.local = {
            post_id: id.rows[0].id,
            hashtags: wordKeys.map(e => e.split(' ')[0])
        }
        next();
        res.sendStatus(201);
    } catch (e){
        res.sendStatus(422);
    }
}

export async function putTimeline(req, res) {
    const id = req.params;
    const { title } = req.body;
    try {
        const putId = await connection.query(`UPDATE posts SET title = $1
            WHERE id = $2 AND user_id = $3 RETURNING id
        `, [title, id.postId, res.locals.rows[0].user_id]);

        if(putId.rows.length == 0) return res.sendStatus(404);

        res.sendStatus(200);
    } catch (e){
        console.log(e)
        res.sendStatus(500);
    }
}

export async function deletePost(req, res) {
    const id = req.params;
    try {
        const putId = await connection.query(`UPDATE posts SET deleted_at = '${new Date().toDateString()}'
            WHERE id = $1 AND user_id = $2 RETURNING id
        `, [id.postId, res.locals.rows[0].user_id]);
        
        if(putId.rows.length == 0) return res.sendStatus(404);

        res.sendStatus(200);
    } catch (e){
        console.log(e)
        res.sendStatus(500);
    }
}