import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const DEFAULT_USERS = {
  data: [],
  limit: 0,
  total: 0,
  page: 0,
};

const slice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    created: false,
    submitting: false,
    users: DEFAULT_USERS,
    exporturl: "",
    error: "",
    formObject: null,
  },
  reducers: {
    getUsers: (state) => {
      state.loading = true;
    },
    getUsersSuccess: (state, { payload }) => {
      state.loading = false;
      state.users = {
        data: payload.userData?.data?.filter(
          (user) => user.isDeleted === false
        ),
        page: parseInt(payload.userData.currentPage),
        total: parseInt(payload.userData.total),
      };
    },
    getUsersFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    createUser: (state, { payload }) => {
      state.loading = true;
      state.created = false;
      state.submitting = true;
    },
    createUserSuccess: (state, { payload }) => {
      const user = { ...payload.result };
      state.loading = false;
      state.created = true;
      state.submitting = false;
      state.users.data.push(user);
      NotificationManager.success("Created successfully");
    },
    createUserFailed: (state, { payload }) => {
      state.loading = false;
      state.created = true;
      state.submitting = false;
      NotificationManager.error(payload.message);
    },
    updateUser: (state, { payload }) => {
      state.loading = false;
    },
    updateUserSuccess: (state, { payload }) => {
      state.loading = true;
      const idx = state.users.data.findIndex(
        (el) => el._id === payload.user._id
      );
      if (idx >= 0) {
        state.users.data[idx] = payload.user;
      }
      NotificationManager.success("Updated successfully");
    },
    updateUserFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    deleteUser: (state, { payload }) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.users.data = state.users.data.filter(
        (user) => !payload.users.includes(user.userDetail.email)
      );
      NotificationManager.success("Deleted successfully");
    },
    deleteUserFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    exportData: (state, { payload }) => {
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
  getUsers,
  getUsersSuccess,
  getUsersFailed,
  createUser,
  createUserSuccess,
  createUserFailed,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailed,
  updateUser,
  updateUserSuccess,
  updateUserFailed,
  exportData,
  exportDataSuccess,
  exportDataFailed,
} = slice.actions;

export default slice.reducer;
