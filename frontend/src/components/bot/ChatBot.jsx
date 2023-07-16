import React, { useState } from 'react';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import Chatbot from 'react-chatbot-kit';
import './chatbot.css';
import ChatbotIcon from './ChatbotIcon';
import Header from './Header';
const ChatBot = () => {
  const [showBot, setShowBot]= useState(false);
  const handleShowBot =()=>{
    setShowBot(!showBot);
  }
  return (
   <>
   {
     showBot &&
    <Chatbot   
     config={config}
     messageParser={MessageParser}
     actionProvider={ActionProvider}
   />
    }
     <ChatbotIcon  showBot={handleShowBot}/>
     
   

   </>
  )
}

export default ChatBot;