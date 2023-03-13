import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "userLadderProfile",
  initialState: {
    loading: false,
    ladder: {},
    error: "",
    teams: [],
    totalWarLadders: {
      matches: [],
      matchResults: [],
      resultSubmit: false,
    },
    profile: null,
  },
  reducers: {
    getLadder: (state) => {
      state.loading = true;
    },
    getLadderSuccess: (state, { payload }) => {
      state.loading = false;
      state.ladder = payload.ladderData;
    },
    getLadderFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getTeams: (state) => {
      state.loading = true;
    },
    getTeamsSuccess: (state, { payload }) => {
      state.loading = false;
      state.teams = payload.teams;
    },
    getTeamsFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    joinLadder: (state) => {
      state.loading = true;
    },
    joinLadderSuccess: (state, { payload }) => {
      state.loading = false;
      let ladderCpy = { ...state.ladder };
      ladderCpy = payload.ladderData;
      state.ladder = ladderCpy;
      NotificationManager.success("Joined Successfully");
    },
    joinLadderFailed: (state, { payload }) => {
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
    getTotalWarLadder: (state) => {
      state.loading = true;
    },
    getTotalWarLadderSuccess: (state, { payload }) => {
      state.loading = false;
      state.totalWarLadders = {
        matches: payload.totalWarLadderData.matches,
        matchResults: payload.totalWarLadderData.matchResults,
        resultSubmit: payload.totalWarLadderData.resultSubmit,
      };
    },
    getTotalWarLadderFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    addTotalWarLadderResult: (state) => {
      state.loading = true;
    },
    addTotalWarLadderResultSuccess: (state, { payload }) => {
      state.loading = false;
      state.totalWarLadders = {
        matches: payload.totalWarLadderData.matches,
        matchResults: payload.totalWarLadderData.matchResults,
        resultSubmit: payload.totalWarLadderData.resultSubmit,
      };
      NotificationManager.success("Result Added Successfully");
    },
    addTotalWarLadderResultFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getLadder,
  getLadderSuccess,
  getLadderFailed,
  getTeams,
  getTeamsSuccess,
  getTeamsFailed,
  joinLadder,
  joinLadderSuccess,
  joinLadderFailed,
  addResult,
  addResultSuccess,
  addResultFailed,
  getTotalWarLadder,
  getTotalWarLadderSuccess,
  getTotalWarLadderFailed,
  addTotalWarLadderResult,
  addTotalWarLadderResultSuccess,
  addTotalWarLadderResultFailed,
} = slice.actions;

export default slice.reducer;
