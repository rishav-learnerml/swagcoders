/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: () => null,
    removeRequest: (state: any, action) =>{
      return state?.filter((r: any) => r._id !== action.payload)},
  },
});

export const { addRequests, removeRequests, removeRequest } =
  requestsSlice.actions;

export default requestsSlice.reducer;
