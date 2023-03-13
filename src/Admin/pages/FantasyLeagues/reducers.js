import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const DEFAULT_FL = {
  data: [],
  limit: 0,
  total: 0,
  page: 0,
};

const slice = createSlice({
  name: "adminFantasyLeagues",
  initialState: {
    loading: false,
    fantasyLeagues: DEFAULT_FL,
    exporturl: "",
    error: "",
  },
  reducers: {
    getFantasyLeagues: (state, { payload }) => {
      state.loading = true;
    },
    getFantasyLeaguesSuccess: (state, { payload }) => {
      state.loading = false;
      state.fantasyLeagues = {
        data: payload.flData?.data,
        page: parseInt(payload.flData.currentPage),
        total: parseInt(payload.flData.total),
      };
    },
    getFantasyLeaguesFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    createFantasyLeague: (state, { payload }) => {
      state.loading = true;
    },
    createFantasyLeagueSuccess: (state, { payload }) => {
      state.loading = false;
      const leags = [...state.fantasyLeagues.data, payload.flData];
      state.fantasyLeagues.data = leags;
    },
    createFantasyLeagueFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    updateFantasyLeague: (state, { payload }) => {
      state.loading = false;
    },
    updateFantasyLeagueSuccess: (state, { payload }) => {
      state.loading = true;
      const idx = state.fantasyLeagues.data.findIndex(
        (el) => el._id === payload.flData._id
      );
      if (idx >= 0) {
        state.fantasyLeagues.data[idx] = payload.flData;
      }
      NotificationManager.success("Updated successfully");
    },
    updateFantasyLeagueFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload?.message);
    },
    deleteFantasyLeague: (state) => {
      state.loading = true;
    },
    deleteFantasyLeagueSuccess: (state, { payload }) => {
      state.loading = false;
      state.fantasyLeagues.data = state.fantasyLeagues.data.filter(
        (league) => !payload.flId.includes(league._id)
      );
      NotificationManager.success("League Deleted Successfully");
    },
    deleteFantasyLeagueFailed: (state, { payload }) => {
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
  getFantasyLeagues,
  getFantasyLeaguesSuccess,
  getFantasyLeaguesFailed,
  createFantasyLeague,
  createFantasyLeagueSuccess,
  createFantasyLeagueFailed,
  deleteFantasyLeague,
  deleteFantasyLeagueSuccess,
  deleteFantasyLeagueFailed,
  updateFantasyLeague,
  updateFantasyLeagueSuccess,
  updateFantasyLeagueFailed,
  exportData,
  exportDataSuccess,
  exportDataFailed,
} = slice.actions;

export default slice.reducer;
