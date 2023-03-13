import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "userTeams",
  initialState: {
    loading: false,
    teams: [],
    error: "",
    profile: null,
  },
  reducers: {
    getTeams: (state, { payload }) => {
      state.loading = true;
    },
    getTeamsSuccess: (state, { payload }) => {
      state.loading = false;
      state.teams = payload.teams;
    },
    getTeamsFailed: (state, payload) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    createTeam: (state, { payload }) => {
      state.loading = true;
    },
    createTeamSuccess: (state, { payload }) => {
      state.loading = false;
      const teamsCopy = [...state.teams];
      teamsCopy.push(payload.teamData);
      state.teams = teamsCopy;
      NotificationManager.success("Created successfully");
    },
    createTeamFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getTeams,
  getTeamsSuccess,
  getTeamsFailed,
  createTeam,
  createTeamSuccess,
  createTeamFailed,
} = slice.actions;

export default slice.reducer;
