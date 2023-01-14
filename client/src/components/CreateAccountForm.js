import React from "react";
import Login from './Login'
import Signup from './Signup'


import { Container, Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Forms() {
  return (
    <div className="loginsignuppage">
      <div className="loginsignup">
        <Container className="container">
          <Tabs className="justify-content-center logintabs border-bottom-0">
            <Tab eventKey="login" title="Login" className="tabsfont">
              <Login />
            </Tab>
            <Tab eventKey="signup" title="Sign up" className="tabsfont">
              <Signup />
            </Tab>
          </Tabs>
        </Container>
      </div>
    </div>
  );
}
