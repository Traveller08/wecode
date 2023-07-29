import dotenv from "dotenv";
dotenv.config();

const db = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};


// USER ------------------------------------------

const createUsers = () => {
  return `CREATE TABLE IF NOT EXISTS users (
        id int auto_increment primary key,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255),
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        codeforcesHandle VARCHAR(255),
        usertype VARCHAR(255) NOT NULL,
        photourl VARCHAR(255) 
      )`;
};

const insertIntoUsers = (
  firstname,
  lastname,
  username,
  password,
  codeforcesHandle,
  usertype
) => {
  return `INSERT INTO users 
    (firstName, lastName, username, password, codeforcesHandle, usertype ) 
    VALUES 
    ('${firstname}', '${lastname}', '${username}', '${password}', '${codeforcesHandle}', '${usertype}')`;
};

const getUserDetails = (userid) =>{
  return `SELECT username, firstName, lastName, photourl FROM users WHERE id ='${userid}'`
};


// POST -------------------------------------------

const createPostTable = () => {
  return `CREATE TABLE IF NOT EXISTS postTable (
         postid VARCHAR(255) primary key NOT NULL,
         userid INT NOT NULL,
         data VARCHAR(5000) NOT NULL,
         createdtime BIGINT NOT NULL,
         likes INT,
         dislikes INT
       )`;
};
      
const insertIntoPostTable = (postid, userid, data, createdtime) => {
  return `INSERT INTO postTable
  (postid, userid, data, createdtime, likes, dislikes ) 
  VALUES 
  ('${postid}', ${userid}, '${data}', '${createdtime}', ${0}, ${0})`;
};

const getPostsData = () => {
  return 'SELECT * FROM postTable ORDER BY createdtime DESC';
};


// COMMENTS ------------------------------------------

const createCommentTable = () => {
  return `CREATE TABLE IF NOT EXISTS commentTable (
         commentid VARCHAR(255) primary key NOT NULL,
         postid VARCHAR(255) NOT NULL,
         userid INT NOT NULL,
         data VARCHAR(5000) NOT NULL,
         createdtime BIGINT NOT NULL,
         likes INT,
         dislikes INT,
         isdeleted INT
       )`;
};

const insertIntoCommentTable = (commentid, postid, userid, data, createdtime) => {
  return `INSERT INTO commentTable
  (commentid, postid, userid, data, createdtime, likes, dislikes, isdeleted) 
  VALUES 
  ('${commentid}', '${postid}', ${userid}, '${data}', '${createdtime}', ${0}, ${0}, ${0})`;
};

const getCommentsData = (postid) => {
  return `SELECT * FROM commentTable WHERE postid='${postid}' ORDER BY createdtime DESC`;
};


// REPLIES -----------------------------------------------

const createReplyTable = () => {
  return `CREATE TABLE IF NOT EXISTS replyTable (
         replyid VARCHAR(255) NOT NULL,
         commentid VARCHAR(255) NOT NULL,
         userid INT NOT NULL,
         data VARCHAR(5000) NOT NULL,
         createdtime BIGINT NOT NULL,
         likes INT,
         dislikes INT,
         isdeleted INT,
         PRIMARY KEY (replyid, commentid)
       )`;
};

const insertIntoReplyTable = (replyid, commentid, userid, data, createdtime) => {
  return `INSERT INTO replyTable
    (replyid, commentid, userid, data, createdtime, likes, dislikes, isdeleted) 
    VALUES 
    ('${replyid}', '${commentid}', ${userid}, '${data}', '${createdtime}', ${0}, ${0}, ${0})`;
};

const getRepliesData = (commentid) => {
  return `SELECT * FROM replyTable WHERE commentid='${commentid}' ORDER BY createdtime DESC`;
};


// ------------------------- Questions

const createQuestionTable = () => {
  return `CREATE TABLE IF NOT EXISTS questionTable (
         questionid VARCHAR(255) NOT NULL,
         userid INT NOT NULL,
         data VARCHAR(5000) NOT NULL,
         createdtime BIGINT NOT NULL,
         likes INT,
         dislikes INT
       )`;
};

const insertIntoQuestionTable = (questionid, userid, data, createdtime) => {
  return `INSERT INTO questionTable
    (questionid, userid, data, createdtime, likes, dislikes ) 
    VALUES 
    ('${questionid}', ${userid}, '${data}', '${createdtime}', ${0}, ${0})`;
};

const getQuestionsData = () =>{
  return 'SELECT * FROM questionTable ORDER BY createdtime DESC'
};

// GPT response 
const createGptTable = () => {
  return `CREATE TABLE IF NOT EXISTS gptTable (
    questionid VARCHAR(255) NOT NULL,
    gptresponse VARCHAR(10000) NOT NULL,
    PRIMARY KEY (questionid)
);`;
}

const insertIntoGptTable = (questionid, gptresponse) => {
  return`INSERT INTO gptTable (questionid, gptresponse) 
                 VALUES ('${questionid}', '${gptresponse}')`;
}

const getGptResponseByQuestionId = (questionid) => {
  return `SELECT gptresponse FROM gptTable WHERE questionid = '${questionid}'`;
}


export {
  db,
  createUsers,
  insertIntoUsers,
  getUserDetails,

  createPostTable,
  insertIntoPostTable,
  getPostsData,

  createCommentTable,
  insertIntoCommentTable,
  getCommentsData,

  createReplyTable,
  insertIntoReplyTable,
  getRepliesData,

  createQuestionTable,
  insertIntoQuestionTable,
  getQuestionsData,

  createGptTable,
  insertIntoGptTable,
  getGptResponseByQuestionId,
};
