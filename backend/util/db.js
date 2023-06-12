import dotenv from 'dotenv';
dotenv.config();
const db={
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

const insertIntoUsers = (firstname, lastname,username,password)=>{
    return `INSERT INTO users 
    (firstName, lastName, username, password) 
    VALUES 
    ('${firstname}', '${lastname}', '${username}', '${password}')`;
};
const createUsers = ()=>{
   return `CREATE TABLE IF NOT EXISTS users (
        id int auto_increment primary key,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )`;
};
export {db, createUsers, insertIntoUsers};