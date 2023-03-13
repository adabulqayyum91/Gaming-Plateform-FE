import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "userGameProfile",
  initialState: {
    loading: false,
    game: {},
    tournaments: [],
    ladders: [],
    publicMatches: [],
    error: "",
    profile: null,
  },
  reducers: {
    getGame: (state, { payload }) => {
      state.loading = true;
    },
    getGameSuccess: (state, { payload }) => {
      state.loading = false;
      state.game = payload.gameData;
    },
    getGameFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getTournaments: (state, { payload }) => {
      state.loading = true;
    },
    getTournamentsSuccess: (state, { payload }) => {
      state.loading = false;
      state.tournaments = payload.tournamentData;
    },
    getTournamentsFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getLadders: (state, { payload }) => {
      state.loading = true;
    },
    getLaddersSuccess: (state, { payload }) => {
      state.loading = false;
      state.ladders = payload.ladderData;
    },
    getLaddersFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getPublicMatches: (state) => {
      state.loading = true;
    },
    getPublicMatchesSuccess: (state, { payload }) => {
      state.loading = false;
      state.publicMatches = payload.matchData;
    },
    getPublicMatchesFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    sendPublicMatchInvite: (state) => {
      state.loading = true;
    },
    sendPublicMatchInviteSuccess: (state, { payload }) => {
      state.loading = false;
      state.publicMatches = payload.matchData;
      NotificationManager.success("Match added to your My Matches");
    },
    sendPublicMatchInviteFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getGame,
  getGameSuccess,
  getGameFailed,
  getTournaments,
  getTournamentsSuccess,
  getTournamentsFailed,
  getLadders,
  getLaddersSuccess,
  getLaddersFailed,
  getPublicMatches,
  getPublicMatchesSuccess,
  getPublicMatchesFailed,
  sendPublicMatchInvite,
  sendPublicMatchInviteSuccess,
  sendPublicMatchInviteFailed,
} = slice.actions;

export default slice.reducer;
