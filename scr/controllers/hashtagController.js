import chalk from "chalk";
import { createHashtag, insertPostHashtag } from "../repositories/hashtagRepository.js";

export async function insertHashtags(req, res) {
    try {
        const hashtags = res.locals.hashtags
        const hashtagIdArray = [];
        for (let hashtag of hashtags){

            const result = await createHashtag(hashtag);

            if (result.rows.length > 0){
                const hashtagId = result.rows[0].id;
                hashtagIdArray.push(parseInt(hashtagId));
            }
        }
        
        res.locals.hashtagsIds = hashtagIdArray;

        next();
    }
    catch (err) {
        console.log(chalk.red(`${err}`));
        res.status(500).send(err.message);
    }
}

export async function insertRelation(req, res){
    try {
        const postId = parseInt(res.locals.post_id);
        const hashtagsIds = res.locals.hashtagsIds;

        for(let hashtagId of hashtagsIds){
            await insertPostHashtag(postId, hashtagId);
        }

        res.sendStatus(201);

    } catch(err) {
        console.log(chalk.red(`${err}`));
        res.status(500).send(err.message);
    }
}
