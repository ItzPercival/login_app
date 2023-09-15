import {  getUserPass } from "../database.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from 'dotenv'

env.config()

export default function loginProcess(req, res) {    
    getUserPass(req.body.username).then((password) => {
        const hashedPass = password
        const user = {
            "username": req.body.username,
            "roles": ["User"]
        }
        bcrypt.compare(req.body.password, hashedPass, (err, result) => {
            if(err){
                //password does not match
                res.send("error in comparing passwords")
                return err;
            } else if (result){
                const token = jwt.sign(user, process.env.MY_SECRET, { expiresIn: 60 })
                res.cookie("token", token, {
                    httpsOnly: true,
                })
                res.send("Logged in!")
                return result;
            }
        })
    }).catch((err) =>{
        console.log(err)
        res.send(err)
    })
}


