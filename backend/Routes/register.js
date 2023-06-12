import express from "express";
import mysql2 from "mysql2";
import { db,createUsers, insertIntoUsers } from "../util/db.js";
import { generateHash } from "../util/password.js";
import { verifyUserDetails } from "../middleware/verify_user_details.js";

const router = express.Router();

router.post('/', verifyUserDetails, async (req, res) => {
    const { firstName, lastName, username, password } = req.body;
    try {
        
        const connection = await mysql2.createConnection(db);
        const hashedPassword = await generateHash(password);
        await connection.promise().query(createUsers());
        connection.commit();
        const checkUserQuery = `select * from users where username='${username}'`;
        const [rows] = await connection.promise().query(checkUserQuery);
        
        if(rows.length>0){
            return res.status(200).json({ message: 'user with given username already exists' });
        }

        const query = insertIntoUsers(firstName,lastName,username,hashedPassword);
        await connection.promise().query(query);
        connection.commit();
        connection.end();
        return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;