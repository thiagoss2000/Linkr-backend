import connection from "../data/dbL.js";
import urlMetadata from "url-metadata";
import findHashtags from "find-hashtags";

const limitSearch = 10;

export async function getPosts(req, res) {
    const { page } = req.query;
    const userId = res.locals.user.id;   
    
    try {
        const metadata = await connection.query(`SELECT posts.created_at, posts.id, 
            posts.user_id as creat_user, users.user_name as "creat_userName", users.id as post_user, users.user_name as "post_userName", 
            users.image as user_image, posts.link, posts.title, metadata.subject, metadata.presentation, metadata.image, likes.id as like
            FROM followers 
            JOIN posts ON followers.followers_id = posts.user_id
            JOIN metadata ON posts.id = metadata.id
            JOIN users ON posts.user_id = users.id
            LEFT JOIN likes ON likes.user_id = $1 AND likes.post_id = posts.id
            WHERE followers.following_id = $1 AND posts.deleted_at IS NULL

            UNION SELECT re_posts.created_at, posts.id, 
            posts.user_id as creat_user, creat_user.user_name as "creat_userName", post_user.id as post_user, post_user.user_name as "post_userName",
            post_user.image as user_image, posts.link, posts.title, metadata.subject, metadata.presentation, metadata.image, likes.id as like
            FROM followers 
            JOIN re_posts ON followers.followers_id = re_posts.user_id
            LEFT JOIN users post_user ON re_posts.user_id = post_user.id
            LEFT JOIN posts ON re_posts.posts_id = posts.id
            LEFT JOIN metadata ON re_posts.posts_id = metadata.id
            LEFT JOIN users creat_user ON posts.user_id = creat_user.id
            LEFT JOIN likes ON likes.user_id = $1 AND likes.post_id = posts.id
            WHERE followers.following_id = $1 AND posts.deleted_at IS NULL AND re_posts.deleted_at IS NULL

            ORDER BY created_at DESC
            LIMIT ${limitSearch}
            OFFSET ${page * limitSearch}
        `, [userId]);

        const object = {
            posts: metadata.rows,
            infos: res.locals.infos
        }
        res.status(200).send(object);
    } catch (e){
        res.sendStatus(500);
    }
}

