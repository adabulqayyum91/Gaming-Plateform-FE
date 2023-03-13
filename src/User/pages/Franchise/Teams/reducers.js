import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const DEFAULT_TRYOUTS = {
  data: [],
  limit: 0,
  total: 0,
  page: 0,
};

const slice = createSlice({
  name: "userFranchiseTeams",
  initialState: {
    loading: false,
    tryouts: DEFAULT_TRYOUTS,
    error: "",
  },
  reducers: {
    getFranchiseTryouts: (state) => {
      state.loading = true;
    },
    getFranchiseTryoutsSuccess: (state, { payload }) => {
      state.loading = false;
      state.tryouts = {
        data: payload.tryoutData?.data,
        page: parseInt(payload.tryoutData.currentPage),
        total: parseInt(payload.tryoutData.total),
      };
    },
    getFranchiseTryoutsFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    updateTryoutReq: (state) => {
      state.loading = true;
    },
    updateTryoutReqSuccess: (state, { payload }) => {
      state.loading = false;
      const idx = state.tryouts.data.findIndex(
        (el) => el._id === payload.tryoutData._id
      );
      if (idx >= 0) {
        state.tryouts.data[idx] = payload.tryoutData;
      }
      NotificationManager.success("Request updated successfully");
    },
    updateTryoutReqFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    addUserToFrancTeam: (state) => {
      state.loading = true;
    },
    addUserToFrancTeamSuccess: (state, { payload }) => {
      state.loading = false;
      const idx = state.tryouts.data.findIndex(
        (el) => el._id === payload.tryoutData._id
      );
      if (idx >= 0) {
        state.tryouts.data[idx] = payload.tryoutData;
      }
      NotificationManager.success("Added in team successfully");
    },
    addUserToFrancTeamFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getFranchiseTryouts,
  getFranchiseTryoutsSuccess,
  getFranchiseTryoutsFailed,
  updateTryoutReq,
  updateTryoutReqSuccess,
  updateTryoutReqFailed,
  addUserToFrancTeam,
  addUserToFrancTeamSuccess,
  addUserToFrancTeamFailed,
} = slice.actions;

export default slice.reducer;
