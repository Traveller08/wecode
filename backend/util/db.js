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

// const createPosts = () => {
//   return `CREATE TABLE IF NOT EXISTS posts (
//          postid VARCHAR(255) NOT NULL,
//          userid int NOT NULL,
//          PRIMARY KEY (postid, userid)
//        )`;
// };

// const insertIntoPosts = (postid, userid) => {
//   return `INSERT INTO posts
//     (postid, userid) 
//     VALUES 
//     ('${postid}', ${userid})`;
// };


// const createPostDetails = () => {
//   return `CREATE TABLE IF NOT EXISTS postDetails (
//          postid VARCHAR(255) primary key NOT NULL,
//          data VARCHAR(5000) NOT NULL,
//          createdtime BIGINT NOT NULL,
//          likes INT,
//          dislikes INT
//        )`;
// };

// const insertIntoPostDetails = (postid, data, createdtime) => {
//   return `INSERT INTO postDetails
//     (postid, data, createdtime, likes, dislikes ) 
//     VALUES 
//     ('${postid}', '${data}', '${createdtime}', ${0}, ${0})`;
// };

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

// const getPostsData = () =>{
//   return 'SELECT * FROM postDetails ORDER BY createdtime DESC'
// };

const getPostsData = () => {
  return 'SELECT * FROM postTable ORDER BY createdtime DESC';
};

// const getPostuser = (postid) =>{
//   return `SELECT username, firstName, lastName, photourl FROM users WHERE id in (
//     SELECT userid FROM posts WHERE postid='${postid}'
//   )`
// };


// COMMENTS ------------------------------------------

// const createComments = () => {
//   return `CREATE TABLE IF NOT EXISTS comments (
//          commentid VARCHAR(255) NOT NULL,
//          postid VARCHAR(255) NOT NULL,
//          PRIMARY KEY (postid, commentid)
//        )`;
// };

// const insertIntoComments = (commentid, postid) => {
//   return `INSERT INTO comments
//     (commentid, postid) 
//     VALUES 
//     ('${commentid}', '${postid}')`;
// };

// const createCommentDetails = () => {
//   return `CREATE TABLE IF NOT EXISTS commentDetails (
//          commentid VARCHAR(255) primary key NOT NULL,
//          userid INT NOT NULL,
//          data VARCHAR(5000) NOT NULL,
//          createdtime BIGINT NOT NULL,
//          likes INT,
//          dislikes INT,
//          isdeleted INT
//        )`;
// };

// const insertIntoCommentDetails = (userid , commentid, data, createdtime) => {
//   return `INSERT INTO commentDetails
//     (userid, commentid, data, createdtime, likes, dislikes, isdeleted) 
//     VALUES 
//     (${userid} ,'${commentid}', '${data}', '${createdtime}', ${0}, ${0} , ${0})`;
// };

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


// const getCommentsData = (postid) =>{
//   return `SELECT * FROM commentDetails WHERE commentid IN (
//     SELECT commentid FROM comments WHERE postid='${postid}'
//   ) ORDER BY createdtime DESC`
// };

const getCommentsData = (postid) => {
  return `SELECT * FROM commentTable WHERE postid='${postid}' ORDER BY createdtime DESC`;
};


// REPLIES -----------------------------------------------

// const createReplies = () => {
//   return `CREATE TABLE IF NOT EXISTS replies (
//          replyid VARCHAR(255) NOT NULL,
//          commentid VARCHAR(255) NOT NULL,
//          PRIMARY KEY (replyid, commentid)
//        )`;
// };

// const insertIntoReplies = (replyid, commentid) => {
//   return `INSERT INTO replies
//     (replyid, commentid) 
//     VALUES 
//     ('${replyid}', '${commentid}')`;
// };

// const createReplyDetails = () => {
//   return `CREATE TABLE IF NOT EXISTS replyDetails (
//          userid INT NOT NULL,
//          replyid VARCHAR(255) primary key NOT NULL,
//          data VARCHAR(5000) NOT NULL,
//          createdtime BIGINT NOT NULL,
//          likes INT,
//          dislikes INT,
//          isdeleted INT
//        )`;
// };

// const insertIntoReplyDetails = (userid, replyid, data, createdtime) => {
//   return `INSERT INTO replyDetails
//     (userid ,replyid, data, createdtime, likes, dislikes, isdeleted) 
//     VALUES 
//     (${userid}, '${replyid}', '${data}', '${createdtime}', ${0}, ${0} , ${0})`;
// };

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


// const getRepliesData = (commentid) =>{
//   return `SELECT * FROM replyDetails WHERE replyid IN (
//     SELECT replyid FROM replies WHERE commentid='${commentid}'
//   ) ORDER BY createdtime DESC`
// };



// ------------------------- Questions

// const createQuestions = () => {
//   return `CREATE TABLE IF NOT EXISTS questions (
//          questionid VARCHAR(255) NOT NULL,
//          userid int NOT NULL,
//          PRIMARY KEY (questionid, userid)
//        )`;
// };

// const insertIntoQuestions = (questionid, userid) => {
//   return `INSERT INTO questions
//     (questionid, userid) 
//     VALUES 
//     ('${questionid}', ${userid})`;
// };

// const createQuestionDetails = () => {
//   return `CREATE TABLE IF NOT EXISTS questionDetails (
//          questionid VARCHAR(255) primary key NOT NULL,
//          data VARCHAR(5000) NOT NULL,
//          createdtime BIGINT NOT NULL,
//          likes INT,
//          dislikes INT
//        )`;
// };

// const insertIntoQuestionDetails = (questionid, data, createdtime) => {
//   return `INSERT INTO questionDetails
//     (questionid, data, createdtime, likes, dislikes ) 
//     VALUES 
//     ('${questionid}', '${data}', '${createdtime}', ${0}, ${0})`;
// };

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

// const getQuestionuser = (questionid) =>{
//   return `SELECT username, firstName, lastName, photourl FROM users WHERE id in (
//     SELECT questionid FROM questions WHERE questionid='${questionid}'
//     )`
//   };
  
export {
  db,
  createUsers,
  insertIntoUsers,
  getUserDetails,

  // createPosts,
  // insertIntoPosts,
  // createPostDetails,
  // insertIntoPostDetails,
  // getPostuser,
  createPostTable,
  insertIntoPostTable,
  getPostsData,

  // createComments,
  // createCommentDetails,
  // insertIntoCommentDetails,
  // insertIntoComments,
  createCommentTable,
  insertIntoCommentTable,
  getCommentsData,


  // createReplies,
  // createReplyDetails,
  // insertIntoReplyDetails,
  // insertIntoReplies,
  createReplyTable,
  insertIntoReplyTable,
  getRepliesData,

  
  // createQuestions,
  // insertIntoQuestions,
  // createQuestionDetails,
  // insertIntoQuestionDetails,
  // getQuestionuser,
  createQuestionTable,
  insertIntoQuestionTable,
  getQuestionsData,

};
