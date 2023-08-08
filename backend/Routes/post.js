import express from "express";
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import mysql2 from "mysql2";

import { db, getPostsData, deletePost } from "../util/db.js";

import { generateId } from "../util/id.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";

router.post("/create", verifyJwtToken, async (req, res) => {
  const { data } = req.body;
  const username = req.user;
  const timestamp = Date.now();

  try {
    const connection = await mysql2.createConnection(db);
    try {
      const query = `SELECT id FROM users where username='${username}'`;
      const [rows] = await connection.promise().query(query);

      if (rows.length >= 1) {
        const userid = rows[0].id;
        const postid = generateId();

        const queryInsertpostTable =
          "INSERT INTO postTable (postid, userid, data, createdtime, likes, dislikes, type) VALUES (?, ?, ?, ?, ?, ?, ?)";

        await connection
          .promise()
          .query(queryInsertpostTable, [
            postid,
            userid,
            data,
            timestamp,
            0,
            0,
            "post",
          ]);
        connection.commit();

        const [post] = await connection
          .promise()
          .query(`SELECT * FROM postTable WHERE postid='${postid}'`);

        try {
          const query = `SELECT username, firstName, lastName, photourl FROM users WHERE id IN (
            SELECT userid FROM postTable WHERE postid='${postid}'
          )`;

          const [userdetails] = await connection.promise().query(query);

          const postDetails = {
            ...post[0],
            ...userdetails[0],
            likes: 0,
            dislikes: 0,
            reaction: "",
          };

          console.log(postDetails);

          return res
            .status(200)
            .json({ message: "post created successfully", data: postDetails });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "internal server error" });
        }
      }

      return res.status(500).json({ message: "internal server error" });
    } catch (error) {
      console.log("error -> ", error);
      return res.status(500).json({ message: "internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    console.log("error -> ", error);
    return res.status(500).json({ message: "internal server error" });
  }
});

router.post("/update", verifyJwtToken, async (req, res) => {
  const { postid, data } = req.body;
  const username = req.user;
  const timestamp = Date.now();

  try {
    const connection = await mysql2.createConnection(db);
    try {
      const queryUpdatepostTable = "UPDATE posttable SET data=? WHERE postid=?";
      await connection.promise().query(queryUpdatepostTable, [data, postid]);
      connection.commit();
      return res.status(200).json({ message: "post updated successfully" });
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

const isUserAthenticated = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return { status: false };
  } else {
    const secret_key = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret_key);
    if (decoded) {
      return { status: true, username: decoded.username };
    } else {
      return { status: false };
    }
  }
};

router.get("/all", async (req, res) => {
  try {
    const connection = await mysql2.createConnection(db);
    try {
      const [posts] = await connection.promise().query(getPostsData());

      const sendthis = [];
      const userVerification = isUserAthenticated(req);
      var userId = null;
      if (userVerification.status === true) {
        const query = `SELECT id FROM users WHERE username='${userVerification.username}'`;
        const [userRows] = await connection.promise().query(query);
        userId = userRows[0].id;
      }
      // console.log("user verification result -> ", userVerification);

      for (let post of posts) {
        try {
          const query = `SELECT username, firstName, lastName, photourl FROM users WHERE id IN (
            SELECT userid FROM postTable WHERE postid='${post.postid}'
          )`;

          const [userdetails] = await connection.promise().query(query);
          const queryGetLikesCount = `SELECT COUNT(*) AS likes FROM postReactions WHERE postid='${post.postid}' AND reaction='like'`;
          const queryGetDislikesCount = `SELECT COUNT(*) AS dislikes FROM postReactions WHERE postid='${post.postid}' AND reaction='dislike'`;

          const [likesResult] = await connection
            .promise()
            .query(queryGetLikesCount);

          const [dislikesResult] = await connection
            .promise()
            .query(queryGetDislikesCount);

          const likesCount = likesResult[0]?.likes || 0;
          const dislikesCount = dislikesResult[0]?.dislikes || 0;

          if (userId) {
            const reactionQuery = `SELECT * FROM postReactions WHERE postid='${post.postid}' AND userid=${userId}`;
            const [reactionRows] = await connection
              .promise()
              .query(reactionQuery);

            var reaction = "not reacted";

            if (reactionRows.length > 0) {
              reaction = reactionRows[0].reaction;
            }

            const combinedObj = {
              ...post,
              ...userdetails[0],
              likesCount,
              dislikesCount,
              reaction,
            };
            // console.log("hi: " , combinedObj)

            sendthis.push(combinedObj);
          } else {
            var reaction = "not reacted";
            const combinedObj = {
              ...post,
              ...userdetails[0],
              likesCount,
              dislikesCount,
              reaction,
            };
            sendthis.push(combinedObj);
          }
        } catch (error) {
          console.log("error ", error);
          return res.status(500).json({ message: "internal server error" });
        }
      }

      return res
        .status(200)
        .json({ message: "posts fetched successfully", data: sendthis });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "internal server error" });
  }
});

router.get("/delete", verifyJwtToken, async (req, res) => {
  try {
    const postid = req.query.postid;
    const connection = await mysql2.createConnection(db);
    try {
      await connection.promise().query(deletePost(postid));
      connection.commit();
      return res.status(200).json({ message: "post deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

// same for both question and post
router.post("/reaction", verifyJwtToken, async (req, res) => {
  const { postid, reaction } = req.body;
  const username = req.user;

  try {
    const connection = await mysql2.createConnection(db);
    try {
      // Get the user ID from the username
      const queryGetUserId = `SELECT id FROM users WHERE username='${username}'`;
      const [userRows] = await connection.promise().query(queryGetUserId);
      if (userRows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      const userid = userRows[0].id;

      // Check if the user has already reacted to the post
      const queryCheckReaction = `SELECT * FROM postReactions WHERE postid='${postid}' AND userid=${userid}`;
      const [reactionRows] = await connection
        .promise()
        .query(queryCheckReaction);
      const hasReacted = reactionRows.length > 0;

      if (hasReacted) {
        // User has already reacted, update the existing reaction
        const queryUpdateReaction = `UPDATE postReactions SET reaction='${reaction}' WHERE postid='${postid}' AND userid=${userid}`;
        await connection.promise().query(queryUpdateReaction);
      } else {
        // User has not reacted yet, insert a new reaction
        const queryInsertReaction = `INSERT INTO postReactions (postid, userid, reaction) VALUES (?, ?, ?)`;
        await connection
          .promise()
          .query(queryInsertReaction, [postid, userid, reaction]);
      }

      connection.commit();

      // Get the updated like and dislike counts
      const queryGetLikesCount = `SELECT COUNT(*) AS likes FROM postReactions WHERE postid='${postid}' AND reaction='like'`;
      const queryGetDislikesCount = `SELECT COUNT(*) AS dislikes FROM postReactions WHERE postid='${postid}' AND reaction='dislike'`;

      const [likesResult] = await connection
        .promise()
        .query(queryGetLikesCount);
      const [dislikesResult] = await connection
        .promise()
        .query(queryGetDislikesCount);

      const likesCount = likesResult[0]?.likes || 0;
      const dislikesCount = dislikesResult[0]?.dislikes || 0;

      // Update the like and dislike counts in the postTable
      const queryUpdateLikesAndDislikesCount = `UPDATE postTable SET likes=?, dislikes=? WHERE postid=?`;
      await connection
        .promise()
        .query(queryUpdateLikesAndDislikesCount, [
          likesCount,
          dislikesCount,
          postid,
        ]);

      connection.commit();

      return res
        .status(200)
        .json({ message: "Post reaction updated successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// same for both question and post
router.delete("/reaction", verifyJwtToken, async (req, res) => {
  const { postid } = req.body;
  const username = req.user;

  try {
    const connection = await mysql2.createConnection(db);
    try {
      // First, check if the user has already reacted to the post
      const query = `SELECT id FROM users WHERE username='${username}'`;
      const [userRows] = await connection.promise().query(query);

      if (userRows.length < 1) {
        return res.status(404).json({ message: "User not found" });
      }

      const userId = userRows[0].id;

      const postQuery = `SELECT * FROM postTable WHERE postid='${postid}'`;
      const [postRows] = await connection.promise().query(postQuery);

      if (postRows.length < 1) {
        return res.status(404).json({ message: "Post not found" });
      }

      const postUserId = postRows[0].userid;

      const reactionQuery = `SELECT * FROM postReactions WHERE postid='${postid}' AND userid=${userId}`;
      const [reactionRows] = await connection.promise().query(reactionQuery);

      if (reactionRows.length < 1) {
        return res.status(200).json({ message: "No post reaction" });
      }

      // Delete the post reaction
      const deleteQuery = `DELETE FROM postReactions WHERE postid='${postid}' AND userid=${userId}`;
      await connection.promise().query(deleteQuery);
      connection.commit();

      // Get the updated like and dislike counts
      const queryGetLikesCount = `SELECT COUNT(*) AS likes FROM postReactions WHERE postid='${postid}' AND reaction='like'`;
      const queryGetDislikesCount = `SELECT COUNT(*) AS dislikes FROM postReactions WHERE postid='${postid}' AND reaction='dislike'`;

      const [likesResult] = await connection
        .promise()
        .query(queryGetLikesCount);
      const [dislikesResult] = await connection
        .promise()
        .query(queryGetDislikesCount);

      const likesCount = likesResult[0]?.likes || 0;
      const dislikesCount = dislikesResult[0]?.dislikes || 0;

      // Update the like and dislike counts in the postTable
      const queryUpdateLikesAndDislikesCount = `UPDATE postTable SET likes=?, dislikes=? WHERE postid=?`;
      await connection
        .promise()
        .query(queryUpdateLikesAndDislikesCount, [
          likesCount,
          dislikesCount,
          postid,
        ]);

      connection.commit();

      return res
        .status(200)
        .json({ message: "Post reaction deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
