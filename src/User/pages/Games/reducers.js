import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "userGames",
  initialState: {
    loading: false,
    games: [],
    error: "",
    profile: null,
  },
  reducers: {
    getGames: (state, { payload }) => {
      state.loading = true;
    },
    getGamesSuccess: (state, { payload }) => {
      state.loading = false;
      state.games = payload.gameData;
    },
    getGamesFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
  },
});

export const { getGames, getGamesSuccess, getGamesFailed } = slice.actions;

export default slice.reducer;