export async function getPostsId(req, res) {
    const { userId: author_id } = req.params;
    const { page } = req.query;
    const userId = res.locals.user.id; 

    try {
        const metadata = await connection.query(`SELECT posts.created_at, posts.id, 
            posts.user_id as creat_user, users.user_name as "creat_userName", users.id as post_user, users.user_name as "post_userName", 
            users.image as user_image, posts.link, posts.title, metadata.subject, metadata.presentation, metadata.image, likes.id as like
            FROM posts 
            JOIN metadata ON posts.id = metadata.id
            JOIN users ON posts.user_id = users.id
            LEFT JOIN likes ON likes.user_id = $2 AND likes.post_id = posts.id
            WHERE posts.user_id = $1 AND posts.deleted_at IS NULL

            UNION SELECT re_posts.created_at, posts.id, 
            posts.user_id as creat_user, creat_user.user_name as "creat_userName", post_user.id as post_user, post_user.user_name as "post_userName",
            post_user.image as user_image, posts.link, posts.title, metadata.subject, metadata.presentation, metadata.image, likes.id as like
            FROM re_posts 
            JOIN posts ON re_posts.posts_id = posts.id
            LEFT JOIN users post_user ON re_posts.user_id = post_user.id
            LEFT JOIN metadata ON re_posts.posts_id = metadata.id
            LEFT JOIN users creat_user ON posts.user_id = creat_user.id
            LEFT JOIN likes ON likes.user_id = $2 AND likes.post_id = posts.id
            WHERE re_posts.user_id = $1 AND posts.deleted_at IS NULL AND re_posts.deleted_at IS NULL

            ORDER BY created_at DESC
            LIMIT ${limitSearch}
            OFFSET ${page * limitSearch}
        `, [author_id, userId]);

        const object = {
            posts: metadata.rows,
            infos: res.locals.infos
        }

        res.status(200).send(object);
    } catch (e){
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
        `, [res.locals.user.id, link, title]);                                  
        
        await connection.query(`INSERT INTO metadata (id, subject, presentation, image) 
            VALUES ($1, $2, $3, $4)
        `, [id.rows[0].id, metadata.name, metadata.description, metadata.image]);
       
        res.local = {
            post_id: id.rows[0].id,
            hashtags: wordKeys
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
    const wordKeys = findHashtags(title);
    try {
        const putId = await connection.query(`UPDATE posts SET title = $1
            WHERE id = $2 AND user_id = $3 RETURNING id
        `, [title, id.postId, res.locals.user.id]);

        if(putId.rows.length == 0) return res.sendStatus(404);
        res.local = {
            post_id: putId.rows[0].id,
            hashtags: wordKeys
        }
        next();
        res.sendStatus(200);
    } catch (e){
        res.sendStatus(500);
    }
}

export async function deletePost(req, res) {
    const id = req.params;
    try {
        const putId = await connection.query(`UPDATE posts SET deleted_at = '${new Date().toDateString()}'
            WHERE id = $1 AND user_id = $2 RETURNING id
        `, [id.postId, res.locals.user.id]);

        if(putId.rows.length == 0) return res.sendStatus(404);

        res.sendStatus(200);
    } catch (e){
        res.sendStatus(500);
    }
}

export async function rePostTimeline(req, res) {
    const { post_id } = req.query;
    try {
        const validId = await connection.query(`SELECT id FROM posts WHERE id = $1 AND posts.deleted_at IS NULL
        `, [post_id])
        console.log(validId)
        if(validId.rows.length == 0) return res.sendStatus(404);

        const inserId = await connection.query(`INSERT INTO re_posts (posts_id, user_id)
            VALUES ($1, $2) RETURNING id
        `, [post_id, res.locals.user.id]);
        if(inserId.rows.length == 0) return res.sendStatus(404);

        res.sendStatus(201);
    } catch (e){
        res.sendStatus(500);
    }
}

export async function deleteRePost(req, res) {
    const { repost_id } = req.query;
    try {
        const putId = await connection.query(`UPDATE re_posts SET deleted_at = '${new Date().toDateString()}'
            WHERE posts_id = $1 AND user_id = $2 AND re_posts.deleted_at IS NULL RETURNING id
        `, [repost_id, res.locals.user.id]);
        if(putId.rows.length == 0) return res.sendStatus(404);

        res.sendStatus(200);
    } catch (e){
        res.sendStatus(500);
    }
}

export async function getNewPostsId(req, res) {
    const user_id = req.params.userId
    const { date } = req.query;
    try {
        const numPosts = await connection.query(`
            SELECT COUNT(*) FROM posts
            WHERE deleted_at IS NULL AND created_at > $1 AND user_id = $2

            UNION SELECT COUNT(*) FROM re_posts
            WHERE deleted_at IS NULL AND created_at > $1 AND user_id = $2
        `, [date, user_id]);

        res.send(numPosts.rows);
    } catch (e){
        res.sendStatus(500);
    }
}

export async function getNewPosts(req, res) {
    const user_id = res.locals.user.id
    const { date } = req.query;
    console.log(new Date(date).getUTCDate())
    try {
        const numPosts = await connection.query(`
            SELECT COUNT(posts.*) 
            FROM followers
            JOIN posts ON posts.user_id = followers.followers_id
            WHERE posts.deleted_at IS NULL AND posts.created_at > $1 AND followers.following_id = $2

            UNION SELECT COUNT(re_posts.*) 
            FROM followers
            JOIN re_posts ON re_posts.user_id = followers.followers_id
            WHERE re_posts.deleted_at IS NULL AND re_posts.created_at > $1 AND followers.following_id = $2
        `, [date, user_id]);
        console.log(numPosts.rows)
        res.send(numPosts.rows);
    } catch (e){
        res.sendStatus(500);
    }
}