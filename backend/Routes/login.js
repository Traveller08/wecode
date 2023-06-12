import express  from "express";
import { generateAccessToken } from "../util/jwt_token.js";
import { compareHash } from "../util/password.js";
import { db } from "../util/db.js";
import mysql2 from "mysql2";
import { verifyLoginDetails } from "../middleware/verify_login_details.js";
const router = express.Router();

router.post('/', verifyLoginDetails, async (req, res) => {
    const { username, password } = req.body;
    try {
      const connection = await mysql2.createConnection(db);
      const query = `SELECT * FROM users WHERE username = '${username}' LIMIT 1`;
      const [rows] = await connection.promise().query(query);
      if (rows.length === 1) {
        const hashedPassword = rows[0].password;
        const passwordMatch = await compareHash(password, hashedPassword);
        if (passwordMatch) {
          const payload = {
            username: rows[0].username
          };
          const token = generateAccessToken(username);
          return res.status(200).json({status:"success", token: token });
        }
      }
      return res.status(401).json({ message: 'Invalid username or password' });
    } catch (error) {
      // console.error('Error executing database query:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
export default router;