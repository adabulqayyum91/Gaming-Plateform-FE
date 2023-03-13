import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "userFranchiseProfile",
  initialState: {
    loading: false,
    franchise: {},
    franchises: [],
    error: "",
  },
  reducers: {
    getFranchise: (state, { payload }) => {
      state.loading = true;
    },
    getFranchiseSuccess: (state, { payload }) => {
      state.loading = false;
      state.franchise = { ...payload.franchiseData };
    },
    getFranchiseFailed: (state, payload) => {
      state.loading = false;
      NotificationManager.error(payload?.payload?.message);
    },
    getFranchises: (state, { payload }) => {
      state.loading = true;
    },
    getFranchisesSuccess: (state, { payload }) => {
      state.loading = false;
      state.franchises = [...payload.franchiseData];
    },
    getFranchisesFailed: (state, payload) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    createFranchise: (state, { payload }) => {
      state.loading = true;
    },
    createFranchiseSuccess: (state, { payload }) => {
      state.loading = false;
      state.franchise = { ...payload.franchiseData };
      NotificationManager.success(
        "Your request for franchise submitted successfully"
      );
    },
    createFranchiseFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    createFranchiseTeam: (state, { payload }) => {
      state.loading = true;
    },
    createFranchiseTeamSuccess: (state, { payload }) => {
      state.loading = false;
      state.franchise = payload.franchiseData;
      NotificationManager.success("Team created successfully");
    },
    createFranchiseTeamFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    removeFranchiseTeam: (state, { payload }) => {
      state.loading = true;
    },
    removeFranchiseTeamSuccess: (state, { payload }) => {
      state.loading = false;
      let teams = [...state.franchise["franchiseTeams"]];
      teams = teams.filter((x) => x._id !== payload.teamData._id);
      state.franchise[franchiseTeams] = teams;
      NotificationManager.success("Team removed successfully");
    },
    removeFranchiseTeamFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    updateFranchiseAbout: (state, { payload }) => {
      state.loading = true;
    },
    updateFranchiseAboutSuccess: (state, { payload }) => {
      state.loading = false;
      state.franchise = payload.franchiseData;
    },
    updateFranchiseAboutFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getFranchise,
  getFranchiseSuccess,
  getFranchiseFailed,
  createFranchise,
  createFranchiseSuccess,
  createFranchiseFailed,
  createFranchiseTeam,
  createFranchiseTeamSuccess,
  createFranchiseTeamFailed,
  getFranchises,
  getFranchisesSuccess,
  getFranchisesFailed,
  updateFranchiseAbout,
  updateFranchiseAboutSuccess,
  updateFranchiseAboutFailed,

  removeFranchiseTeam,
  removeFranchiseTeamSuccess,
  removeFranchiseTeamFailed,
} = slice.actions;

export default slice.reducer;
