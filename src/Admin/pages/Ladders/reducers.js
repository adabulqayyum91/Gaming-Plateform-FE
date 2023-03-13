import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const DEFAULT_LADDERS = {
  data: [],
  limit: 0,
  total: 0,
  page: 0,
};

const slice = createSlice({
  name: "ladders",
  initialState: {
    loading: false,
    created: false,
    submitting: false,
    ladders: DEFAULT_LADDERS,
    exporturl: "",
    error: "",
    deleted: null,
  },
  reducers: {
    getLadders: (state, { payload }) => {
      state.loading = true;
    },
    getLaddersSuccess: (state, { payload }) => {
      state.loading = false;
      state.ladders = {
        data: payload.ladderData?.data,
        page: parseInt(payload.ladderData.currentPage),
        total: parseInt(payload.ladderData.total),
      };
    },
    getLaddersFailed: (state, { payload }) => {},
    createLadder: (state, { payload }) => {
      state.loading = true;
      state.created = false;
      state.submitting = true;
    },
    createLadderSuccess: (state, { payload }) => {
      const ladder = { ...payload.result };
      state.loading = false;
      state.created = true;
      state.submitting = false;
      state.ladders.data.push(ladder);
      NotificationManager.success("Created successfully");
    },
    createLadderFailed: (state, { payload }) => {
      state.loading = false;
      state.created = true;
      state.submitting = false;
      NotificationManager.error(payload.message);
    },
    updateLadder: (state, { payload }) => {
      state.loading = false;
    },
    updateLadderSuccess: (state, { payload }) => {
      state.loading = true;
      const idx = state.ladders.data.findIndex(
        (el) => el._id === payload.ladderData._id
      );
      if (idx >= 0) {
        state.ladders.data[idx] = payload.ladderData;
      }
      NotificationManager.success("Updated successfully");
    },
    updateLadderFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    deleteLadder: (state, { payload }) => {
      state.loading = true;
    },
    deleteLadderSuccess: (state, { payload }) => {
      state.loading = false;
      state.ladders.data = state.ladders.data.filter(
        (ladder) => !payload.ladderId.includes(ladder._id)
      );
      NotificationManager.success("Deleted successfully");
    },
    deleteLadderFailed: (state, { payload }) => {
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
  getLadders,
  getLaddersSuccess,
  getLaddersFailed,
  createLadder,
  createLadderSuccess,
  createLadderFailed,
  deleteLadder,
  deleteLadderSuccess,
  deleteLadderFailed,
  updateLadder,
  updateLadderSuccess,
  updateLadderFailed,
  exportData,
  exportDataSuccess,
  exportDataFailed,
} = slice.actions;

export default slice.reducer;
