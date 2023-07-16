import express from "express";
const router = express.Router();
import mysql2 from "mysql2";
import {
  db,
  getRepliesData,
  insertIntoReplies,
  insertIntoReplyDetails,
} from "../util/db.js";
import { generateId } from "../util/id.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";

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
        console.log(data, parentid, timestamp, username, usertype, parentid);
        await connection.promise().query(insertIntoReplies(replyid, parentid));
        connection.commit();
        await connection
          .promise()
          .query(insertIntoReplyDetails(userid, replyid, data, timestamp));
        connection.commit();

        const [reply] = await connection
          .promise()
          .query(`SELECT * FROM replyDetails WHERE replyid='${replyid}'`);

        return res
          .status(200)
          .json({ message: "reply created", data: reply[0] });
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
    const replyid = req.query.commentid;
    const connection = await mysql2.createConnection(db);
    const [replies] = await connection.promise().query(getRepliesData(replyid));
    try {
      return res
        .status(200)
        .json({ message: "replies fetched successfully", data: replies });
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
