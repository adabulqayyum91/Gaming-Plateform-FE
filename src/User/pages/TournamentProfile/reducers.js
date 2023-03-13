import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "userTournamentProfile",
  initialState: {
    loading: false,
    tournament: {},
    error: "",
    teams: [],
    profile: null,
  },
  reducers: {
    getTournament: (state, { payload }) => {
      state.loading = true;
    },
    getTournamentSuccess: (state, { payload }) => {
      state.loading = false;
      state.tournament = payload.tournamentData;
    },
    getTournamentFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getTeams: (state, { payload }) => {
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
    joinTournament: (state, { payload }) => {
      state.loading = true;
    },
    joinTournamentSuccess: (state, { payload }) => {
      state.loading = false;
      state.tournament = payload.tournamentData;
      NotificationManager.success("Joined Successfully");
    },
    joinTournamentFailed: (state, { payload }) => {
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
      if (JSON.stringify(payload) === "SERVER_ERROR") {
        NotificationManager.error("SERVER_ERROR - This image .ext not allowed");
      } else {
        NotificationManager.error(payload.message);
      }
    },
  },
});

export const {
  getTournament,
  getTournamentSuccess,
  getTournamentFailed,
  getTeams,
  getTeamsSuccess,
  getTeamsFailed,
  joinTournament,
  joinTournamentSuccess,
  joinTournamentFailed,
  addResult,
  addResultSuccess,
  addResultFailed,
} = slice.actions;

export default slice.reducer;
