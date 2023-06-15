import express from "express";
const router = express.Router();
import mysql2 from "mysql2";
import { 
    db, 
    createComments,
    createCommentDetails, 
    insertIntoComments, 
    insertIntoCommentDetails 
} from "../util/db.js";
import {generateId} from "../util/id.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";

router.post('/create',verifyJwtToken, async (req, res) => {
    
    const {data, parentid} = req.body;
    const timestamp = Date.now();
    const username = req.user;
    const usertype = req.usertype;

    try{
        const connection = await mysql2.createConnection(db);

            const commentid = generateId()

            await connection.promise().query(createComments())
            connection.commit();

            await connection.promise().query(createCommentDetails())
            connection.commit();
            
            await connection.promise().query(insertIntoComments(commentid, postid));
            connection.commit();

            await connection.promise().query(insertIntoCommentDetails(commentid,data,timestamp))
            connection.commit();

            return res.status(200).json({ message: 'comment created', data:"" });
        
    }catch(error){

        return res.status(500).json({ message: "internal server error" });
    }
});

export default router;