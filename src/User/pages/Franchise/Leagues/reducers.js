import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const DEFAULT_LEAGUESRESULTS = {
  data: [],
  limit: 0,
  total: 0,
  page: 0,
};

const slice = createSlice({
  name: "userFranchiseLeagues",
  initialState: {
    loading: false,
    leagues: [],
    leaguesResults: DEFAULT_LEAGUESRESULTS,
    error: "",
    leagueId: "",
  },
  reducers: {
    getFranchiseLeagues: (state, { payload }) => {
      state.loading = true;
    },
    setLeagueId: (state, { payload }) => {
      state.leagueId = payload;
    },
    getFranchiseLeaguesSuccess: (state, { payload }) => {
      state.loading = false;
      state.leagues = payload.leagueData;
    },
    getFranchiseLeaguesFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  setLeagueId,
  getFranchiseLeagues,
  getFranchiseLeaguesSuccess,
  getFranchiseLeaguesFailed,
} = slice.actions;

export default slice.reducer;
