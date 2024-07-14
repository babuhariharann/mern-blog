import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: false,
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    singinStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    singinSuccess: (state, action) => {
      console.log('reduxsuccessaction ', action.payload)
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    singinFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload
    },
    signoutSuccess: (state, action) => {
      state.currentUser = null;
      state.error = null;
      state.loading = null
    }
  },
});

export const { singinStart, singinSuccess, singinFailure, updateStart, updateSuccess, updateFailure, signoutSuccess } = userSlice.actions;

export default userSlice.reducer;
