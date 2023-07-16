import React from 'react'

const Header = (props) => {
  return (
    
    <div className='chat-bot-header'>
        <div className="chat-bot-left-header h5">
            Chat with wecode bot
        </div>
        <div className="chat-bot-right-header" style={{cursor:"pointer"}}>
        <i class="bi bi-x-lg header-icon" ></i>
        </div>
    </div>
  )
}

export default Header