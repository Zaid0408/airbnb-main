import { SearchRounded } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropertyListing from "./PropertyListing";

const Container = styled.div`
  padding: 50px 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
`;

const SearchContainer = styled.div`
  border-radius: 33px;
  cursor: pointer;
  background-color: #fff;
  display: flex;
  align-items: center;
  max-width: 800px;
  gap: 20px;
  font-size: 14px;
  padding: 14px;
  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;



const Title = styled.div`
  color: #000;
  font-weight: 500;
  width: fit-content;
`;

const Desc = styled.input`
  color: rgba(0, 0, 0, 0.7);
  font-weight: 400;
  margin-top: 14px;
  font-size: 16px;
  border: none;
  outline: none;
`;
const LocationWrapper = styled.div`
  margin-left: 20px;
  border-radius: 33px;
  display: flex;
  flex-direction: column;
  align-items: start;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const CheckInWrapper = styled.div`
  border-radius: 33px;
  display: flex;
  flex-direction: column;
  align-items: start;
  flex: 1;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const CheckOutWrapper = styled.div`
  
  border-radius: 33px;
  display: flex;
  flex-direction: column;
  align-items: start;
  flex: 1;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;
const GuestWrapper=styled.div`
  border-radius: 33px;
  display: flex;
  flex-direction: column;
  align-items: start;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const SearchWrapper = styled.div`
  border-radius: 33px;
  display: flex;
  gap: 1px;
`;

const SearchButton = styled.div`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  font-weight: 400;
  padding: 20px 22px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Home = () => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState("");


  const validateDates = (checkIn, checkOut) => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    // Check-In date must not be before today
    if (checkIn && checkIn < today) {
      setError("Check-In date cannot be in the past.");
      return false;
    }

    // Check-Out date must be after Check-In date
    if (checkOut && checkIn && checkOut <= checkIn) {
      setError("Check-Out date must be after Check-In date.");
      return false;
    }

    setError(""); // Clear errors if validation passes
    return true;
  };
  const handleCheckInDate =(e)=>{
    const date=e.target.value;
    setCheckIn(date);
    //validateDates(date,endDate);
  };
  const handleCheckOutDate =(e)=>{
    const date=e.target.value;
    setCheckOut(date);
    validateDates(checkIn,date);
  };
  const navigate = useNavigate();

  const handlesearch = () => {
    navigate("/properties",{
      state: {location,checkIn,checkOut},
    });
  };
  return (
    <Container>
      <SearchContainer>
        <LocationWrapper>
          <Title>Location</Title>
          <Desc 
            placeholder="Where are you going?" 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}></Desc>
        </LocationWrapper>
        <CheckInWrapper>
          <Title>Check In date</Title>
          <Desc 
            placeholder="Start date" 
            type="date"
            value={checkIn}
            onChange={handleCheckInDate}></Desc>
        </CheckInWrapper>
        <CheckOutWrapper>
          <Title>Check Out date</Title>
          <Desc 
            placeholder="End date" 
            type="date" 
            value={checkOut}
            onChange={handleCheckOutDate}></Desc>
        </CheckOutWrapper>
        <GuestWrapper>
          <Title> Add Guests</Title>
          <Desc placeholder="Add guests" type="text"></Desc>
        </GuestWrapper>
        <SearchWrapper>
          <SearchButton onClick={handlesearch}>
            <SearchRounded sx={{ fontSize: 25, color: "inherit" }}/>
          </SearchButton>
        </SearchWrapper>
      </SearchContainer>
    </Container>
    
    );
};

export default Home;
