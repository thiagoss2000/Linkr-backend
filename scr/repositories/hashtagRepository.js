import connection from "../data/db.js";

export async function createHashtag(name){
    return await connection.query(`
        WITH hashtag AS (
            INSERT INTO hashtags (name) 
            VALUES ($1)
            ON CONFLICT (name) DO NOTHING
            RETURNING hashtags.id
        )

        SELECT * FROM hashtag
        UNION
        SELECT id FROM hashtags WHERE name = $1
        `, [name])
    
}

export async function insertPostHashtag(postId,hashtagId){
    return await connection.query(
        `INSERT INTO "posts_hashtags" (post_id, hashtag_id) 
        VALUES ($1, $2)`, [postId, hashtagId]);
}

