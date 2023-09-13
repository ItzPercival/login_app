import jwt from 'jsonwebtoken'
import env from 'dotenv'
env.config()

export default function verifyJwt(req, res, next){
    const token = req.cookies.token
    console.log(token)
    try {
        const user = jwt.verify(token, process.env.MY_SECRET)
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie("token");
        return res.send("Problem with auth")
    }
}


