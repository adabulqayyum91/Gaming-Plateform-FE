import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "userFranchiseTeam",
  initialState: {
    loading: false,
    isDeleted: false,
    profile: null,
    tournaments: [],
    friends: [],
  },
  reducers: {
    setIsDeleted: (state, { payload }) => {
      state.isDeleted = payload;
    },
    getFranchiseTeam: (state, { payload }) => {
      state.loading = true;
      state.isDeleted = false;
    },
    getFranchiseTeamSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.teamData;
    },
    getFranchiseTeamFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    sendFranchiseTeamInvite: (state, { payload }) => {
      state.loading = true;
    },
    sendFranchiseTeamInviteSuccess: (state, { payload }) => {
      state.loading = false;
      state.friends = payload.friendsList;
      NotificationManager.success("Invitation sent successfully");
    },
    sendFranchiseTeamInviteFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    kickoutFranchiseMember: (state, { payload }) => {
      state.loading = true;
    },
    kickoutFranchiseMemberSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.teamData;
      NotificationManager.success("Member removed successfully");
    },
    kickoutFranchiseMemberFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    leaveTeam: (state, { payload }) => {
      state.loading = true;
    },
    leaveTeamSuccess: (state, { payload }) => {
      state.loading = false;
      state.isDeleted = true;
      NotificationManager.success("Team Deleted successfully");
    },
    leaveTeamFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    deleteTeam: (state, { payload }) => {
      state.loading = true;
    },
    deleteTeamSuccess: (state, { payload }) => {
      state.loading = false;
      state.isDeleted = true;
      NotificationManager.success("Team Deleted successfully");
    },
    deleteTeamFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    updateTeamLeader: (state, { payload }) => {
      state.loading = true;
    },
    updateTeamLeaderSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.teamData;
      NotificationManager.success("Team leader updated successfully");
    },
    updateTeamLeaderFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    updateTeamRosterStats: (state, { payload }) => {
      state.loading = true;
    },
    updateTeamRosterStatsSuccess: (state, { payload }) => {
      state.loading = false;
      let ind = state.profile.rooster.findIndex(
        (x) => x._id == payload.memberData._id
      );
      state.profile.rooster.splice(ind, 1, payload.memberData);
      NotificationManager.success("Updated successfully");
    },
    updateTeamRosterStatsFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  setIsDeleted,
  getFranchiseTeam,
  getFranchiseTeamSuccess,
  sendFranchiseTeamInvite,
  sendFranchiseTeamInviteSuccess,
  sendFranchiseTeamInviteFailed,
  getFranchiseTeamFailed,
  kickoutFranchiseMember,
  kickoutFranchiseMemberSuccess,
  kickoutFranchiseMemberFailed,
  leaveTeam,
  leaveTeamSuccess,
  leaveTeamFailed,
  deleteTeam,
  deleteTeamSuccess,
  deleteTeamFailed,
  updateTeamLeader,
  updateTeamLeaderSuccess,
  updateTeamLeaderFailed,
  updateTeamRosterStats,
  updateTeamRosterStatsSuccess,
  updateTeamRosterStatsFailed,
} = slice.actions;

export default slice.reducer;
