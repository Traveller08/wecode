import express from "express";
const router = express.Router();

import mysql2 from "mysql2";

import {
  db,
  insertIntoPostTable,
  getPostsData,
} from "../util/db.js";

import { generateId } from "../util/id.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";

router.post("/create", verifyJwtToken, async (req, res) => {
  console.log("post request body ", req.body);
  const { data } = req.body;
  const username = req.user;
  const usertype = req.usertype;
  const timestamp = Date.now();

  try {
    const connection = await mysql2.createConnection(db);
    try {
      const query = `SELECT id FROM users where username='${username}' and usertype='${usertype}'`;
      const [rows] = await connection.promise().query(query);

      console.log("users with given username and usertype ", rows);

      if (rows.length == 1) {
        const userid = rows[0].id;
        const postid = generateId();

        await connection
          .promise()
          .query(insertIntoPostTable(postid, userid, data, timestamp));
        connection.commit();


        const [post] = await connection
          .promise()
          .query(`SELECT * FROM postTable WHERE postid='${postid}'`);
        
        console.log(post[0])
        
        try {
        
          const query = `SELECT username, firstName, lastName, photourl FROM users WHERE id IN (
            SELECT userid FROM postTable WHERE postid='${postid}'
          )`;

          const [userdetails] = await connection.promise().query(query);
          console.log(userdetails[0]);
          
          const combinedObj = {
            ...post[0],
            ...userdetails[0]
          }
          console.log(combinedObj)
          
          return res
          .status(200)
          .json({ message: "post created successfully", data: combinedObj });
          
        }
        catch(error) {
          console.log(error)
          return res.status(500).json({ message: "internal server error" });
        }
      
      }

      return res.status(500).json({ message: "internal server error" });
    } 
    catch (error) {
      console.log("error -> ", error);
      return res.status(500).json({ message: "internal server error" });
    } 
    finally {
      connection.close();
    }
  } 
  catch (error) {
    console.log("error -> ", error);
    return res.status(500).json({ message: "internal server error" });
  }
});


router.get("/all", async (req, res) => {
  try {
    const connection = await mysql2.createConnection(db);
    try {
      const [posts] = await connection.promise().query(getPostsData());
      
      console.log( "posts ==> "  , posts)

      const sendthis = []

      for (let post of posts) {        
        try {
          
          const query = `SELECT username, firstName, lastName, photourl FROM users WHERE id IN (
            SELECT userid FROM postTable WHERE postid='${post.postid}'
          )`;

          const [userdetails] = await connection.promise().query(query);
          
          const combinedObj = {
            ...post,
            ...userdetails[0]
          }

          console.log(combinedObj)

          sendthis.push(combinedObj)
        }
        catch(error) {
          console.log(error)
          return res.status(500).json({ message: "internal server error" });
        }

      }

      console.log("sendthis ==> " , sendthis)
      
      return res
        .status(200)
        .json({ message: "posts fetched successfully", data: sendthis });
    } 
    catch (error) {
      return res.status(500).json({ message: "internal server error" });
    } 
    finally {
      connection.close();
    }
  } 

  catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

export default router;
