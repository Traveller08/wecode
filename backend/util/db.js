import dotenv from "dotenv";
dotenv.config();

const db = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

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


const createPosts = () => {
  return `CREATE TABLE IF NOT EXISTS posts (
         postid VARCHAR(255) NOT NULL,
         userid int NOT NULL,
         PRIMARY KEY (postid, userid)
       )`;
};

const insertIntoPosts = (postid, userid) => {
  return `INSERT INTO posts
    (postid, userid) 
    VALUES 
    ('${postid}', ${userid})`;
};


const createPostDetails = () => {
  return `CREATE TABLE IF NOT EXISTS postDetails (
         postid VARCHAR(255) primary key NOT NULL,
         data VARCHAR(5000) NOT NULL,
         createdtime BIGINT NOT NULL,
         likes INT,
         dislikes INT
       )`;
};

const insertIntoPostDetails = (postid, data, createdtime) => {
  return `INSERT INTO postDetails
    (postid, data, createdtime, likes, dislikes ) 
    VALUES 
    ('${postid}', '${data}', '${createdtime}', ${0}, ${0})`;
};

const createComments = () => {
  return `CREATE TABLE IF NOT EXISTS comments (
         commentid VARCHAR(255) NOT NULL,
         postid VARCHAR(255) NOT NULL,
         PRIMARY KEY (postid, commentid)
       )`;
};

const insertIntoComments = (commentid, postid) => {
  return `INSERT INTO comments
    (commentid, postid) 
    VALUES 
    ('${commentid}', '${postid}')`;
};

const createCommentDetails = () => {
  return `CREATE TABLE IF NOT EXISTS commentDetails (
         commentid VARCHAR(255) primary key NOT NULL,
         userid INT NOT NULL,
         data VARCHAR(5000) NOT NULL,
         createdtime BIGINT NOT NULL,
         likes INT,
         dislikes INT,
         isdeleted INT
       )`;
};

const insertIntoCommentDetails = (userid , commentid, data, createdtime) => {
  return `INSERT INTO commentDetails
    (userid, commentid, data, createdtime, likes, dislikes, isdeleted) 
    VALUES 
    (${userid} ,'${commentid}', '${data}', '${createdtime}', ${0}, ${0} , ${0})`;
};

const createReplies = () => {
  return `CREATE TABLE IF NOT EXISTS replies (
         replyid VARCHAR(255) NOT NULL,
         commentid VARCHAR(255) NOT NULL,
         PRIMARY KEY (replyid, commentid)
       )`;
};

const insertIntoReplies = (replyid, commentid) => {
  return `INSERT INTO replies
    (replyid, commentid) 
    VALUES 
    ('${replyid}', '${commentid}')`;
};

const createReplyDetails = () => {
  return `CREATE TABLE IF NOT EXISTS replyDetails (
         userid INT NOT NULL,
         replyid VARCHAR(255) primary key NOT NULL,
         data VARCHAR(5000) NOT NULL,
         createdtime BIGINT NOT NULL,
         likes INT,
         dislikes INT,
         isdeleted INT
       )`;
};

const insertIntoReplyDetails = (userid, replyid, data, createdtime) => {
  return `INSERT INTO replyDetails
    (userid ,replyid, data, createdtime, likes, dislikes, isdeleted) 
    VALUES 
    (${userid}, '${replyid}', '${data}', '${createdtime}', ${0}, ${0} , ${0})`;
};

const getPostsData = () =>{
  return 'SELECT * FROM postDetails ORDER BY createdtime DESC'
};

const getCommentsData = (postid) =>{
  return `SELECT * FROM commentDetails WHERE commentid IN (
    SELECT commentid FROM comments WHERE postid='${postid}'
  ) ORDER BY createdtime DESC`
};

const getRepliesData = (commentid) =>{
  return `SELECT * FROM replyDetails WHERE replyid IN (
    SELECT replyid FROM replies WHERE commentid='${commentid}'
  ) ORDER BY createdtime DESC`
};

const getPostuser = (postid) =>{
  return `SELECT username, firstName, lastName, photourl FROM users WHERE id in (
    SELECT userid FROM posts WHERE postid='${postid}'
  )`
};

const getUserDetails = (userid) =>{
  return `SELECT username, firstName, lastName, photourl FROM users WHERE id ='${userid}'`
};

// SELECT * FROM postDetails WHERE postid IN(
  //   SELECT postid FROM posts WHERE userid=${userid}
  // )


// ------------------------- Questions

const createQuestions = () => {
  return `CREATE TABLE IF NOT EXISTS questions (
         questionid VARCHAR(255) NOT NULL,
         userid int NOT NULL,
         PRIMARY KEY (questionid, userid)
       )`;
};

const insertIntoQuestions = (questionid, userid) => {
  return `INSERT INTO questions
    (questionid, userid) 
    VALUES 
    ('${questionid}', ${userid})`;
};

const createQuestionDetails = () => {
  return `CREATE TABLE IF NOT EXISTS questionDetails (
         questionid VARCHAR(255) primary key NOT NULL,
         data VARCHAR(5000) NOT NULL,
         createdtime BIGINT NOT NULL,
         likes INT,
         dislikes INT
       )`;
};

const insertIntoQuestionDetails = (questionid, data, createdtime) => {
  return `INSERT INTO questionDetails
    (questionid, data, createdtime, likes, dislikes ) 
    VALUES 
    ('${questionid}', '${data}', '${createdtime}', ${0}, ${0})`;
};

const getQuestionsData = () =>{
  return 'SELECT * FROM questionDetails ORDER BY createdtime DESC'
};

const getQuestionuser = (questionid) =>{
  return `SELECT username, firstName, lastName, photourl FROM users WHERE id in (
    SELECT questionid FROM questions WHERE questionid='${questionid}'
  )`
};

export {
  db,
  createUsers,
  insertIntoUsers,
  createPosts,
  createComments,
  createReplies,
  createPostDetails,
  createCommentDetails,
  createReplyDetails,
  insertIntoPostDetails,
  insertIntoCommentDetails,
  insertIntoReplyDetails,
  insertIntoPosts,
  insertIntoComments,
  insertIntoReplies,
  getPostsData,
  getPostuser,
  getCommentsData,
  getUserDetails,
  getRepliesData,

  createQuestions,
  insertIntoQuestions,
  createQuestionDetails,
  insertIntoQuestionDetails,
  getQuestionsData,
  getQuestionuser,
  
};
