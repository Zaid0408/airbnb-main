import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import { openSnackbar } from "../redux/reducers/snackbarSlice";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.secondary + 90};
`;
const TextButton = styled.div`
  width: 100%;
  text-align: end;
  color: ${({ theme }) => theme.secondary + 90};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  font-weight: 500;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const SignIn = ({ setOpenAuth }) => {
  const dispatch=useDispatch();
  const [buttonLoading,setButtonLoading]=useState(false);
  const [buttonDisabled,setButtonDisabled]=useState(false);

  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");

  const validateInputs = () =>{
    if(!email || !password){
      alert("Please fill all the fields");
      return false;
    }
    return true;
  };

  const handleSignIn= async () =>{
    
    if(validateInputs()){
      setButtonLoading(true);
      setButtonDisabled(true);
      console.log(email,password);
        await UserSignIn({email,password}).then((res) =>{
          console.log("Dispatching loginSuccess with:", res.data);
          dispatch(loginSuccess(res.data));
          setOpenAuth(false);
        }).catch((err)=>{
          alert(err.response.data.message);
        }).finally(()=>{
          setButtonDisabled(false);
          setButtonLoading(false);
        });
    }
  };
  return (
    <Container>
      <div>
        <Title>Welcome to AirBnb </Title>
        <Span>Please Login with your details</Span>
      </div>
      <div style={{display:"flex",gap:"20px", flexDirection:"column"}}>
        <TextInput label="Email Address" placeholder="Enter your Email Address" required
        handelChange={(e)=> setEmail(e.target.value)}></TextInput>
        <TextInput label="Password" placeholder="Enter your Password" password required
        handelChange={(e)=> setPassword(e.target.value)}></TextInput>
        <TextButton >Forgot Password?</TextButton>
        <Button text= "Sign In"
        isLoading={buttonLoading}
        isDisabled={buttonDisabled}
        
        onClick={()=> handleSignIn()}
        ></Button>
      </div>
      
    </Container>
  );
};

export default SignIn;
