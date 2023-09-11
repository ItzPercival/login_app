import Express from 'express';
import {createUser} from './database.js'

const app = Express();
app.use(Express.json())


app.post('/', (req, res) =>{
    const user = createUser(req.body.username, req.body.password);
    res.send("User was created!")
    return user;
})




const PORT = 3000 || process.env.PORT
app.listen(PORT, ()=> console.log(`Listening on Port: ${PORT}`))