import axios from "axios";

const API=axios.create({
    baseURL:"http://localhost:8080/api/"
});

export const UserSignUp= async (data) => await API.post("/user/signup",data);
export const UserSignIn= async (data) => await API.post("/user/signin",data);

export const getAllProperties= async () => await API.get("/property/getAllProperties");
export const getPropertyByFilter= async (filter) => await API.get(`/property/getProperty?${filter}`);
export const getPropertyDetails= async (id) => await API.get(`/property/getPropertyDetails/${id}`);
export const getFavourite= async (token) => 
    await API.get(`/user/getUserFavourites/`,{
    headers:{ Authorization: `Bearer ${token}` },
});

export const addToFavourite= async (token,data) => 
    await API.post(`/user/addToFavourites/`, data,{
    headers:{ Authorization: `Bearer ${token}` },
});


export const deleteFromFavourite= async (token,data) => 
    await API.post(`/user/removeFromFavourites/`, data,{
    headers:{ Authorization: `Bearer ${token}` },
});

export const bookProperty= async (token,data) => 
    await API.post(`/user/bookProperty/`, data,{
    headers:{ Authorization: `Bearer ${token}` },
});
export const getBookedProperty= async (token) => 
    await API.get(`/user/getBooking/`,{
    headers:{ Authorization: `Bearer ${token}` },
});
