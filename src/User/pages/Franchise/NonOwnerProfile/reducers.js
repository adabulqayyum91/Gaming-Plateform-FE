import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "userNonOwnerFranchiseProfile",
  initialState: {
    loading: false,
    franchise: {},
    error: "",
  },
  reducers: {
    getFranchise: (state, { payload }) => {
      state.loading = true;
    },
    getFranchiseSuccess: (state, { payload }) => {
      state.loading = false;
      state.franchise = { ...payload.franchiseData };
    },
    getFranchiseFailed: (state, payload) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    sendTryoutReq: (state) => {
      state.loading = true;
    },
    sendTryoutReqSuccess: (state, { payload }) => {
      state.loading = false;
      state.franchise = { ...payload.franchiseData };
      NotificationManager.success("Request sent successfully");
    },
    sendTryoutReqFailed: (state, payload) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getFranchise,
  getFranchiseSuccess,
  getFranchiseFailed,
  sendTryoutReq,
  sendTryoutReqSuccess,
  sendTryoutReqFailed,
} = slice.actions;

export default slice.reducer;
