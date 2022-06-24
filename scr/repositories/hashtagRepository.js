import connection from "../data/db.js";

export async function createHashtag(text){
    return await connection.query(`
        WITH hashtag AS (
            INSERT INTO hashtags (text) 
            VALUES ($1)
            ON CONFLICT (name) DO NOTHING
            RETURNING hashtags.id
        )

        SELECT * FROM hashtag
        UNION
        SELECT id FROM hashtags WHERE text = $1
        `, [text])
    
}

export async function insertPostHashtag(postId,hashtagId){
    return await connection.query(`
        INSERT INTO "posts_hashtags" (post_id, hashtag_id) 
        VALUES ($1, $2)`, [postId, hashtagId]);
}

export async function deletePostHastag(postId){
    return await connection.query(`
        DELETE FROM "posts_hashtags"
        WHERE post_id = $1
        RETURNING post_id`, [postId])
}

export async function getHastagsTrendings(){
    return await connection.query(`
        SELECT hashtag.text as text, COUNT("posts_hashtags".id) as trend
        FROM hashtags
        JOIN "posts_hashtags" ON "posts_hashtags"."hashtag_id" = hashtags.id
        GROUP BY hashtag.text
        ORDER BY trend DESC
        LIMIT 10`)
}

