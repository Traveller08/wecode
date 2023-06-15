import express from "express";
const router = express.Router();
import mysql2 from "mysql2";
import { 
    db, 
    createReplies,
    createReplyDetails, 
    insertIntoReplies, 
    insertIntoReplyDetails 
} from "../util/db.js";
import {generateId} from "../util/id.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";

router.post('/create',verifyJwtToken, async (req, res) => {
    
    const {data, parentid} = req.body
    const username = req.user;
    const usertype = req.usertype;
    const timestamp = Date.now()

    try{
        const connection = await mysql2.createConnection(db);

            const commentid = generateId()

            await connection.promise().query(createReplies())
            connection.commit();

            await connection.promise().query(createReplyDetails())
            connection.commit();
            
            await connection.promise().query(insertIntoReplies(commentid, postid));
            connection.commit();

            await connection.promise().query(insertIntoReplyDetails(commentid,data,timestamp))
            connection.commit();

            return res.status(200).json({ message: 'reply created', data:"" });
        
    }catch(error){

        return res.status(500).json({ message: "internal server error" });
    }
});

export default router;