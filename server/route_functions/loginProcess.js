import {  getUserPass } from "../database.js";
import bcrypt from 'bcrypt'

export function loginProcess(req, res) {
    
    getUserPass(req.body.username).then((password) => {
        const hashedPass = password
        bcrypt.compare(req.body.password, hashedPass, (err, result) => {
            if(err){
                //password does not match
                res.send("error in comparing passwords")
                return err;
            } else if (result){
                //passwords match
                res.send("Logged in!")
                return result;
            }
        })
    })
}

