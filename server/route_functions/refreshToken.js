import jwt from 'jsonwebtoken'
import env from 'dotenv'
env.config()

export default function refreshToken (req, res) {
    const {refreshTok} = req.body
    if(refreshTok){
        jwt.verify(refreshTok, process.env.REFRESH, (err, decoded) =>{
            if(err){
                return res.status(401).send("You are unauthorized")
            } else {
                const accToken = jwt.sign({username: decoded.username, roles: decoded.roles}, process.env.MY_SECRET, { expiresIn: 60 })
                return res.send(accToken)
            }
        })
    } else {
        return res.status(401).send("You are unauthorized")
    }
}
