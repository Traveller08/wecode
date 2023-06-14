import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generateAccessToken =(payload)=>{
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:"1800s"});
};

export {generateAccessToken};