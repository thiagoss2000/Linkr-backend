import chalk from "chalk";
import { newUser } from "../repositories/auth\Repository.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
    const { email, password, confirmPassword, username, urlpicture} = req.body;
    const hashPassword= bcrypt.hashSync(password,10);
    try{
       await newUser(username, email, hashPassword, urlpicture);
        res.status(201).send({message: "User created successfully"});
    } catch(err){
        console.log(chalk.red(`${err}`));

        if(err.message.includes("duplicate key value violates unique constraint"))
            return res.status(409).send("User already exists");

        res.status(500).send(err.message);
    }
}