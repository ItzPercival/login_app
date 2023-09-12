import Express from 'express';
import bcrypt from 'bcrypt'
import {createUser} from './database.js'
import { loginProcess } from './route_functions/loginProcess.js';
import { registerProcess } from './route_functions/registerProcess.js';


const app = Express();
app.use(Express.json())


app.post('/register', registerProcess)

app.post('/login', loginProcess)

const PORT = 3000 || process.env.PORT
app.listen(PORT, ()=> console.log(`Listening on Port: ${PORT}`))