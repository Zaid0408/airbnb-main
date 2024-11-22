import { Modal } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import Background from "../utils/Images/Background.svg";
import { Close } from "@mui/icons-material";
import SignIn from "../componnents/SignIn";
import Signup from "../componnents/Signup";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8)),
    url(${Background});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 50%;
  padding: 2px;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${({ theme }) => theme.secondary + 20};
  }
`;

const Text = styled.p`
  display: flex;
  gap: 12px;
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.secondary + 90};
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;
const TextButton = styled.div`
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;

const Authentication = ({openAuth,setOpenAuth}) => {
  const [login,setLogin]= useState(true);
  // login the current value of the state is to check whether user has logged in or not 
  // just basics implemented here for login no advance token stuff
  return (
    // Modal to make sure it covers the entire page
   <Modal open={openAuth} onClose={()=> setOpenAuth(false)}>
      <Container>
        {/* Close button  */}
        <CloseButton>
          <Close sx={{color: "white"}} onClick={()=> setOpenAuth(false)}></Close>
        </CloseButton>
      
        {login ? (
          <>
            <SignIn setOpenAuth={setOpenAuth}></SignIn>
            <Text>
              Don't have an account my guy? so shameless 
              <TextButton onClick={()=> setLogin(false)}>Sign Up</TextButton>
            </Text>
          </>
        ):(
          <>
            <Signup setOpenAuth={setOpenAuth}></Signup>
            <Text>
              Already have an account?
              <TextButton onClick={()=> setLogin(true)}>Sign In</TextButton>
            </Text>
          </>

        )}
      </Container>
   </Modal>
  );
};

export default Authentication;
