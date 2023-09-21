import {  getUserPass } from "../database.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from 'dotenv'

env.config()

export default function loginProcess(req, res) {
    if(req.body.username == '' || req.body.password == ''){
        res.status(400).send("Please insert a username and a password")
        return null
    }    
    getUserPass(req.body.username).then((password) => {
        const hashedPass = password
        const user = {
            "username": req.body.username,
            "roles": ["User"],
        }

        bcrypt.compare(req.body.password, hashedPass, (err, result) => {
            if(err){
                //password does not match
                res.send("error in comparing passwords")
                return err;
            } else if (result){
                const token = jwt.sign(user, process.env.MY_SECRET, { expiresIn: 60 })
                const refreshTok = jwt.sign(user, process.env.REFRESH, { expiresIn: '10m' })
                window.sessionStorage.setItem('refresh', refreshTok)
                res.send(token)
                return result;
            }
        })
    }).catch((err) =>{
        res.status(400).send(err)
    })
}


