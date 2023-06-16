import express from "express";
const router = express.Router();
import mysql2 from "mysql2";
import {
  db,
  insertIntoComments,
  insertIntoCommentDetails,
  getCommentsData,
} from "../util/db.js";
import { generateId } from "../util/id.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";

router.post("/create", verifyJwtToken, async (req, res) => {
  const { data, parentid } = req.body;
  const timestamp = Date.now();
  const username = req.user;
  const usertype = req.usertype;
  try {
    const connection = await mysql2.createConnection(db);
    const query = `SELECT id FROM users where username='${username}' and usertype='${usertype}'`;
    const [rows] = await connection.promise().query(query);
    console.log("users with given username and usertype ", rows);

    if (rows.length == 1) {
      const userid = rows[0].id;
      const commentid = generateId();
      console.log(data, parentid, timestamp, username, usertype, commentid);
      await connection.promise().query(insertIntoComments(commentid, parentid));
      connection.commit();
      await connection
        .promise()
        .query(insertIntoCommentDetails(userid, commentid, data, timestamp));
      connection.commit();
      const [comment] = await connection.promise().query(`SELECT * FROM commentDetails WHERE commentid='${commentid}'`);
      return res.status(200).json({ message: "comment created", data:comment[0] });
    }
    return res.status(500).json({ message: "internal server error" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});
router.get("/all", async (req, res) => {
  try {
    const postid = req.query.postid;
    console.log("comments of post -> ",req.query);
    const connection = await mysql2.createConnection(db);
    const [comments] = await connection
      .promise()
      .query(getCommentsData(postid));

    console.log("get all comments of ", postid, "comments ", comments);

    
    return res
      .status(200)
      .json({ message: "comments fetched successfully", data: comments });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

export default router;
