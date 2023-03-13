import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const DEFAULT_FRANCHISES_RESULTS = {
  data: [],
  limit: 0,
  total: 0,
  page: 0,
};

const slice = createSlice({
  name: "franchises",
  initialState: {
    loading: false,
    franchises: DEFAULT_FRANCHISES_RESULTS,
    exporturl: "",
    error: "",
    deleted: null,
  },
  reducers: {
    getFranchises: (state) => {
      state.loading = true;
    },
    getFranchisesSuccess: (state, { payload }) => {
      state.loading = false;
      state.franchises = {
        data: payload.franchiseData?.data,
        page: parseInt(payload.franchiseData.currentPage),
        total: parseInt(payload.franchiseData.total),
      };
    },
    getFranchisesFailed: (state, { payload }) => {
      console.log(payload);
      NotificationManager.error(payload.message);
    },
    franchiseApprovalAndBlock: (state, { payload }) => {
      state.loading = true;
    },
    franchiseApprovalAndBlockSuccess: (state, { payload }) => {
      state.loading = false;
      const idx = state.franchises?.data?.findIndex(
        (el) => el._id === payload.franchiseData._id
      );
      if (idx >= 0) {
        state.franchises.data[idx] = payload.franchiseData;
      }
      NotificationManager.success("Request successfull");
    },
    franchiseApprovalAndBlockFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    exportData: (state) => {
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
  getFranchises,
  getFranchisesSuccess,
  getFranchisesFailed,
  franchiseApprovalAndBlock,
  franchiseApprovalAndBlockSuccess,
  franchiseApprovalAndBlockFailed,
  exportData,
  exportDataSuccess,
  exportDataFailed,
} = slice.actions;

export default slice.reducer;
