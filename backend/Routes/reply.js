import express from "express";
const router = express.Router();
import mysql2 from "mysql2";
import {
  db,
  // insertIntoReplies,
  // insertIntoReplyDetails,
  insertIntoReplyTable,
  getRepliesData,
} from "../util/db.js";

import { generateId } from "../util/id.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";

const getReplyUserDetails = async (userid, connection) => {
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
  const username = req.user;
  const usertype = req.usertype;
  const timestamp = Date.now();

  try {
    const connection = await mysql2.createConnection(db);
    try {
      const query = `SELECT id FROM users where username='${username}' and usertype='${usertype}'`;
      const [rows] = await connection.promise().query(query);
      console.log(
        "users with given username and usertype in create reply ",
        rows
      );

      if (rows.length == 1) {
        const userid = rows[0].id;
        const replyid = generateId();

        console.log(data, replyid, timestamp, username, usertype, parentid);

        // await connection.promise().query(insertIntoReplies(replyid, parentid));
        // connection.commit();
        // await connection
        //   .promise()
        //   .query(insertIntoReplyDetails(userid, replyid, data, timestamp));
        // connection.commit();

        // const [reply] = await connection
        //   .promise()
        //   .query(`SELECT * FROM replyDetails WHERE replyid='${replyid}'`);

        await connection.promise().query(insertIntoReplyTable(replyid, parentid, userid, data, timestamp));
        connection.commit();

        // to check whether reply stored properly we query it and return that only 
        const [reply] = await connection
          .promise()
          .query(`SELECT * FROM replyTable WHERE replyid='${replyid}'`);

        const userdetails = await getReplyUserDetails(userid, connection);

        const combinedObj = {
          ...reply[0],
          ...userdetails,
        };
  
        return res
          .status(200)
          // .json({ message: "reply created", data: reply[0] });
          .json({ message: "reply created", data: combinedObj });
      }
      return res.status(500).json({ message: "internal server error" });
    } catch (error) {
      return res.status(500).json({ message: "internal server error" });
    } finally {
      connection.close();
    }
  } 
  catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});


router.get("/all", async (req, res) => {
  try {
    const commentid = req.query.commentid;
    const connection = await mysql2.createConnection(db);

    try {
      const [replies] = await connection.promise().query(getRepliesData(commentid));

      const repliesWithUsers = await Promise.all(replies.map(async (reply) => {
        const userdetails = await getReplyUserDetails(reply.userid, connection);
        return {
          ...reply,
          ...userdetails,
        };
      }));

      return res
        .status(200)
        // .json({ message: "replies fetched successfully", data: replies });
        .json({ message: "replies fetched successfully", data: repliesWithUsers });
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
