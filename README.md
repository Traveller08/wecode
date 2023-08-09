# wecode: Your Gateway to Collaborative Programming Excellence

Welcome to **wecode**, the ultimate platform designed to cultivate a vibrant programming community and elevate your coding journey. Tailored to meet the unique needs of programmers at every level, We-Code stands as a testament to collaborative learning, innovative problem-solving, and growth.

## 🌟 Main Feature: Collaborative Knowledge Exchange

At the heart of wecode lies a groundbreaking feature - the Collaborative Knowledge Exchange. Have a programming query? Pose your question, and let the power of GPT provide you with an initial response. But we understand that AI isn't perfect. That's where our passionate community steps in. Experienced programmers can further guide, refine, and elaborate on GPT-generated answers. This ensures accuracy, relevance, and a safe space for knowledge-sharing. Together, we bridge the gap between AI and human expertise.

## Key Features

### **1. User-Centric Authentication**
wecode understands the importance of a personalized experience. Seamlessly create accounts, log in securely, and unlock a world of possibilities.

### **2. Dynamic Content Creation**
Fuel meaningful discussions by crafting engaging posts on programming intricacies. Express your thoughts, gain insights, and ignite conversations. Like, dislike, comment, and edit posts - your voice matters.

### **3. Knowledge Fusion: GPT + Community**
Our game-changing Knowledge Fusion feature harmonizes the capabilities of GPT-powered responses with the wisdom of seasoned programmers. Pose programming queries, receive GPT-generated answers, and let our passionate community refine and expand on them.

### **4. Enriching Learning Hub**
Embark on a learning journey with our dedicated Learn section. Immerse yourself in enlightening blogs and tutorials, with a spotlight on Data Structures, Algorithms (DSA), and Competitive Programming.

### **5. Precision Practice Arena**
Hone your skills in the Practice section:
- **Codeforces Challenges:** Curate your coding challenges using tailored filters.
- **Unsolved Gems:** Unearth unsolved problems from Codeforces and tackle them head-on.
- **Contest Chronicle:** get information about past Codeforces contests and benchmark your skills.
- **Problem Perfection:** Access curated problem sheets, including the esteemed Striver DSA sheet.

### **6. Codeforces Handle Visualizer**
Competitive programming aficionados, rejoice! Our visualizer offers insightful statistics and analytics for your Codeforces handle. Elevate your performance tracking with visual clarity.

### **7. Personalized Profiles**
Reflect your coding persona through customizable profiles. Share your coding odyssey, connect with fellow enthusiasts, and leave your unique mark.

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

## Demo Video  
[![Watch the video](https://img.youtube.com/vi/20tCSEdF9TY/hqdefault.jpg)](https://www.youtube.com/embed/20tCSEdF9TY)

Happy Coding
