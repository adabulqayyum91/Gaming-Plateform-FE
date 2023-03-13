import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "franchiseTournamentProfile",
  initialState: {
    loading: false,
    tournament: {},
    isDeleted: false,
    error: "",
    teams: [],
  },
  reducers: {
    setIsDeleted: (state, { payload }) => {
      state.isDeleted = payload;
    },
    getFranchiseTournament: (state, { payload }) => {
      state.loading = true;
    },
    getFranchiseTournamentSuccess: (state, { payload }) => {
      state.loading = false;
      state.tournament = payload.tournamentData;
    },
    getFranchiseTournamentFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getTeams: (state, { payload }) => {
      state.loading = true;
    },
    getTeamsSuccess: (state, { payload }) => {
      state.loading = false;
      state.teams = payload.teamData;
    },
    getTeamsFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    joinTournament: (state) => {
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
      NotificationManager.error(payload.message);
    },
    deleteFranchiseTournament: (state) => {
      state.loading = true;
    },
    deleteFranchiseTournamentSuccess: (state) => {
      state.loading = false;
      state.isDeleted = true;
      NotificationManager.success("Tournament Deleted Successfully");
    },
    deleteFranchiseTournamentFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  setIsDeleted,
  getFranchiseTournament,
  getFranchiseTournamentSuccess,
  getFranchiseTournamentFailed,
  getTeams,
  getTeamsSuccess,
  getTeamsFailed,
  joinTournament,
  joinTournamentSuccess,
  joinTournamentFailed,
  addResult,
  addResultSuccess,
  addResultFailed,
  deleteFranchiseTournament,
  deleteFranchiseTournamentSuccess,
  deleteFranchiseTournamentFailed,
} = slice.actions;

export default slice.reducer;
