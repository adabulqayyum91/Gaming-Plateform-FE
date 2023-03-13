import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "userInvites",
  initialState: {
    loading: false,
    receivedRequests: [],
    sentRequests: [],
    error: "",
  },
  reducers: {
    getInvites: (state, { payload }) => {
      state.loading = true;
    },
    getInvitesSuccess: (state, { payload }) => {
      state.loading = false;
      state.receivedRequests = payload.receivedRequests;
      state.sentRequests = payload.sentRequests;
    },
    getInvitesFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    handleFriendReq: (state, { payload }) => {
      state.loading = true;
    },
    handleFriendReqSuccess: (state, { payload }) => {
      state.loading = false;
      state.receivedRequests = payload.receivedRequests;
      state.sentRequests = payload.sentRequests;
      NotificationManager.success("Request updated successfully");
    },
    handleFriendReqFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    handleTeamInviteReq: (state, { payload }) => {
      state.loading = true;
    },
    handleTeamInviteReqSuccess: (state, { payload }) => {
      state.loading = false;
      state.receivedRequests = payload.receivedRequests;
      state.sentRequests = payload.sentRequests;
      NotificationManager.success("Request updated successfully");
    },
    handleTeamInviteReqFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    handleFranchiseTeamInviteReq: (state, { payload }) => {
      state.loading = true;
    },
    handleFranchiseTeamInviteReqSuccess: (state, { payload }) => {
      state.loading = false;
      state.receivedRequests = payload.receivedRequests;
      state.sentRequests = payload.sentRequests;
      NotificationManager.success("Request updated successfully");
    },
    handleFranchiseTeamInviteReqFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    handleMatchInviteReq: (state, { payload }) => {
      state.loading = true;
    },
    handleMatchInviteReqSuccess: (state, { payload }) => {
      state.loading = false;
      state.receivedRequests = payload.receivedRequests;
      state.sentRequests = payload.sentRequests;
      NotificationManager.success("Request updated successfully");
    },
    handleMatchInviteReqFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    handleFLInvite: (state, { payload }) => {
      state.loading = true;
    },
    handleFLInviteSuccess: (state, { payload }) => {
      state.loading = false;
      state.receivedRequests = payload.receivedRequests;
      state.sentRequests = payload.sentRequests;
      NotificationManager.success("Request updated successfully");
    },
    handleFLInviteFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getInvites,
  getInvitesSuccess,
  getInvitesFailed,
  handleFriendReq,
  handleFriendReqSuccess,
  handleFriendReqFailed,
  handleTeamInviteReq,
  handleTeamInviteReqSuccess,
  handleTeamInviteReqFailed,
  handleFranchiseTeamInviteReq,
  handleFranchiseTeamInviteReqSuccess,
  handleFranchiseTeamInviteReqFailed,
  handleMatchInviteReq,
  handleMatchInviteReqSuccess,
  handleMatchInviteReqFailed,
  handleFLInvite,
  handleFLInviteSuccess,
  handleFLInviteFailed,
} = slice.actions;

export default slice.reducer;
