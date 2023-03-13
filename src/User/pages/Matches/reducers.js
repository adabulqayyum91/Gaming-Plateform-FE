import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "userMatches",
  initialState: {
    loading: false,
    matchesData: {
      matches: [],
      mytournaments: [],
      myladders: [],
    },
    error: "",
  },
  reducers: {
    getMatches: (state) => {
      state.loading = true;
    },
    getMatchesSuccess: (state, { payload }) => {
      state.loading = false;
      state.matchesData.matches = payload.matchData;
    },
    getMatchesFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    createMatche: (state) => {
      state.loading = true;
    },
    createMatcheSuccess: (state, { payload }) => {
      state.loading = false;
      state.matchesData.matches.push(payload.matchData);
      NotificationManager.success("Match created successfully");
    },
    createMatcheFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getMyTournaments: (state) => {
      state.loading = true;
    },
    getMyTournamentsSuccess: (state, { payload }) => {
      state.loading = false;
      state.matchesData.mytournaments = payload.tournamentData;
    },
    getMyTournamentsFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getMyLadders: (state) => {
      state.loading = true;
    },
    getMyLaddersSuccess: (state, { payload }) => {
      state.loading = false;
      state.matchesData.myladders = payload.ladderData;
    },
    getMyLaddersFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getMatches,
  getMatchesSuccess,
  getMatchesFailed,
  createMatche,
  createMatcheSuccess,
  createMatcheFailed,
  getMyTournaments,
  getMyTournamentsSuccess,
  getMyTournamentsFailed,
  getMyLadders,
  getMyLaddersSuccess,
  getMyLaddersFailed,
} = slice.actions;

export default slice.reducer;
