import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
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

const Signup = (setOpenAuth) => {
  const dispatch=useDispatch();
  const [buttonLoading,setButtonLoading]=useState(false);
  const [buttonDisabled,setButtonDisabled]=useState(false);

  const [name,setName]= useState("");
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");

  const validateInputs = () =>{
    if(!email || !password || !name){
      alert("Please fill all the fields");
      return false;
    }
    return true;
  };

  const handleSignUp= async () =>{
    
    if(validateInputs()){
      setButtonLoading(true);
      setButtonDisabled(true);
        console.log(name,email,password);
        await UserSignUp({email,password,name}).then((res) =>{
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
        <Span>Please create a new account</Span>
      </div>
      <div style={{display:"flex",gap:"20px", flexDirection:"column"}}>
        <TextInput label="Name" placeholder="Enter your full Name"
        handelChange={(e)=> setName(e.target.value)}></TextInput>
        <TextInput label="Email Address" placeholder="Enter your Email Address"
        handelChange={(e)=> setEmail(e.target.value)}></TextInput>
        <TextInput label="Password" placeholder="Enter your Password" password
        handelChange={(e)=> setPassword(e.target.value)}></TextInput>
        <Button text= "Sign Up"
        isLoading={buttonLoading}
        isDisabled={buttonDisabled}
        
        onClick={()=> handleSignUp()}></Button>
      </div>
      
    </Container>
  );
};

export default Signup;
