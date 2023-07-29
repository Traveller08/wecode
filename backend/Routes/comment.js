import express from "express";
const router = express.Router();
import mysql2 from "mysql2";

import {
  db,
  insertIntoCommentTable,
  getCommentsData,
} from "../util/db.js";

import { generateId } from "../util/id.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";


const getCommentUserDetails = async (userid, connection) => {
  try {
    const [userdetails] = await connection
      .promise()
      .query(`SELECT username, firstName, lastName, photourl FROM users WHERE id='${userid}'`);
    return userdetails[0];
  } 
  catch (error) {
    console.log("Error fetching user details:", error);
    return null;
  }
};


router.post("/create", verifyJwtToken, async (req, res) => {
  const { data, parentid } = req.body;
  const timestamp = Date.now();
  const username = req.user;
  const usertype = req.usertype;

  try {
    const connection = await mysql2.createConnection(db);
    try {
      const query = `SELECT id FROM users where username='${username}' and usertype='${usertype}'`;
      const [rows] = await connection.promise().query(query);
      console.log("users with given username and usertype ", rows);

      if (rows.length == 1) {
        const userid = rows[0].id;
        const commentid = generateId();
        console.log(data, parentid, timestamp, username, usertype, commentid);
        
        await connection
          .promise()
          .query(insertIntoCommentTable(commentid, parentid, userid, data, timestamp));
        connection.commit();

        const [comment] = await connection
          .promise()
          .query(`SELECT * FROM commentTable WHERE commentid='${commentid}'`);
                
        const userdetails = await getCommentUserDetails(userid, connection);

        const combinedObj = {
          ...comment[0],
          ...userdetails,
        };

        console.log(combinedObj);

        return res
          .status(200)
          .json({ message: "comment created", data: combinedObj });
      }
      return res.status(500).json({ message: "internal server error" });
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


router.get("/all", async (req, res) => {
  try {
    const postid = req.query.postid;
    
    console.log("comments of post -> ", req.query);

    const connection = await mysql2.createConnection(db);

    try {
      const [comments] = await connection
        .promise()
        .query(getCommentsData(postid));

      console.log("get all comments of ", postid, "comments ", comments);

      const commentsWithUsers = await Promise.all(comments.map(async (comment) => {
        const userdetails = await getCommentUserDetails(comment.userid, connection);
        return {
          ...comment,
          ...userdetails,
        };
      }));

      return res
        .status(200)
        .json({ message: "comments fetched successfully", data: commentsWithUsers });
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
