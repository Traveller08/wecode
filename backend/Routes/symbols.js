import express from "express";
const router = express.Router();
import mysql2 from 'mysql2';
import { db } from "../util/db.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";


router.get('/',[verifyJwtToken] ,async (req, res) => {
    try{
        const connection = await mysql2.createConnection(db);
        const query = `SELECT DISTINCT instrument_name from historicalPrices`;
        const [rows] = await connection.promise().query(query);
        connection.end();
        return res.status(200).json({ status: 'success', data:rows });
    }catch(error){
        return res.status(500).json({ message:"internal server error" });
    }
});

export default router;