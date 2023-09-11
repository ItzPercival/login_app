import Express from 'express';
import {createUser, loginUser} from './database.js'

const app = Express();
app.use(Express.json())


app.post('/register', (req, res) =>{
    const user = createUser(req.body.username, req.body.password);
    res.send("User was created!")
    return user;
})

app.post('/login', (req, res) => {
    loginUser(req.body.username, req.body.password)
    .then((userCheck) => {
      if(userCheck){
        res.send("Logged in!");
    } else {
        res.send("Username or password does not exist in the database.")
    }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred.");
    });
})

const PORT = 3000 || process.env.PORT
app.listen(PORT, ()=> console.log(`Listening on Port: ${PORT}`))