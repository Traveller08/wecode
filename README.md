# we-code

## Technologies Used

- Backend: Node.js, Express.js, mysql2
- Frontend: React
- Authentication: JWT (JSON Web Tokens)

## Prerequisites
1. Create a database to save all the data for the project in the MySQL server you are using(either localhost or some other hosted server)
   
   ### Create database
   ```sql
      /* create database */
      
      create database <database_name> ;
      
2. Create .env file in backend folder
   ## contents of the file
   ```env
      MYSQL_HOST=""       # mysql host
      MYSQL_USER=""       # mysql user
      MYSQL_PASSWORD=""   # mysql password
      MYSQL_DATABASE=""   # mysql database name
      SECRET_KEY=""       # secret key to hash password
      GPT_API_KEY=""      # gpt access key for API requests to chat-gpt(Model: gpt-3.5-turbo)
      GPT_BASE_PATH=""    # gpt base path for the API requests to chat-gpt(Model: gpt-3.5-turbo)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Traveller08/we-code.git
   
2. Install the dependencies for the backend:
   ```bash
   cd we-code/backend
   npm install
   
3. Install the dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   
4. Start the backend server:
   ```bash
   cd ../backend
   node index.js

6. Start the frontend development server:
   ```bash
   cd ../frontend
   npm start


   
   
