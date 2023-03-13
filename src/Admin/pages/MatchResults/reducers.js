import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const DEFAULT_MATCHESSRESULTS = {
  data: [],
  limit: 0,
  total: 0,
  page: 1,
};

const slice = createSlice({
  name: "matchesResults",
  initialState: {
    loading: false,
    matchesResults: DEFAULT_MATCHESSRESULTS,
    error: "",
    deleted: null,
  },
  reducers: {
    getMatchesResults: (state, { payload }) => {
      state.loading = true;
    },
    getMatchesResultsSuccess: (state, { payload }) => {
      state.loading = false;
      state.matchesResults = {
        data: payload.matchData?.data,
        page: parseInt(payload.matchData?.currentPage),
        total: parseInt(payload.matchData?.total),
      };
    },
    getMatchesResultsFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },

    deleteMatchesResult: (state, { payload }) => {
      state.loading = true;
    },
    deleteMatchesResultSuccess: (state, { payload }) => {
      state.loading = false;
      state.matchesResults.data = state.matchesResults.data.filter(
        (matchesResult) => !payload.resultId.includes(matchesResult._id)
      );
      NotificationManager.success("Deleted successfully");
    },
    deleteMatchesResultFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    submitResult: (state, { payload }) => {
      state.loading = true;
    },
    submitResultSuccess: (state, { payload }) => {
      state.loading = false;
      const idx = state.matchesResults.data.findIndex(
        (el) => el._id === payload.matchData._id
      );
      if (idx >= 0) {
        state.matchesResults.data[idx] = payload.matchData;
      }
      NotificationManager.success("Result updated successfully");
    },
    submitResultFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getMatchesResults,
  getMatchesResultsSuccess,
  getMatchesResultsFailed,
  deleteMatchesResult,
  deleteMatchesResultSuccess,
  deleteMatchesResultFailed,
  submitResult,
  submitResultSuccess,
  submitResultFailed,
} = slice.actions;

export default slice.reducer;
