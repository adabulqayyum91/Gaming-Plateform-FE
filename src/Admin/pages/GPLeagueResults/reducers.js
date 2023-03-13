import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const DEFAULT_LEAGUESRESULTS = {
  data: [],
  limit: 0,
  total: 0,
  page: 1,
};

const slice = createSlice({
  name: "gpLeagueResults",
  initialState: {
    loading: false,
    leaguesResults: DEFAULT_LEAGUESRESULTS,
    error: "",
    deleted: null,
  },
  reducers: {
    getFranchiseLeaguesResults: (state) => {
      state.loading = true;
    },
    getFranchiseLeaguesResultsSuccess: (state, { payload }) => {
      state.loading = false;
      state.leaguesResults = {
        data: payload.leagueResultData?.data,
        page: parseInt(payload.leagueResultData.currentPage),
        total: parseInt(payload.leagueResultData.total),
      };
    },
    getFranchiseLeaguesResultsFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    deleteFranchiseLeaguesResult: (state) => {
      state.loading = true;
    },
    deleteFranchiseLeaguesResultSuccess: (state, { payload }) => {
      state.loading = false;
      state.leaguesResults.data = state.leaguesResults.data.filter(
        (x) => !payload.resultId.includes(x._id)
      );
      NotificationManager.success("Deleted successfully");
    },
    deleteFranchiseLeaguesResultFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    updateFranchiseLeaguesResult: (state) => {
      state.loading = true;
    },
    updateFranchiseLeaguesResultSuccess: (state, { payload }) => {
      state.loading = false;
      const idx = state.leaguesResults.data.findIndex(
        (el) => el._id === payload.leagueResultData._id
      );
      if (idx >= 0) {
        state.leaguesResults.data[idx] = payload.leagueResultData;
      }
      NotificationManager.success("Result submited successfully");
    },
    updateFranchiseLeaguesResultFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getFranchiseLeaguesResults,
  getFranchiseLeaguesResultsSuccess,
  getFranchiseLeaguesResultsFailed,
  deleteFranchiseLeaguesResult,
  deleteFranchiseLeaguesResultSuccess,
  deleteFranchiseLeaguesResultFailed,
  updateFranchiseLeaguesResult,
  updateFranchiseLeaguesResultSuccess,
  updateFranchiseLeaguesResultFailed,
} = slice.actions;

export default slice.reducer;
