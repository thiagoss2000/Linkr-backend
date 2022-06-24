import chalk from "chalk";
import { createHashtag, 
        insertPostHashtag, 
        getHastagsTrendings,
        deletePostHastag
        } from "../repositories/hashtagRepository.js";

export async function insertHashtags(req, res, next) {
    try {
        const hashtags = res.locals.hashtags

        if(hashtags.length === 0)  return res.status(200).send('not exits hashtags')
        const hashtagIdArray = [];
        for (let hashtag of hashtags){

            const response = await createHashtag(hashtag);

            if (response.rows.length > 0){
                const hashtagId = response.rows[0].id;
                hashtagIdArray.push(parseInt(hashtagId));
            }
        }
        
        res.locals.hashtagsIds = hashtagIdArray;
        console.log(hashtagIdArray)
        next();
    }
    catch (err) {
        console.log(chalk.red(`${err}`));
        res.status(500).send(err.message);
    }
}

export async function deleteRelation(req,res,next){
    try{
        
        const postId = res.locals.post_id
        const hashtagIdArray = res.locals.hashtagsIds
        const result = await deletePostHastag(postId)
    
        res.locals = {
            post_id: result.rows[0].post_id,
            hashtagsIds : hashtagIdArray
        }
        console.log(res.locals)
        next();

    } catch(err) {
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

export async function getHashtags(req,res){
    try{
        const response = await getHastagsTrendings();

        if(response.rows.length === 0) return res.status(404).send("Hashtags not found");

        res.status(200).send(response.rows);

    } catch (err) {
        console.log(chalk.red(`${err}`));
        res.status(500).send(err.message);
    }
}