import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const DEFAULT_LADDERSRESULTS = {
  data: [],
  limit: 0,
  total: 0,
  page: 1,
};

const slice = createSlice({
  name: "laddersResults",
  initialState: {
    loading: false,
    laddersResults: DEFAULT_LADDERSRESULTS,
    exporturl: "",
    error: "",
    deleted: null,
  },
  reducers: {
    getLaddersResults: (state, { payload }) => {
      state.loading = true;
    },
    getLaddersResultsSuccess: (state, { payload }) => {
      state.loading = false;
      state.laddersResults = {
        data: payload.ladderData?.data,
        page: parseInt(payload.ladderData?.currentPage),
        total: parseInt(payload.ladderData?.total),
      };
    },
    getLaddersResultsFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },

    deleteLaddersResult: (state, { payload }) => {
      state.loading = true;
    },
    deleteLaddersResultSuccess: (state, { payload }) => {
      state.loading = false;
      // state.deleted = payload.result;
      state.laddersResults.data = state.laddersResults.data.filter(
        (laddersResult) => !payload.resultId.includes(laddersResult._id)
      );
      NotificationManager.success("Deleted successfully");
    },
    deleteLaddersResultFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    submitResult: (state, { payload }) => {
      state.loading = true;
    },
    submitResultSuccess: (state, { payload }) => {
      state.loading = false;
      const idx = state.laddersResults.data.findIndex(
        (el) => el._id === payload.laddersData._id
      );
      if (idx >= 0) {
        state.laddersResults.data[idx] = payload.laddersData;
      }
      NotificationManager.success("Result updated successfully");
    },
    submitResultFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    exportData: (state) => {
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
  getLaddersResults,
  getLaddersResultsSuccess,
  getLaddersResultsFailed,
  deleteLaddersResult,
  deleteLaddersResultSuccess,
  deleteLaddersResultFailed,
  submitResult,
  submitResultSuccess,
  submitResultFailed,
  exportData,
  exportDataSuccess,
  exportDataFailed,
} = slice.actions;

export default slice.reducer;
