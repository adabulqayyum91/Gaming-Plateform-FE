import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const DEFAULT_TOURNAMENTS = {
  data: [],
  limit: 0,
  total: 0,
  page: 0,
};

const slice = createSlice({
  name: "tournaments",
  initialState: {
    loading: false,
    created: false,
    submitting: false,
    tournaments: DEFAULT_TOURNAMENTS,
    exporturl: "",
    error: "",
    deleted: null,
  },
  reducers: {
    getTournaments: (state, { payload }) => {
      state.loading = true;
    },
    getTournamentsSuccess: (state, { payload }) => {
      state.loading = false;
      state.tournaments = {
        data: payload.tournamentData?.data,
        page: parseInt(payload.tournamentData.currentPage),
        total: parseInt(payload.tournamentData.total),
      };
    },
    getTournamentsFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    createTournament: (state, { payload }) => {
      state.loading = true;
      state.created = false;
      state.submitting = true;
    },
    createTournamentSuccess: (state, { payload }) => {
      const tournament = { ...payload.tournament };
      state.loading = false;
      state.created = true;
      state.submitting = false;
      state.tournaments.data.push(tournament);
      NotificationManager.success("Created successfully");
    },
    createTournamentFailed: (state, { payload }) => {
      state.loading = false;
      state.created = true;
      state.submitting = false;
      NotificationManager.error(payload.message);
    },
    updateTournament: (state, { payload }) => {
      state.loading = false;
    },
    updateTournamentSuccess: (state, { payload }) => {
      state.loading = true;
      const idx = state.tournaments.data.findIndex(
        (el) => el._id === payload.tournamentData._id
      );
      if (idx >= 0) {
        state.tournaments.data[idx] = payload.tournamentData;
      }
      NotificationManager.success("Updated successfully");
    },
    updateTournamentFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    deleteTournament: (state, { payload }) => {
      state.loading = true;
    },
    deleteTournamentSuccess: (state, { payload }) => {
      state.loading = false;
      // state.deleted = payload.result;
      state.tournaments.data = state.tournaments.data.filter(
        (tournament) => !payload.tournamentId.includes(tournament._id)
      );
      NotificationManager.success("Deleted successfully");
    },
    deleteTournamentFailed: (state, { payload }) => {
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
  getTournaments,
  getTournamentsSuccess,
  getTournamentsFailed,
  createTournament,
  createTournamentSuccess,
  createTournamentFailed,
  deleteTournament,
  deleteTournamentSuccess,
  deleteTournamentFailed,
  updateTournament,
  updateTournamentSuccess,
  updateTournamentFailed,
  exportData,
  exportDataSuccess,
  exportDataFailed,
} = slice.actions;

export default slice.reducer;
