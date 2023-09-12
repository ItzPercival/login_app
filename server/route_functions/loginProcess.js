import {  getUserPass } from "../database.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export function loginProcess(req, res) {    
    getUserPass(req.body.username).then((password) => {
        const hashedPass = password
        bcrypt.compare(req.body.password, hashedPass, (err, result) => {
            if(err){
                //password does not match
                res.send("error in comparing passwords")
                return err;
            } else if (result){
                // jwt.sign
                res.send("Logged in!")
                return result;
            }
            
        })
    }).catch((err) =>{
        console.log(err)
        res.send(err)
    })
}


