import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  isAuthenticated: !!cookies.get("jwt"), // check if the token is present in the cookie
  token: cookies.get("jwt") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { token } = action.payload;
      cookies.set("jwt", token, { path: "/" }); // set the token in the cookie
      state.isAuthenticated = true;
      state.token = token;
    },
    logoutSuccess(state) {
      cookies.remove("jwt", { path: "/" }); // remove the token from the cookie
      state.isAuthenticated = false;
      state.token = null;
    },
    updateToken(state, action) {
      const token = action.payload;
      state.token = token;
      cookies.set("jwt", token, { path: "/" });
    },
  },
});

export const { loginSuccess, logoutSuccess, updateToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
