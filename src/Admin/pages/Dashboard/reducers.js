import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "dashboard",
  initialState: {
    loading: false,
    stats: {
      totalUsers: 0,
      loggedinUsers: 0,
      totalGames: 0,
    },
    error: "",
  },
  reducers: {
    getStats: (state) => {
      state.loading = true;
    },
    getStatsSuccess: (state, { payload }) => {
      state.loading = false;
      state.stats = {
        totalUsers: payload.dashboardData.totalUsers,
        loggedinUsers: payload.dashboardData.loggedInUser,
        totalGames: payload.dashboardData.totalGames,
      };
    },
    getStatsFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
  },
});

export const { getStats, getStatsSuccess, getStatsFailed } = slice.actions;

export default slice.reducer;
