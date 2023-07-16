import React from 'react'
import chatbotIcon from "../../images/icons/chatbot.png"
import Image from "react-bootstrap/Image";
const BotIcon = (props) => {
  return (
    <>
        <div className="chat-bot-icon-container" onClick={props.showBot}>
            <Image src={chatbotIcon} className='chat-bot-icon'></Image>
        </div>
    </>
  )
}

export default BotIcon;