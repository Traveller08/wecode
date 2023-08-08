import express from "express";
const router = express.Router();
import mysql2 from "mysql2";
import {
  db,
  getRepliesData,
  deleteReply,
} from "../util/db.js";

import { generateId } from "../util/id.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";

const getReplyUserDetails = async (userid, connection) => {
  try {
    const [userdetails] = await connection
      .promise()
      .query(
        `SELECT username, firstName, lastName, photourl FROM users WHERE id='${userid}'`
      );
    return userdetails[0];
  } catch (error) {
    console.log("Error fetching user details:", error);
    return null;
  }
};

router.post("/create", verifyJwtToken, async (req, res) => {
  const { data, parentid } = req.body;
  const username = req.user;
  const timestamp = Date.now();

  try {
    const connection = await mysql2.createConnection(db);
    try {
      const query = `SELECT id FROM users where username='${username}'`;
      const [rows] = await connection.promise().query(query);

      if (rows.length == 1) {
        const userid = rows[0].id;
        const replyid = generateId();

        // await connection.promise().query(insertIntoReplyTable(replyid, parentid, userid, data, timestamp));
        // connection.commit();

        const queryInsertIntoReplyTable = `INSERT INTO replyTable
        (replyid, commentid, userid, data, createdtime, likes, dislikes, isdeleted) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?)`;

        await connection
          .promise()
          .query(queryInsertIntoReplyTable, [
            replyid,
            parentid,
            userid,
            data,
            timestamp,
            0,
            0,
            0,
          ]);
        connection.commit();
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
          .json({ message: "reply created", data: combinedObj });
      }
      return res.status(500).json({ message: "internal server error" });
    } catch (error) {
      return res.status(500).json({ message: "internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const commentid = req.query.commentid;
    const connection = await mysql2.createConnection(db);

    try {
      const [replies] = await connection
        .promise()
        .query(getRepliesData(commentid));

      const repliesWithUsers = await Promise.all(
        replies.map(async (reply) => {
          const userdetails = await getReplyUserDetails(
            reply.userid,
            connection
          );
          return {
            ...reply,
            ...userdetails,
          };
        })
      );

      return res.status(200).json({
        message: "replies fetched successfully",
        data: repliesWithUsers,
      });
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
  const { replyid, data } = req.body;
  const username = req.user;
  const timestamp = Date.now();
  try {
    const connection = await mysql2.createConnection(db);
    try {
      const queryUpdatereplyTable =
        "UPDATE replytable SET data=? WHERE replyid=?";
      await connection.promise().query(queryUpdatereplyTable, [data, replyid]);
      connection.commit();
      return res.status(200).json({ message: "reply updated successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

router.get("/delete", verifyJwtToken, async (req, res) => {
  try {
    const replyid = req.query.replyid;
    const connection = await mysql2.createConnection(db);
    try {
      let [replies] = await connection
        .promise()
        .query("select * from replytable");

      await connection.promise().query(deleteReply(replyid));
      connection.commit();

      return res.status(200).json({ message: "reply deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

export default router;
