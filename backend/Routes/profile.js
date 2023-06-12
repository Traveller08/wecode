import express from "express";
const router = express.Router();
import mysql2 from "mysql2";
import { db } from "../util/db.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";

router.get('/',verifyJwtToken, async (req, res) => {
    
    // console.log("request ", req.headers.authorization);
    const username = req.user;
 
    try{
        const connection = await mysql2.createConnection(db);
        const query = `SELECT * FROM users where username='${username}'`;
        const [rows] = await connection.promise().query(query);

  
        if(rows.length==1){
            const userProfile={
                "user_id": rows[0].id,
                "user_type": "individual",
                "email": rows[0].username,
                "user_name":rows[0].firstName + " " + rows[0].lastName,
                "broker": "ZERODHA"
            }
           
            
            return res.status(200).json({ status: 'success', data:userProfile });
        }
        return res.status(200).json({ status: 'failed', data:"" });
    }catch(error){

        return res.status(500).json({ message: "internal server error" });
    }
});

export default router;