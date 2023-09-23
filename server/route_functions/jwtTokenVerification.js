import jwt from 'jsonwebtoken'
import env from 'dotenv'
env.config()

export default function verifyJwt(req, res, next){
    const { token } = req.cookies
    if(token){
        const user = jwt.verify(token, process.env.MY_SECRET)
        req.user = user;
        next();
    } else{
        res.clearCookie("token");
        return res.status(401).send("Unauthorized")
    }
}


