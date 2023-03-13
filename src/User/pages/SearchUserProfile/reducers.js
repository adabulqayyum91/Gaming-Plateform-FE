import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "userHeader",
  initialState: {
    loading: false,
    error: "",
    profile: null,
  },
  reducers: {
    getUser: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.userData;
    },
    getUserFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    sendFriendReq: (state, { payload }) => {
      state.loading = true;
    },
    sendFriendReqSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.userData;
      NotificationManager.success("Friend request sent successfully");
    },
    sendFriendReqFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    deleteFriendReq: (state, { payload }) => {
      state.loading = true;
    },
    deleteFriendReqSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.userData;
      NotificationManager.success("Friend request cancelled successfully");
    },
    deleteFriendReqFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getUser,
  getUserSuccess,
  getUserFailed,
  sendFriendReq,
  sendFriendReqSuccess,
  sendFriendReqFailed,
  deleteFriendReq,
  deleteFriendReqSuccess,
  deleteFriendReqFailed,
} = slice.actions;

export default slice.reducer;
