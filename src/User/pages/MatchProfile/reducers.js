import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "userMatchProfile",
  initialState: {
    loading: false,
    match: {},
    error: "",
  },
  reducers: {
    getMatch: (state, { payload }) => {
      state.loading = true;
    },
    getMatchSuccess: (state, { payload }) => {
      state.loading = false;
      state.match = payload.matchData;
    },
    getMatchFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    addResult: (state) => {
      state.loading = true;
    },
    addResultSuccess: (state) => {
      state.loading = false;
      NotificationManager.success("Result Added Successfully");
    },
    addResultFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getMatch,
  getMatchSuccess,
  getMatchFailed,
  addResult,
  addResultSuccess,
  addResultFailed,
} = slice.actions;

export default slice.reducer;
