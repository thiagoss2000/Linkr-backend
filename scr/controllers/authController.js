import chalk from "chalk";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {
  newUser,
  searchUser,
  insertToken,
} from "../repositories/authRepository.js";



dotenv.config();

export async function signUp(req, res) {
    const { email, password, user_name, image} = req.body;
    const hashPassword= bcrypt.hashSync(password,10);
    try{
        await newUser(user_name, email, hashPassword, image);
        res.status(201).send({message: "User created successfully"});
    } catch(err){
        console.log(chalk.red(`${err}`));

        if(err.message.includes("duplicate key value violates unique constraint"))
            return res.status(409).send("User already exists");

        res.status(500).send(err.message);
    }
}

export async function login (req,res){
    try{
        const {email,password} = req.body;

        const verifyUser = await searchUser(email);

        if(verifyUser.rows.length === 0){
            res.status(401).send({message: "User not found..."});
            return;
        }

        if(!bcrypt.compareSync(password, verifyUser.rows[0].password)){
            res.status(401).send({message : "Wrong password..." });
            return;
        }
        

        const data = {id: verifyUser.rows[0].id, name: verifyUser.rows[0].name}

        const config = { expiresIn: "1h" };
        const token= jwt.sign(data ,process.env.ENCRYPTPASSWORD, config);

        await insertToken(verifyUser.rows[0].id,token);

        const user = {
        id : verifyUser.rows[0].id,
        username : verifyUser.rows[0].username,
        pictureUrl : verifyUser.rows[0].pictureUrl
        }

        const response = { token, user };

        res.status(200).send({...response });
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}
