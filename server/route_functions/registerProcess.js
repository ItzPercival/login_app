import {  createUser, checkUser } from "../database.js";
import bcrypt from 'bcrypt'

export default function registerProcess(req, res){
    if(checkUser(req.body.username)){
        res.send("Account with that username already exists!")
    } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err){
                res.send("There was a problem with handling your password")
            } else {
                const user = createUser(req.body.username, hash);
                res.send("User was created!")
                return user;
            }
        })
    }
}