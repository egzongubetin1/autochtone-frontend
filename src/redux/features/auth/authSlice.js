import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_TOKEN_NAME } from "@/data/constants";

const initialState = {
  user: null,
  isAuthenticated: false,
  fetchStatus: "pending",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setFetchStatus: (state, action) => {
      state.fetchStatus = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setFetchStatus, logout } = authSlice.actions;

export default authSlice.reducer;
