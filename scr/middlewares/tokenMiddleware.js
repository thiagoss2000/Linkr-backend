import chalk from "chalk";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

export const validateToken = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) return res.status(401).send({ error: "No token provided" });
        token = token.replace("Bearer ", "");
        
        const decoded = jwt.verify(token, process.env.ENCRYPTPASSWORD);
        if (!decoded) return res.status(401).send({ error: "Invalid token" });
        res.locals.user = decoded;
        console.log(decoded)
        console.log(res.locals.user)
        next();
    } catch (err) {
        console.log(chalk.red(`ERROR VERIFYING JWT: ${err}`));
        return res.status(401).send({message: "Auth failed" });
    }
}