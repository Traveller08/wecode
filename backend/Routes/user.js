import express from "express";
import { db, getUserDetails, insertIntoUsers } from "../util/db.js";
import { generateAccessToken } from "../util/jwt_token.js";
import { compareHash, generateHash } from "../util/password.js";
import mysql2 from "mysql2";
import { verifyLoginDetails } from "../middleware/verify_login_details.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";
import { verifyUserDetails } from "../middleware/verify_user_details.js";
const router = express.Router();

router.post("/login", verifyLoginDetails, async (req, res) => {
  const { username, password } = req.body;
  console.log("login ", req.body);
  try {
    const connection = await mysql2.createConnection(db);
    const query = `SELECT * FROM users WHERE username = '${username}' LIMIT 1`;
    const [rows] = await connection.promise().query(query);
    if (rows.length === 1) {
      const hashedPassword = rows[0].password;
      const passwordMatch = await compareHash(password, hashedPassword);
      if (passwordMatch) {
        const payload = {
          username: rows[0].username,
        };
        const token = generateAccessToken(payload);
        const data = {
          username: rows[0].username,
          firstName: rows[0].firstName,
          lastName: rows[0].lastName,
          codeforcesHandle: rows[0].codeforcesHandle,
        };
        return res
          .status(200)
          .json({ message: "login successful", token: token, data: data });
      }
    }
    return res.status(401).json({ message: "invalid credentials" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/register", verifyUserDetails, async (req, res) => {
  console.log("req : ", req.body);
  const { firstName, lastName, username, password, codeforcesHandle } =
    req.body;
  try {
    const connection = await mysql2.createConnection(db);
    try {
      const hashedPassword = await generateHash(password);
      const checkUserQuery = `select * from users where username='${username}'`;
      const [rows] = await connection.promise().query(checkUserQuery);

      if (rows.length > 0) {
        return res
          .status(400)
          .json({ message: "user with given username already exists" });
      }

      const query = insertIntoUsers(
        firstName,
        lastName,
        username,
        hashedPassword,
        codeforcesHandle
      );
      await connection.promise().query(query);
      connection.commit();
      return res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      console.log("error ", error);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    console.log("error ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", verifyJwtToken, async (req, res) => {
  const username = req.user;
  console.log(username);

  try {
    const connection = await mysql2.createConnection(db);
    try {
      const [user] = await connection.promise().query(getUserDetails(username));
      console.log(user);
      console.log(user[0]);

      return res
        .status(200)
        .json({ message: "comment user fetched successfully", data: user[0] });
    } catch (error) {
      return res.status(500).json({ message: "internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

router.post("/update", verifyJwtToken, async (req, res) => {
  const username = req.user;
  // console.log("req : ", req.body);
  // const { firstName, lastName, codeforcesHandle } = req.body;

  console.log("req : ", req.body.data.userDetails);
  const { firstName, lastName, codeforcesHandle } = req.body.data.userDetails;
  console.log(firstName, lastName, codeforcesHandle);

  try {
    const connection = await mysql2.createConnection(db);
    try {
      const checkUserQuery = `select * from users where username='${username}'`;
      const [rows] = await connection.promise().query(checkUserQuery);

      if (rows.length == 0) {
        return res.status(400).json({ message: "no such user" });
      }

      const query = `UPDATE users SET firstName='${firstName}', lastName='${lastName}', codeforcesHandle='${codeforcesHandle}' where username='${username}'`;

      await connection.promise().query(query);
      connection.commit();

      const updatedUserDetails = `select * from users where username='${username}'`;
      const [result] = await connection.promise().query(updatedUserDetails);

      return res
        .status(200)
        .json({
          message: "User details updated successfully",
          data: result[0],
        });
    } catch (error) {
      console.log("error ", error);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    console.log("error ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
