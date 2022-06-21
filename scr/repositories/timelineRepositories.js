import connection from "../data/dbL.js";
import urlMetadata from "url-metadata";

export async function getPosts(req, res) {
    const id = req.params;
    let userId = res.locals.rows[0].user_id;
    if(id.userId) userId = id.userId;
    try {
        const metadata = await connection.query(`SELECT 
            posts.id, posts.link, posts.title, 
            metadata.subject, metadata.presentation, metadata.image
            FROM posts JOIN metadata
            ON posts.id = metadata.id
            WHERE posts.user_id = $1 AND deleted_at IS NULL
        `, [userId]);

        res.status(200).send(metadata.rows);
    } catch (e){
        console.log(e)
        res.sendStatus(500);
    }
}

export async function postTimeline(req, res) {
    const { title, link } = req.body;
    try {
        const metadata = await urlMetadata(link);

        const id = await connection.query(`INSERT INTO posts (user_id, link, title) 
            VALUES ($1, $2, $3) RETURNING id
        `, [res.locals.rows[0].user_id, link, title]);                                  // validar link!!!!!!!!!!!!!!

        await connection.query(`INSERT INTO metadata (id, subject, presentation, image) 
            VALUES ($1, $2, $3, $4)
        `, [id.rows[0].id, metadata.name, metadata.description, metadata.image]);

        res.sendStatus(201);
    } catch (e){
        console.log(e)
        res.sendStatus(500);
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