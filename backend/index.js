import express from "express" 
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());
import login from './Routes/login.js';
import register from './Routes/register.js';
import profile from './Routes/profile.js';
import post from './Routes/post.js';

app.use('/api/user/login', login);
app.use('/api/user/register',register);
app.use('/api/user/profile',profile);
app.use('/api/post/',post);



app.listen(5000,()=>{
    console.log("server started on port 5000");
})


