import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const DEFAULT_TOTALWARLADDERSRESULTS = {
  data: [],
  limit: 0,
  total: 0,
  page: 0,
};

const slice = createSlice({
  name: "totalWarLaddersResults",
  initialState: {
    loading: false,
    totalWarLaddersResults: DEFAULT_TOTALWARLADDERSRESULTS,
    exporturl: "",
    error: "",
    deleted: null,
  },
  reducers: {
    getTotalWarLaddersResults: (state) => {
      state.loading = true;
    },
    getTotalWarLaddersResultsSuccess: (state, { payload }) => {
      state.loading = false;
      state.totalWarLaddersResults = {
        data: payload.totalWarLadderResultData?.data,
        page: parseInt(payload.totalWarLadderResultData.currentPage),
        total: parseInt(payload.totalWarLadderResultData.total),
      };
    },
    getTotalWarLaddersResultsFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },

    deleteResult: (state) => {
      state.loading = true;
    },
    deleteResultSuccess: (state, { payload }) => {
      state.loading = false;
      state.totalWarLaddersResults.data =
        state.totalWarLaddersResults.data.filter(
          (x) => !payload.resultId.includes(x._id)
        );
      NotificationManager.success("Deleted successfully");
    },
    deleteResultFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    submitResult: (state, { payload }) => {
      state.loading = true;
    },
    submitResultSuccess: (state, { payload }) => {
      state.loading = false;
      const idx = state.totalWarLaddersResults.data.findIndex(
        (el) => el._id === payload.totalWarLadderResultData._id
      );
      if (idx >= 0) {
        state.totalWarLaddersResults.data[idx] =
          payload.totalWarLadderResultData;
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
  getTotalWarLaddersResults,
  getTotalWarLaddersResultsSuccess,
  getTotalWarLaddersResultsFailed,
  deleteResult,
  deleteResultSuccess,
  deleteResultFailed,
  submitResult,
  submitResultSuccess,
  submitResultFailed,
  exportData,
  exportDataSuccess,
  exportDataFailed,
} = slice.actions;

export default slice.reducer;
