import connection from "../data/dbL.js";

const limitSearch = 10;

export async function postInfos(req, res, next) {
    const { page } = req.query;
    const user_id = res.locals.user.id;
    try {
        const infos = await connection.query(`SELECT posts.created_at, posts.id as "postId", 
            COUNT(likes.*) as "numLikes", COUNT(comments.*) as "numComments", 
            COUNT(re_posts.*) as "numRe_posts" 
            FROM followers
            JOIN posts ON followers.followers_id = posts.user_id
            LEFT JOIN likes ON posts.id = likes.post_id
            LEFT JOIN comments ON posts.id = comments.post_id
            LEFT JOIN re_posts ON posts.id = re_posts.posts_id
            WHERE followers.following_id = $1 AND posts.deleted_at IS NULL
            GROUP BY "postId"

            UNION SELECT repost.created_at, repost.posts_id as "postIds", 
            COUNT(likes.*) as "numLikes", COUNT(comments.*) as "numComments", 
            COUNT(re_posts.*) as "numRe_posts" 
            FROM followers 
            JOIN re_posts repost ON followers.followers_id = repost.user_id
            LEFT JOIN posts ON repost.posts_id = posts.id
            LEFT JOIN likes ON repost.posts_id = likes.post_id
            LEFT JOIN comments ON repost.posts_id = comments.post_id
            LEFT JOIN re_posts ON repost.posts_id = re_posts.posts_id
            WHERE followers.following_id = $1 AND posts.deleted_at IS NULL AND re_posts.deleted_at IS NULL
            GROUP BY repost.id

            ORDER BY created_at DESC
            LIMIT ${limitSearch}
            OFFSET ${page * limitSearch}
        `, [user_id]);

        res.locals = {
            user: res.locals.user,
            infos: infos.rows
        };
        next();
    } catch (e){
        console.log(e)
        res.sendStatus(500);
    }
}

export async function postInfosId(req, res, next) {
    const { page } = req.query;
    const { userId } = req.params;
    try {
        const infos = await connection.query(`SELECT posts.created_at, posts.id as "postId", 
            COUNT(likes.*) as "numLikes", COUNT(comments.*) as "numComments", 
            COUNT(re_posts.*) as "numRe_posts" 
            FROM posts
            LEFT JOIN likes ON posts.id = likes.post_id
            LEFT JOIN comments ON posts.id = comments.post_id
            LEFT JOIN re_posts ON posts.id = re_posts.posts_id
            WHERE posts.user_id = $1 AND posts.deleted_at IS NULL
            GROUP BY "postId"

            UNION SELECT repost.created_at, repost.posts_id as "postIds", 
            COUNT(likes.*) as "numLikes", COUNT(comments.*) as "numComments", 
            COUNT(re_posts.*) as "numRe_posts" 
            FROM re_posts repost
            JOIN posts ON repost.posts_id = posts.id
            LEFT JOIN likes ON repost.posts_id = likes.post_id
            LEFT JOIN comments ON repost.posts_id = comments.post_id
            LEFT JOIN re_posts ON repost.posts_id = re_posts.posts_id
            WHERE repost.user_id = $1 AND posts.deleted_at IS NULL AND re_posts.deleted_at IS NULL
            GROUP BY repost.id

            ORDER BY created_at DESC
            LIMIT ${limitSearch}
            OFFSET ${page * limitSearch}
        `, [userId]);

        res.locals = {
            infos: infos.rows
        };
        next();
    } catch (e){
        console.log(e)
        res.sendStatus(500);
    }
}