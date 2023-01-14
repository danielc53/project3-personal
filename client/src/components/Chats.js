import React, { useState } from "react";
import { Button } from "@chakra-ui/button";
import { useHistory } from "react-router-dom";
import Navbar from '../components/Navbar'
import { Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import './style/Chats.css'
import { ADD_MESSAGE } from '../util/mutations'
import { useMutation } from "@apollo/client";

const Chats = () => {
    const [inputState, setInputState] = useState({ text: '' });
    const history = useHistory();
    const [createMessage, { data }] = useMutation(ADD_MESSAGE);
    const messageBox = document.getElementsByClassName('messageBox')

    const handleChange = (event) => {
        const { text, value } = event.target

        setInputState({
            ...inputState,
            [text]: value

        })
        console.log('VALUE OF CURRENT TEXT INPUT IS ' + value);
    }




    const backButton = () => {
        history.push('/messager')
    }

    const sendChat = async(e) => {
        e.preventDefault();
        console.log(inputState)
        

        try{
            await createMessage({
                variables: { ...inputState },
              });
        } catch (error){
            console.log(error)
        }
    }

    const clearChat = () => {
        inputState.text = ''
    }

    return (
        <div>Thread list of chats
            <Navbar />
            <Button onClick={backButton}>Back</Button>
            {/* set up current user chat is with */}
            <div>Now chatting with </div> 
            <Box>
                <Box className="messageBox"></Box>
                <form>
                    <Input
                        placeholder="Start typing..."
                        name="text"
                        type='text'
                        value={data}
                        onChange={handleChange}
                    ></Input>
                    <Button
                        onClick={sendChat}
                        onSubmit={clearChat}
                    >Send</Button>
                </form>
            </Box>
        </div>
    );
};

export default Chats;
