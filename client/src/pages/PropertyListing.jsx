import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropertyCard from "../componnents/Cards/PropertyCard";
import { getAllCourses, getPropertyByFilter, getAllProperty } from "../api";
import { CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 20px 0;
  height: 95vh;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
    flex-direction: column;
    overflow-y: scroll;
  }
  background: ${({ theme }) => theme.bg};
  margin: 0 20px;
  border-radius: 12px 12px 0 0;
`;
const Property = styled.div`
  padding: 12px;
  overflow: hidden;
  height: fit-content;
  @media (min-width: 768px) {
    width: 100%;
    overflow-y: scroll;
    height: 100%;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  @media (max-width: 750px) {
    gap: 14px;
  }
`;

const PropertyListing = () => {
  const [loading,setLoading]=useState(false);
  const [properties, setProperties] = useState([]);
  // gets routed from navbar which passes no state 
  //or searchButton which passes states like location checkIn checkOut 
  // to handle both cases is why we have used ternary operator to set filter values
  const location=useLocation();
  const { location: loc = "", checkIn = null, checkOut = null } = location?.state || {};
  const filter = loc ? `location=${loc}` : ``;
  //const filter=``;
  const getProperties= async () => {
    setLoading(true);
    await getPropertyByFilter(filter).then((res)=>{ // api call getAllProperty which is imported from api
      setProperties(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getProperties();
  },[]);
  
  return (
    
    <Container>
      {loading ? (
        <CircularProgress />
      ):(
      <Property>
        <CardWrapper>
          {properties.map((property) => (
            <PropertyCard property={property} 
            key={property._id} />
          ))}
        </CardWrapper>
      </Property>
      )}
    </Container>
  );
};

export default PropertyListing;
