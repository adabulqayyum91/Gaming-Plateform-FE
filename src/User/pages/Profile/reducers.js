import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "userProfile",
  initialState: {
    loading: false,
    error: "",
    profile: null,
  },
  reducers: {
    getUser: (state, { payload }) => {
      state.loading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.userData;
    },
    getUserFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    updateUser: (state, { payload }) => {
      state.loading = true;
    },
    updateUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.userData;
      NotificationManager.success("Updated successfully");
    },
    updateUserFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    updateProfileBg: (state, { payload }) => {
      state.loading = true;
    },
    updateProfileBgSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.userData;
      NotificationManager.success("Updated successfully");
    },
    updateProfileBgFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    updateProfileImg: (state, { payload }) => {
      state.loading = true;
    },
    updateProfileImgSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.userData;
      NotificationManager.success("Updated successfully");
    },
    updateProfileImgFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getUser,
  getUserSuccess,
  getUserFailed,
  updateUser,
  updateUserSuccess,
  updateUserFailed,
  updateProfileBg,
  updateProfileBgSuccess,
  updateProfileBgFailed,
  updateProfileImg,
  updateProfileImgSuccess,
  updateProfileImgFailed,
} = slice.actions;

export default slice.reducer;
