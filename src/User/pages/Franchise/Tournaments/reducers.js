import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const DEFAULT_TOURNAMENTSRESULTS = {
  data: [],
  limit: 0,
  total: 0,
  page: 0,
};

const slice = createSlice({
  name: "userFranchiseTournaments",
  initialState: {
    loading: false,
    tournaments: [],
    tournamentResults: DEFAULT_TOURNAMENTSRESULTS,
    games: [],
    error: "",
    tournamentId: "",
  },
  reducers: {
    setTournamentId: (state, { payload }) => {
      state.tournamentId = payload;
    },
    createFranchiseTournament: (state, { payload }) => {
      state.loading = true;
    },
    createFranchiseTournamentSuccess: (state, { payload }) => {
      state.loading = false;
      const tours = [...state.tournaments, payload.tournament];
      state.tournaments = tours;
    },
    createFranchiseTournamentFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getFranchiseTournaments: (state) => {
      state.loading = true;
    },
    getFranchiseTournamentsSuccess: (state, { payload }) => {
      state.loading = false;
      state.tournaments = payload.tournamentData;
    },
    getFranchiseTournamentsFailed: (state, { payload }) => {
      state.loading = false;
      console.log("payload", JSON.stringify(payload));
      NotificationManager.error(payload.message);
    },
    getFranchiseTournamentResults: (state, { payload }) => {
      state.loading = true;
    },
    getFranchiseTournamentResultsSuccess: (state, { payload }) => {
      state.loading = false;
      state.tournamentResults = {
        data: payload.tournamentsData?.data,
        page: parseInt(payload.tournamentsData.currentPage),
        total: parseInt(payload.tournamentsData.total),
      };
    },
    getFranchiseTournamentResultsFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    deleteFranchiseTournamentsResult: (state, { payload }) => {
      state.loading = true;
    },
    deleteFranchiseTournamentsResultSuccess: (state, { payload }) => {
      state.loading = false;
      state.tournamentResults.data = state.tournamentResults.data.filter(
        (x) => !payload.resultId.includes(x._id)
      );
      NotificationManager.success("Deleted successfully");
    },
    deleteFranchiseTournamentsResultFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    updateFranchiseTournamentResult: (state, { payload }) => {
      state.loading = true;
    },
    updateFranchiseTournamentResultSuccess: (state, { payload }) => {
      state.loading = false;
      const idx = state.tournamentResults.data.findIndex(
        (el) => el._id === payload.tournamentData._id
      );
      if (idx >= 0) {
        state.tournamentResults.data[idx] = payload.tournamentData;
      }
      NotificationManager.success("Result submited successfully");
    },
    updateFranchiseTournamentResultFailed: (state, { payload }) => {
      NotificationManager.error(
        payload.message ? payload.message : "Something went wrong"
      );
    },
    getFranchiseGames: (state, { payload }) => {
      state.loading = true;
    },
    getFranchiseGamesSuccess: (state, { payload }) => {
      state.loading = false;
      state.games = payload?.gameData;
    },
    getFranchiseGamesFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  setTournamentId,
  getFranchiseTournaments,
  getFranchiseTournamentsSuccess,
  getFranchiseTournamentsFailed,
  createFranchiseTournament,
  createFranchiseTournamentSuccess,
  createFranchiseTournamentFailed,
  deleteFranchiseTournamentsResult,
  deleteFranchiseTournamentsResultSuccess,
  deleteFranchiseTournamentsResultFailed,
  updateFranchiseTournamentResult,
  updateFranchiseTournamentResultSuccess,
  updateFranchiseTournamentResultFailed,
  getFranchiseTournamentResults,
  getFranchiseTournamentResultsSuccess,
  getFranchiseTournamentResultsFailed,
  getFranchiseGames,
  getFranchiseGamesSuccess,
  getFranchiseGamesFailed,
} = slice.actions;

export default slice.reducer;
