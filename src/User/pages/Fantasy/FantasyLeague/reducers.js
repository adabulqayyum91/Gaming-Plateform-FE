import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "userFantasyLeagues",
  initialState: {
    loading: false,
    fantasyLeaguesData: {
      myFantasyLeagues: [],
      joinedFantasyLeagues: [],
      esportsFantasyLeagues: [],
    },
    error: "",
  },
  reducers: {
    getFantasyLeagues: (state) => {
      state.loading = true;
    },
    getFantasyLeaguesSuccess: (state, { payload }) => {
      state.loading = false;
      state.fantasyLeaguesData = {
        myFantasyLeagues: [...payload.flData.privateFl],
        joinedFantasyLeagues: payload.flData.joinedFl,
        esportsFantasyLeagues: [...payload.flData.publicFl],
      };
    },
    getFantasyLeaguesFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    createFantasyLeague: (state) => {
      state.loading = true;
    },
    createFantasyLeagueSuccess: (state, { payload }) => {
      state.loading = false;
      state.fantasyLeaguesData.myFantasyLeagues.push(payload.flData);
      NotificationManager.success("Fantasy League created successfully");
    },
    createFantasyLeagueFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getFantasyLeagues,
  getFantasyLeaguesSuccess,
  getFantasyLeaguesFailed,
  createFantasyLeague,
  createFantasyLeagueSuccess,
  createFantasyLeagueFailed,
} = slice.actions;

export default slice.reducer;
