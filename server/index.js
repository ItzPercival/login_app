import Express from 'express';
import bcrypt from 'bcrypt'
import {createUser} from './database.js'
import { loginProcess } from './route_functions/loginProcess.js';


const app = Express();
app.use(Express.json())


app.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err){
            res.send("There was a problem with handling your password")
        } else {
            const user = createUser(req.body.username, hash);
            res.send("User was created!")
            return user;
        }
    })
})

app.post('/login', loginProcess)

const PORT = 3000 || process.env.PORT
app.listen(PORT, ()=> console.log(`Listening on Port: ${PORT}`))