// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';
import Header from './Header';
const botName = 'wecode bot';

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  botName: botName,
  // customStyles: {
  //   botMessageBox: {
  //     // backgroundColor: '#376B7E',
  //   },
  //   chatButton: {
  //     // backgroundColor: '#5ccc9d',
  //   },
  // },
  customComponents:{
    header: ()=> <Header /> 
    // Replaces the default bot avatar
    // botAvatar: (props) => <MyAvatar {...props} />,
    // Replaces the default bot chat message container
    // botChatMessage: (props) => <MyCustomChatMessage {...props} />,
    // Replaces the default user icon
    // userAvatar: (props) => <MyCustomAvatar {...props} />,
    // Replaces the default user chat message
    // userChatMessage: (props) => <MyCustomUserChatMessage {...props} />

  },
};

export default config;