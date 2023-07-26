import express from "express";
const router = express.Router();

import mysql2 from "mysql2";

import {
  db,
  insertIntoQuestions,
  insertIntoQuestionDetails,
  getQuestionsData,
  getQuestionuser,
} from "../util/db.js";

import { generateId } from "../util/id.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";

router.post("/ask", verifyJwtToken, async (req, res) => {
  console.log("question request body ", req.body);

  const { data } = req.body; // data => question string 
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
        const questionid = generateId();

        await connection.promise().query(insertIntoQuestions(questionid, userid));
        connection.commit();

        await connection
          .promise()
          .query(insertIntoQuestionDetails(questionid, data, timestamp));
        connection.commit();

        const [question] = await connection 
          .promise()
          .query(`SELECT * FROM questionDetails WHERE questionid='${questionid}'`);

        try {
    
            const query = `SELECT username, firstName, lastName, photourl FROM users WHERE id = (
                SELECT userid FROM questions WHERE questionid='${question[0].questionid}'
            )`

            const [userdetails] = await connection.promise().query(query);
            console.log(userdetails[0]);
            
            console.log(typeof userdetails[0]);

            const combinedObj = {
                ...question[0],
                ...userdetails[0]
            }
            console.log(combinedObj)
            
            return res
            .status(200)
            .json({ message: "question created successfully", data: combinedObj });
            
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
      const [questions] = await connection.promise().query(getQuestionsData());

      console.log( " questions ==> "  , questions)

      const sendthis = []
    
      for (let question of questions) {
        
        try {
          
          const query = `SELECT username, firstName, lastName, photourl FROM users WHERE id = (
            SELECT userid FROM questions WHERE questionid='${question.questionid}'
          )`
          
          const [userdetails] = await connection.promise().query(query);
          console.log(userdetails[0]);
          
          console.log(typeof userdetails[0]);

          const combinedObj = {
            ...question,
            ...userdetails[0]
          }

          console.log(combinedObj)

          sendthis.push(combinedObj)

          // const [rows] = await connection.promise().query(query);
        }
        catch(error) {
          console.log(error)
          return res.status(500).json({ message: "internal server error" });
        }

      }


      console.log("sendthis ==> " , sendthis)
      

      return res
        .status(200)
        // .json({ message: "Questions fetched successfully", data: questions });
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


router.get("/user", async (req, res) => {
  console.log("here question user");

  try {
    const questionid = req.query.questionid;

    const connection = await mysql2.createConnection(db);
    
    try {
      const [questions] = await connection.promise().query(getQuestionuser(questionid));
      console.log("questionid ->", questionid, "questions ", questions);

      return res
        .status(200)
        .json({ message: "question user fetched successfully", data: questions });
    } 
    catch (error) {
      return res.status(500).json({ message: "internal server error" });
    } 
    finally {
      connection.close();
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});
export default router;
