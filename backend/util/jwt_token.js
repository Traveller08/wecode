import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generateAccessToken =(username)=>{
    return jwt.sign({'username':username}, process.env.SECRET_KEY, {expiresIn:"1800s"});
};

export {generateAccessToken};