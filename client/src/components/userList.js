import React from 'react';
import { Button } from "@chakra-ui/button";
import { useHistory } from "react-router-dom";
import './style/UserList.css'



const UserList = ({ users }) => {
    const history = useHistory();

    if (!users.length) {
        return <h3>No Profiles Yet</h3>;
    }

    const startChat = () => {
        history.push("/chats");
    }

    return (
        <div>
            <div className='container'>
                {users && users.map((user) => (
                    <div key={user._id} className='listStyle'>
                        <Button 
                        className='buttonStyle'
                        onClick={startChat}>
                            {user.name}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserList;