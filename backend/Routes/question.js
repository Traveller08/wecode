import express from "express";
const router = express.Router();

import { generateCodeExplanation } from '../util/test.js'

import mysql2 from "mysql2";

import {
  db,
  // insertIntopostTable,
  insertIntoGptTable,
  getQuestionsData,
} from "../util/db.js";


import { generateId } from "../util/id.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";

router.post("/ask", verifyJwtToken, async (req, res) => {
  console.log("question request body ", req.body);

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

      if (rows.length >= 1) {
        const userid = rows[0].id;
        const questionid = generateId();

        // await connection
        //   .promise()
        //   .query(insertIntopostTable(questionid, userid, data, timestamp));
        // connection.commit();

        // SQL query to insert data into the postTable using a prepared statement
        
        // console.log(question[0])
        
        // gpt start
        let gptresponse = await generateCodeExplanation(data);


        // console.log(gptresponse);
        
        // Escape special characters in the text before inserting to prevent SQL injection
        // const escapedGptResponse = connection.escape(gptresponse);

        // await connection
        //   .promise()
        //   .query(insertIntoGptTable(questionid, escapedGptResponse));
        // connection.commit();

        // const [gptrow] = await connection 
        //   .promise()
        //   .query(`SELECT * FROM gptTable WHERE questionid='${questionid}'`);
        
        // console.log(gptrow[0]) 

        // gptresponse = `The code print("Hello World") is a statement in the Python programming language that prints the text "Hello World" to the console 
        // or output screen.
        
        // In Python, print() is a built-in function 
        // that is used to display or output data to the user. In this case, the function is called with the string "Hello World" as an argument, which is enclosed in double quotation marks to indicate that it is a string literal. `
        
        // SQL query to insert the text into the database using a prepared statement
        const queryInsertpostTable = 'INSERT INTO postTable (postid, userid, data, createdtime, likes, dislikes, type) VALUES (?, ?, ?, ?, ?, ?, ?)';
        
        await connection 
          .promise()
          .query(queryInsertpostTable, [questionid, userid, data, timestamp, 0, 0,"question"]);
      
        // connection.commit();
        const insertQuery = `INSERT INTO gptTable (questionid, gptresponse) VALUES (?, ?)`;
        await connection 
          .promise()
          .query(insertQuery, [questionid, gptresponse]);

        connection.commit();
      
        // Perform the insertion using a prepared statement
        // const [result] = await connection.query(insertQuery, [questionid, gptresponse]);
        
    
        console.log('Gpt Response inserted successfully!');

        const [question] = await connection 
        .promise()
        .query(`SELECT * FROM postTable WHERE postid='${questionid}'`);
      

        const [gptrow] = await connection 
          .promise()
          .query(`SELECT * FROM gptTable WHERE questionid='${questionid}'`);
         console.log(`SELECT * FROM gptTable WHERE questionid='${questionid}'`)
        // console.log("From sql :: " , gptrow[0]) 
        
        const originalGptResponse = gptrow[0].gptresponse.replace(/\\/g, '');
        // console.log("Using replace :: " , originalGptResponse) 

        // gpt end 

        try {
    
            const [userdetails] = await connection
            .promise()
            .query(`SELECT username, firstName, lastName, photourl FROM users WHERE id = ${userid}`);

            const combinedObj = {
                ...question[0],
                ...userdetails[0],
                gptresponse : originalGptResponse
            }

            // console.log(combinedObj)
            
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
      const sendthis = []
      if(!questions || questions.length<=0){
        return res
        .status(200)
        .json({ message: "posts fetched successfully", data: sendthis });
      } 
      for (let question of questions) {
        console.log( " question  ==> "  , question)
        
        try {
          
          const query = `SELECT username, firstName, lastName, photourl FROM users WHERE id IN (
            SELECT userid FROM postTable WHERE postid='${question.postid}'
          )`;
          
          const [userdetails] = await connection.promise().query(query);
          
          // gpt response 
          const [gptrow] = await connection 
          .promise()
          .query(`SELECT * FROM gptTable WHERE questionid='${question.postid}'`);
        
          // console.log("From sql :: " , gptrow[0]) 
          
          const originalGptResponse = gptrow[0].gptresponse.replace(/\\/g, '');
          // console.log("Using replace :: " , originalGptResponse) 

          // gpt response end 

          const combinedObj = {
            ...question,
            ...userdetails[0],
            gptresponse : originalGptResponse
          }

          // console.log("object of each question : ", combinedObj)

          sendthis.push(combinedObj)

        }
        catch(error) {
          console.log(error)
          return res.status(500).json({ message: "internal server error" });
        }

      }

      // console.log("sendthis ==> " , sendthis)
      
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
