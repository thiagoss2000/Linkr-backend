import chalk from "chalk";
import connection from "../data/dbL.js";

export async function authorization(req, res, next){
    const token = req.headers.authorized;
    try {
        const userId = await connection.query(`SELECT user_id FROM sessions
                WHERE token = $1`, [token]);
        if (userId.rows.length == 0) return res.sendStatus(401);
        res.locals = userId;
        next();
    }
    catch (err) {
        console.log(chalk.red(`ERROR AUTHENTICATING TOKEN: ${err}`));
        res.status(500).send({ error: err.message });
    }
}
