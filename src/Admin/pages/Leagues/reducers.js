import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const DEFAULT_LADDERS = {
  data: [],
  limit: 0,
  total: 0,
  page: 0,
};

const slice = createSlice({
  name: "adminGrandPrixLeagues",
  initialState: {
    loading: false,
    leagues: DEFAULT_LADDERS,
    exporturl: "",
    error: "",
  },
  reducers: {
    getLeagues: (state, { payload }) => {
      state.loading = true;
    },
    getLeaguesSuccess: (state, { payload }) => {
      state.loading = false;
      state.leagues = {
        data: payload.leagueData?.data,
        page: parseInt(payload.leagueData.currentPage),
        total: parseInt(payload.leagueData.total),
      };
    },
    getLeaguesFailed: (state, { payload }) => {},
    createFranchiseLeague: (state, { payload }) => {
      state.loading = true;
    },
    createFranchiseLeagueSuccess: (state, { payload }) => {
      state.loading = false;
      const leags = [...state.leagues.data, payload.leagueData];
      state.leagues.data = leags;
    },
    createFranchiseLeagueFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    updateLeague: (state, { payload }) => {
      state.loading = false;
    },
    updateLeagueSuccess: (state, { payload }) => {
      state.loading = true;
      const idx = state.leagues.data.findIndex(
        (el) => el._id === payload.leagueData._id
      );
      if (idx >= 0) {
        state.leagues.data[idx] = payload.leagueData;
      }
      NotificationManager.success("Updated successfully");
    },
    updateLeagueFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    deleteFranchiseLeague: (state) => {
      state.loading = true;
    },
    deleteFranchiseLeagueSuccess: (state, { payload }) => {
      state.loading = false;
      state.leagues.data = state.leagues.data.filter(
        (league) => !payload.leagueId.includes(league._id)
      );
      NotificationManager.success("League Deleted Successfully");
    },
    deleteFranchiseLeagueFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    exportData: (state, { payload }) => {
      state.loading = true;
    },
    exportDataSuccess: (state, { payload }) => {
      state.loading = false;
      state.exporturl = payload.downloadPath;
      NotificationManager.success("Request successfull");
    },
    exportDataFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getLeagues,
  getLeaguesSuccess,
  getLeaguesFailed,
  createFranchiseLeague,
  createFranchiseLeagueSuccess,
  createFranchiseLeagueFailed,
  deleteFranchiseLeague,
  deleteFranchiseLeagueSuccess,
  deleteFranchiseLeagueFailed,
  updateLeague,
  updateLeagueSuccess,
  updateLeagueFailed,
  exportData,
  exportDataSuccess,
  exportDataFailed,
} = slice.actions;

export default slice.reducer;
