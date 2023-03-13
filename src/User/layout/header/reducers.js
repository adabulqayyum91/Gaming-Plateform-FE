import { createSlice } from '@reduxjs/toolkit';
import { NotificationManager } from 'react-notifications';

const slice = createSlice({
  name: 'userHeader',
  initialState: {
    loading: false,
    error: '',
    users: [],
    headerText: 'Profile',
  },
  reducers: {
    setNavText: (state, { payload }) => {
      state.headerText = payload;
    },
    logout: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      NotificationManager.success('Logged out successfully');
    },
    logoutFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    getUsers: (state) => {
      state.loading = true;
    },
    getUsersSuccess: (state, { payload }) => {
      state.loading = false;
      state.users = payload.searchData;
    },
    getUsersFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getUsers,
  getUsersSuccess,
  getUsersFailed,
  setNavText,
  logout,
  logoutSuccess,
  logoutFailed,
} = slice.actions;

export default slice.reducer;
