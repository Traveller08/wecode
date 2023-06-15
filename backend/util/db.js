import dotenv from "dotenv";
dotenv.config();
const db = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
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
const createUsers = () => {
  return `CREATE TABLE IF NOT EXISTS users (
        id int auto_increment primary key,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255),
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        codeforcesHandle VARCHAR(255),
        usertype VARCHAR(255) NOT NULL
      )`;
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
         data VARCHAR(5000) NOT NULL,
         createdtime BIGINT NOT NULL,
         likes INT,
         dislikes INT,
         isdeleted INT
       )`;
};
const insertIntoCommentDetails = (commentid, data, createdtime) => {
  return `INSERT INTO commentDetails
    (commentid, data, createdtime, likes, dislikes, isdeleted) 
    VALUES 
    ('${commentid}', '${data}', '${createdtime}', ${0}, ${0} , ${0})`;
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
         replyid VARCHAR(255) primary key NOT NULL,
         data VARCHAR(5000) NOT NULL,
         createdtime BIGINT NOT NULL,
         likes INT,
         dislikes INT,
         isdeleted INT
       )`;
};
const insertIntoReplyDetails = (replyid, data, createdtime) => {
  return `INSERT INTO replyDetails
    (replyid, data, createdtime, likes, dislikes, isdeleted) 
    VALUES 
    ('${replyid}', '${data}', '${createdtime}', ${0}, ${0} , ${0})`;
};

const getPostsData = () =>{
  return 
  `
    SELECT * FROM postDetails
  `;
  // SELECT * FROM postDetails WHERE postid IN(
  //   SELECT postid FROM posts WHERE userid=${userid}
  // )
}
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
  getPostsData
};
