import Navbar from '../components/Navbar'
import ThreadList from '../components/ChatBox';
import ChatBox from '../components/ChatBox';
import './style/MessengerPage.css';
import { ChatState } from '../Context/ChatProvider';
import { Box } from "@chakra-ui/layout";
//import { useState } from 'react';


const Chatpage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {<Navbar />}
      <Box
      display="flex"
      justifyContent="space-between"
      w="100%"
      h="90vh">
        {user && <ThreadList />}
        {user && <ChatBox />}
      </Box>
    
      <h1>hello world</h1>
    </div>
  );
};

export default Chatpage;
