import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.currentUser = action.payload.user;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      localStorage.setItem("airbnb-app-token", action.payload.tokenJwt);
      //console.log("Token in localStorage:", localStorage.getItem("airbnb-app-token"));
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("airbnb-app-token");
    },
  },
});

export const { updateUser, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;