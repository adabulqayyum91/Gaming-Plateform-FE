import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "userFantasyTeamModal",
  initialState: {
    loading: false,
    error: "",
    profile: {},
    tradeMoveData: {
      playerData: [],
      playerList: [],
    },
    traveMoveRequests: {
      sentRequests: [],
      receivedRequests: [],
    },
    tradeMoveRequestDetail: {},
  },
  reducers: {
    resetAllState: (state) => {
      state.profile = {};
      state.tradeMoveData = {
        playerData: [],
        playerList: [],
      };
      state.traveMoveRequests = {
        sentRequests: [],
        receivedRequests: [],
      };
      state.tradeMoveRequestDetail = {};
    },
    getFlTeamProfile: (state, { payload }) => {
      state.loading = true;
    },
    getFlTeamProfileSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.teamData;
    },
    getFlTeamProfileFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    trademoveFlTeam: (state, { payload }) => {
      state.loading = true;
    },
    trademoveFlTeamSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.teamData;
      NotificationManager.success("Player waiver claim successful");
    },
    trademoveFlTeamFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    dropPlayerFlTeam: (state, { payload }) => {
      state.loading = true;
    },
    dropPlayerFlTeamSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.teamData;
      NotificationManager.success("Player droped successfully");
    },
    dropPlayerFlTeamFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getPlayerForTradePerposal: (state, { payload }) => {
      state.loading = true;
    },
    getPlayerForTradePerposalSuccess: (state, { payload }) => {
      state.loading = false;
      state.tradeMoveData = {
        playerData: payload.tradeMoveData.playerData,
        playerList: payload.tradeMoveData.playerList,
      };
    },
    getPlayerForTradePerposalFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    sendTradePerposal: (state) => {
      state.loading = true;
    },
    sendTradePerposalSuccess: (state) => {
      state.loading = false;
      NotificationManager.success("Proposal sent successfully");
    },
    sendTradePerposalFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getTradeMoveRequests: (state) => {
      state.loading = true;
    },
    getTradeMoveRequestsSuccess: (state, { payload }) => {
      state.loading = false;
      state.traveMoveRequests = {
        sentRequests: payload.sendRequests,
        receivedRequests: payload.receivedRequests,
      };
    },
    getTradeMoveRequestsFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getTradeMoveRequestsDetail: (state) => {
      state.loading = true;
    },
    getTradeMoveRequestsDetailSuccess: (state, { payload }) => {
      state.loading = false;
      state.tradeMoveRequestDetail = payload.tradeMoveDetailData;
    },
    getTradeMoveRequestsDetailFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getTradeMoveRequestUpdate: (state) => {
      state.loading = true;
    },
    getTradeMoveRequestUpdateSuccess: (state, { payload }) => {
      state.loading = false;
      state.tradeMoveRequestDetail = payload.tradeMoveDetailData;
      NotificationManager.success("Request status updated successfully");
    },
    getTradeMoveRequestUpdateFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  resetAllState,
  getFlTeamProfile,
  getFlTeamProfileSuccess,
  getFlTeamProfileFailed,
  trademoveFlTeam,
  trademoveFlTeamSuccess,
  trademoveFlTeamFailed,
  dropPlayerFlTeam,
  dropPlayerFlTeamSuccess,
  dropPlayerFlTeamFailed,
  getPlayerForTradePerposal,
  getPlayerForTradePerposalSuccess,
  getPlayerForTradePerposalFailed,
  sendTradePerposal,
  sendTradePerposalSuccess,
  sendTradePerposalFailed,
  getTradeMoveRequests,
  getTradeMoveRequestsSuccess,
  getTradeMoveRequestsFailed,
  getTradeMoveRequestsDetail,
  getTradeMoveRequestsDetailSuccess,
  getTradeMoveRequestsDetailFailed,
  getTradeMoveRequestUpdate,
  getTradeMoveRequestUpdateSuccess,
  getTradeMoveRequestUpdateFailed,
} = slice.actions;

export default slice.reducer;
