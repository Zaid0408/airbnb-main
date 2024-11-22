import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/lab";
import { CircularProgress, Rating, TextField } from "@mui/material";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { bookProperty,getPropertyDetails } from "../api";
import Button from "../componnents/Button";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  padding: 20px;
  height: 95vh;
  margin: 0 20px;
  background: ${({ theme }) => theme.bg};
  border-radius: 12px 12px 0 0;
  overflow-y: scroll;
`;

const Image = styled.img`
  width: 50%;
  border-radius: 6px;
  object-fit: cover;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc1 = styled.input`
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;
const Desc = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Span = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  text-decoration: line-through;
  margin-left: 8px;
`;

const Percent = styled.span`
  font-size: 16px;
  color: green;
  margin-left: 8px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const CheckInWrapper = styled.div`
  
border-radius: 33px;
  display: flex;
  flex-direction: column;
  align-items: start;
  flex: 1;
  
`;
const CheckOutWrapper = styled.div`
  border-radius: 33px;
  display: flex;
  flex-direction: column;
  align-items: start;
  flex: 1;
  
`;
const PropertyDetails = () => {
  const { id } = useParams(); // Extract propertyId from the route
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate,setEndDate]=useState(null);
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState({});
  const [error, setError] = useState("");

  const getPropertyDetailsById= async () =>{
    setLoading(true);
    await getPropertyDetails(id).then((res)=>{
      setProperty(res.data);
      setLoading(false);
    });
  };
  const BookProperty=async ()=>{
    setLoading(true);
    const token=localStorage.getItem("airbnb-app-token");
    await bookProperty(token,{propertyId:id})
      .then((res)=>{
        alert("Property Booked Successfully");
        console.log(res.data.message);
        setLoading(false);
      })
      .catch((err)=>{
        console.log(err.response.data.message);
      })
      .finally(()=>{
        setLoading(false);
        navigate("/");
      })
  }

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
    setStartDate(date);
    //validateDates(date,endDate);
  };
  const handleCheckOutDate =(e)=>{
    const date=e.target.value;
    setEndDate(date);
    validateDates(startDate,date);
  };

  useEffect(() => {
      getPropertyDetailsById();
  },[]);

  return (
    <>{loading ? <CircularProgress /> : 
      <Container>
      <Image src={property?.img} />
      <Right>
        <Title >{property?.title}</Title>
        <Desc>{property?.desc}</Desc>
        <Price>
          {property?.price?.org} Rs
          <Span>{property?.price?.mrp} Rs</Span>
          <Percent>{property?.price?.off}% Off</Percent>
        </Price>
        <RatingContainer>
          <Rating value={property?.rating} readOnly/>
          <span>({property?.rating})</span>
        </RatingContainer>
        <BookingContainer>
          <CheckInWrapper>
            <Title style={{font_size: "10px",font_weight: 500}}>Check In date</Title>
            <Desc1 
              placeholder="Check-In date" 
              type="date"
              renderInput={(params) => <TextField {...params} />}
              onChange={handleCheckInDate}
              >
            </Desc1>
          </CheckInWrapper>
          <CheckOutWrapper>
            <Title>Check Out date</Title>
            <Desc1 
              placeholder="End date" 
              type="date" 
              renderInput={(params) => <TextField {...params} />}
              onChange={handleCheckOutDate}
              error={!!error}></Desc1>
          </CheckOutWrapper>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button
            text="Book Now"
            variant="contained"
            color="secondary"
            onClick={BookProperty}></Button>
        </BookingContainer>
      </Right>
    </Container>
    }</>
    
  );
};

export default PropertyDetails;
