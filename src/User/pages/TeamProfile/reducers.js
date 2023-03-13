import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "userTeam",
  initialState: {
    loading: false,
    isDeleted: false,
    profile: null,
    tournaments: [],
    friends: [],
  },
  reducers: {
    getTeam: (state, { payload }) => {
      state.loading = true;
      state.isDeleted = false;
    },
    getTeamSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.teamData;
    },
    getTeamFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    updateTeam: (state, { payload }) => {
      state.loading = true;
    },
    updateTeamSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.teamData;
      NotificationManager.success("Updated successfully");
    },
    updateTeamFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    updateProfileBg: (state, { payload }) => {
      state.loading = true;
    },
    updateProfileBgSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.teamData;
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
      state.profile = payload.teamData;
      NotificationManager.success("Updated Successfully");
    },
    updateProfileImgFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    getCurrentTournaments: (state, { payload }) => {
      state.loading = true;
    },
    getCurrentTournamentsSuccess: (state, { payload }) => {
      state.loading = false;
      state.tournaments = payload.tournamentData;
    },
    getCurrentTournamentsFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    getPlayedTournaments: (state, { payload }) => {
      state.loading = true;
    },
    getPlayedTournamentsSuccess: (state, { payload }) => {
      state.loading = false;
      state.tournaments = payload.tournamentData;
    },
    getPlayedTournamentsFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    getFriends: (state, { payload }) => {
      state.loading = true;
    },
    getFriendsSuccess: (state, { payload }) => {
      state.loading = false;
      state.friends = payload.friendsList;
    },
    getFriendsFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    sendTeamInviteToFriend: (state, { payload }) => {
      state.loading = true;
    },
    sendTeamInviteToFriendSuccess: (state, { payload }) => {
      state.loading = false;
      state.friends = payload.friendsList;
      NotificationManager.success("Invitation sent successfully");
    },
    sendTeamInviteToFriendFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    kickoutMember: (state, { payload }) => {
      state.loading = true;
    },
    kickoutMemberSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.teamData;
      NotificationManager.success("Kicked out successfull");
    },
    kickoutMemberFailed: (state, { payload }) => {
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
  },
});

export const {
  getTeam,
  getTeamSuccess,
  getTeamFailed,
  updateTeam,
  updateTeamSuccess,
  updateTeamFailed,
  updateProfileBg,
  updateProfileBgSuccess,
  updateProfileBgFailed,
  updateProfileImg,
  updateProfileImgSuccess,
  updateProfileImgFailed,
  getCurrentTournaments,
  getCurrentTournamentsSuccess,
  getCurrentTournamentsFailed,
  getPlayedTournaments,
  getPlayedTournamentsSuccess,
  getPlayedTournamentsFailed,
  getFriends,
  getFriendsSuccess,
  getFriendsFailed,
  sendTeamInviteToFriend,
  sendTeamInviteToFriendSuccess,
  sendTeamInviteToFriendFailed,
  kickoutMember,
  kickoutMemberSuccess,
  kickoutMemberFailed,
  leaveTeam,
  leaveTeamSuccess,
  leaveTeamFailed,
  deleteTeam,
  deleteTeamSuccess,
  deleteTeamFailed,
} = slice.actions;

export default slice.reducer;
