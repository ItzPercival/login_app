import Express from 'express';
import loginProcess from './route_functions/loginProcess.js';
import registerProcess from './route_functions/registerProcess.js';
import refreshToken from './route_functions/refreshToken.js';
import verifyJwt from './route_functions/jwtTokenVerification.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = Express();
const allowedOrigins = 'http://localhost:3000'
app.use(Express.json())
app.use(cookieParser())
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
  }))

app.post('/register', registerProcess)

app.post('/login', loginProcess)

app.post('/refresh', refreshToken)

app.get('/welcome', verifyJwt, (req, res) => {
    res.send("You did it man");
})

const PORT = 8080 || process.env.PORT
app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`))