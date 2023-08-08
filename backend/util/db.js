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
        photourl VARCHAR(255) 
      )`;
};

const insertIntoUsers = (
  firstname,
  lastname,
  username,
  password,
  codeforcesHandle
) => {
  return `INSERT INTO users 
    (firstName, lastName, username, password, codeforcesHandle) 
    VALUES 
    ('${firstname}', '${lastname}', '${username}', '${password}', '${codeforcesHandle}')`;
};

const getUserDetails = (username) => {
  return `SELECT firstName, lastName, username, codeforcesHandle, photourl FROM users WHERE username ='${username}'`;
};

// POST -------------------------------------------

const createPostTable = () => {
  return `CREATE TABLE IF NOT EXISTS postTable (
         postid VARCHAR(255) primary key NOT NULL,
         userid INT NOT NULL,
         data VARCHAR(5000) NOT NULL,
         createdtime BIGINT NOT NULL,
         likes INT DEFAULT 0,
         dislikes INT DEFAULT 0,
         type VARCHAR(255) NOT NULL
       )`;
};

const insertIntoPostTable = (postid, userid, data, createdtime, type) => {
  return `INSERT INTO postTable
  (postid, userid, data, createdtime, likes, dislikes, type ) 
  VALUES 
  ('${postid}', ${userid}, '${data}', '${createdtime}', ${0}, ${0}, '${type}')`;
};

const getPostsData = () => {
  return 'SELECT * FROM postTable where type="post" ORDER BY createdtime DESC';
};

const deletePost = (postid) => {
  return `DELETE FROM postTable WHERE postid='${postid}'`;
};

// COMMENTS ------------------------------------------

const createCommentTable = () => {
  return `CREATE TABLE IF NOT EXISTS commentTable (
    commentid VARCHAR(255) primary key NOT NULL,
    postid VARCHAR(255) NOT NULL,
         userid INT NOT NULL,
         data VARCHAR(5000) NOT NULL,
         createdtime BIGINT NOT NULL,
         likes INT DEFAULT 0,
         dislikes INT DEFAULT 0,
         isdeleted INT,
         FOREIGN KEY(postid) REFERENCES postTable(postid) ON DELETE CASCADE
         )`;
};

const insertIntoCommentTable = (
  commentid,
  postid,
  userid,
  data,
  createdtime
) => {
  return `INSERT INTO commentTable
          (commentid, postid, userid, data, createdtime, likes, dislikes, isdeleted) 
  VALUES 
  ('${commentid}', '${postid}', ${userid}, '${data}', '${createdtime}', ${0}, ${0}, ${0})`;
};

const getCommentsData = (postid) => {
  return `SELECT * FROM commentTable WHERE postid='${postid}' ORDER BY createdtime DESC`;
};

const deleteComment = (commentid) => {
  return `DELETE FROM commentTable WHERE commentid='${commentid}'`;
};

// REPLIES -----------------------------------------------

const createReplyTable = () => {
  return `CREATE TABLE IF NOT EXISTS replyTable (
    replyid VARCHAR(255) NOT NULL,
    commentid VARCHAR(255) NOT NULL,
    userid INT NOT NULL,
    data VARCHAR(5000) NOT NULL,
    createdtime BIGINT NOT NULL,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    isdeleted INT,
    PRIMARY KEY (replyid, commentid),
    FOREIGN KEY(commentid) REFERENCES commentTable(commentid) ON DELETE CASCADE
    )`;
};

const insertIntoReplyTable = (
  replyid,
  commentid,
  userid,
  data,
  createdtime
) => {
  return `INSERT INTO replyTable
    (replyid, commentid, userid, data, createdtime, likes, dislikes, isdeleted) 
    VALUES 
    ('${replyid}', '${commentid}', ${userid}, '${data}', '${createdtime}', ${0}, ${0}, ${0})`;
};

const getRepliesData = (commentid) => {
  return `SELECT * FROM replyTable WHERE commentid='${commentid}' ORDER BY createdtime DESC`;
};

const deleteReply = (replyid) => {
  return `DELETE FROM replyTable WHERE replyid='${replyid}'`;
};

const getQuestionsData = () => {
  return 'SELECT * FROM postTable where type="question" ORDER BY createdtime DESC';
};

// GPT Response -----------------------------------------------

const createGptTable = () => {
  return `CREATE TABLE IF NOT EXISTS gptTable (
    questionid VARCHAR(255) NOT NULL,
    gptresponse VARCHAR(10000) NOT NULL,
    PRIMARY KEY (questionid),
    FOREIGN KEY(questionid) REFERENCES postTable(postid) ON DELETE CASCADE
);`;
};

const insertIntoGptTable = (questionid, gptresponse) => {
  return `INSERT INTO gptTable (questionid, gptresponse) 
                 VALUES ('${questionid}', '${gptresponse}')`;
};

const getGptResponseByQuestionId = (questionid) => {
  return `SELECT gptresponse FROM gptTable WHERE questionid = '${questionid}'`;
};

// POST Reactions ----------------------------------------

const createPostReactionsTable = () => {
  return `CREATE TABLE IF NOT EXISTS postReactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    postid VARCHAR(255) NOT NULL,
    userid INT NOT NULL,
    reaction ENUM('like', 'dislike' ) NOT NULL,
    FOREIGN KEY (postid) REFERENCES postTable(postid) ON DELETE CASCADE
  )`;
};

const insertOrUpdatePostReaction = (postid, userid, reaction) => {
  return `INSERT INTO postReactions (postid, userid, reaction)
          VALUES ('${postid}', ${userid}, '${reaction}')
          ON DUPLICATE KEY UPDATE reaction='${reaction}'`;
};

export {
  db,
  createUsers,
  insertIntoUsers,
  getUserDetails,
  createPostTable,
  insertIntoPostTable,
  getPostsData,
  deletePost,
  createCommentTable,
  insertIntoCommentTable,
  getCommentsData,
  deleteComment,
  createReplyTable,
  insertIntoReplyTable,
  getRepliesData,
  deleteReply,
  getQuestionsData,
  createGptTable,
  insertIntoGptTable,
  getGptResponseByQuestionId,
  createPostReactionsTable,
  insertOrUpdatePostReaction,
};
