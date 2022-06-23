import chalk from "chalk";
import { createHashtag } from "../repositories/hashtagController.js";

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

        res.status(200).send(hashtagsIds);

        next();
    }
    catch (err) {
        console.log(chalk.red(`${err}`));
        res.status(500).send(err.message);
    }
}