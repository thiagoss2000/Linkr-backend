import chalk from "chalk";
import { newUser, searchUser, insertToken } from "../repositories/auth\Repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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

export async function login (req,res){
    try{
         const {email,password}=req.body;
 
         const verifyUser= await searchUser(email);
         console.log(verifyUser.rows)
 
         if(verifyUser.rows.length === 0){
             res.status(401).send("Usuário Inexistente")
         }
 
         if(!bcrypt.compareSync(password, verifyUser.rows[0].password)){
             res.status(401).send("email ou senha incorretos...");
             return;
         }
 
         
 
         const data = {id: verifyUser.rows[0].id, name: verifyUser.rows[0].name}
 
         const config = { expiresIn: "1h" };
         const token= jwt.sign(data ,process.env.ENCRYPTPASSWORD, config);
 
         await insertToken(verifyUser.rows[0].id,token);
 
         res.status(200).send({ token });
     }
     catch(e){
         console.log(e)
         res.sendStatus(400);
     }
 }