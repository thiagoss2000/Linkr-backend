import chalk from "chalk";

export async function getHashtagPosts(req, res) {
    const { hashtag } = req.params;
    try {
        const hashtagPosts = await getHashtagPosts(hashtag);

        if(hashtagPosts.rows.length === 0) return res.status(404).send({message: "Hashtag not found"});

        res.status(200).send(hashtagPosts);
    }
    catch (err) {
        console.log(chalk.red(`${err}`));
        res.status(500).send(err.message);
    }
}