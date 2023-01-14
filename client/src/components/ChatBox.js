import React from "react";
import { ChatState } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/react';


const ChatBox = () => {
    const { selectedChat } = ChatState();

    return (
        <Box>
            
        </Box>
    );
};

export default ChatBox;