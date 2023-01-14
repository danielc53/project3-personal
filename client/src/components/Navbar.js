import { Box, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import React from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import "./style/Navbar.css";
import UserList from '../components/userList';

import { QUERY_USER } from '../util/queries';
import { useQuery } from "@apollo/client";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Navbar = () => {
  const history = useHistory();
  const { loading, data } = useQuery(QUERY_USER);
  const users = data?.users

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  // let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }


  return (
    <div className="masterNav">
      <Box>
        <h1>Welcome to Chatterbox!</h1>
        <Button variant="outline">
          <i className="fa-light fa-message-plus"></i>
          <Text onClick={openModal}>
          New Chat
          </Text>
        </Button>
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="userListModal"
        > {loading ? (
          <div>Loading...</div>
        ) : (
          <UserList
            users={users}
            title='List of all registered users'></UserList>)}
        </Modal>
        <Button variant="outline" onClick={logoutHandler}>
          Log out
        </Button>
      </Box>
    </div>
  );
};

export default Navbar;
