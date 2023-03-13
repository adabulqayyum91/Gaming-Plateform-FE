import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const DEFAULT_TOURNAMENTSRESULTS = {
  data: [],
  limit: 0,
  total: 0,
  page: 1,
};

const slice = createSlice({
  name: "tournamentsResults",
  initialState: {
    loading: false,
    tournamentsResults: DEFAULT_TOURNAMENTSRESULTS,
    exporturl: "",
    error: "",
    deleted: null,
  },
  reducers: {
    getTournamentsResults: (state, { payload }) => {
      state.loading = true;
    },
    getTournamentsResultsSuccess: (state, { payload }) => {
      state.loading = false;
      state.tournamentsResults = {
        data: payload.tournamentData?.data,
        page: parseInt(payload.tournamentData?.currentPage),
        total: parseInt(payload.tournamentData?.total),
      };
    },
    getTournamentsResultsFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },

    deleteTournamentsResult: (state, { payload }) => {
      state.loading = true;
    },
    deleteTournamentsResultSuccess: (state, { payload }) => {
      state.loading = false;
      state.tournamentsResults.data = state.tournamentsResults.data.filter(
        (tournamentsResult) => !payload.resultId.includes(tournamentsResult._id)
      );
      NotificationManager.success("Deleted successfully");
    },
    deleteTournamentsResultFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    submitResult: (state, { payload }) => {
      state.loading = true;
    },
    submitResultSuccess: (state, { payload }) => {
      state.loading = false;
      const idx = state.tournamentsResults.data.findIndex(
        (el) => el._id === payload.tournamentsData._id
      );
      if (idx >= 0) {
        state.tournamentsResults.data[idx] = payload.tournamentsData;
      }
      NotificationManager.success("Result submited successfully");
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
  getTournamentsResults,
  getTournamentsResultsSuccess,
  getTournamentsResultsFailed,
  deleteTournamentsResult,
  deleteTournamentsResultSuccess,
  deleteTournamentsResultFailed,
  submitResult,
  submitResultSuccess,
  submitResultFailed,
  exportData,
  exportDataSuccess,
  exportDataFailed,
} = slice.actions;

export default slice.reducer;
