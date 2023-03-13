import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const DEFAULT_GAMES = {
  data: [],
  limit: 0,
  total: 0,
  page: 0,
};

const slice = createSlice({
  name: "games",
  initialState: {
    loading: false,
    created: false,
    submitting: false,
    games: DEFAULT_GAMES,
    userSideGames: [],
    error: "",
    deleted: null,
  },
  reducers: {
    getGames: (state, { payload }) => {
      state.loading = true;
    },
    getGamesSuccess: (state, { payload }) => {
      state.loading = false;
      state.games = {
        data: payload.allGame?.data,
        page: parseInt(payload.allGame?.currentPage),
        total: parseInt(payload.allGame?.total),
      };
    },
    getGamesFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    getUserSideGames: (state) => {
      state.loading = true;
    },
    getUserSideGamesSuccess: (state, { payload }) => {
      state.loading = false;
      state.userSideGames = payload.allGames;
    },
    getUserSideGamesFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    createGame: (state, { payload }) => {
      state.loading = true;
      state.created = false;
      state.submitting = true;
    },
    createGameSuccess: (state, { payload }) => {
      const game = { ...payload.gameDetail };
      state.loading = false;
      state.created = true;
      state.submitting = false;
      state.games.data.push(game);
      NotificationManager.success("Created successfully");
    },
    createGameFailed: (state, { payload }) => {
      state.loading = false;
      state.created = true;
      state.submitting = false;
      NotificationManager.error(payload.message);
    },
    updateGame: (state, { payload }) => {
      state.loading = false;
    },
    updateGameSuccess: (state, { payload }) => {
      state.loading = true;
      const idx = state.games.data.findIndex(
        (el) => el._id === payload.gameDetail._id
      );
      if (idx >= 0) {
        state.games.data[idx] = payload.gameDetail;
      }
      NotificationManager.success("Updated successfully");
    },
    updateGameFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    deleteGame: (state, { payload }) => {
      state.loading = true;
    },
    deleteGameSuccess: (state, { payload }) => {
      state.loading = false;
      state.games.data = state.games.data.filter(
        (game) => !payload.ids.includes(game._id)
      );
      NotificationManager.success("Deleted successfully");
    },
    deleteGameFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getGames,
  getGamesSuccess,
  getGamesFailed,
  getUserSideGames,
  getUserSideGamesSuccess,
  getUserSideGamesFailed,
  createGame,
  createGameSuccess,
  createGameFailed,
  deleteGame,
  deleteGameSuccess,
  deleteGameFailed,
  updateGame,
  updateGameSuccess,
  updateGameFailed,
} = slice.actions;

export default slice.reducer;
