import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const DEFAULT_LEAGUE_SCHEDULE_RESULTS = {
  data: [],
  limit: 0,
  total: 0,
  page: 1,
};

const slice = createSlice({
  name: "userFLProfile",
  initialState: {
    loading: false,
    error: "",
    profile: {},
    teamProfile: {
      teamData: [],
    },
    playersList: [],
    leagueScheduleData: DEFAULT_LEAGUE_SCHEDULE_RESULTS,
    leagueLeaderboardData: [],
    leagueStatsData: [],
    scheduleMatchProfData: {
      teamOne: {},
      teamTwo: {},
    },
  },
  reducers: {
    getFlProfile: (state, { payload }) => {
      state.loading = true;
    },
    getFlProfileSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.fantasyLeagueData;
    },
    getFlProfileFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    joinFL: (state, { payload }) => {
      state.loading = true;
    },
    joinFLSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.fantasyLeagueData;
      NotificationManager.success("League joined successfully");
    },
    joinFLFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    sendFlInvitation: (state, { payload }) => {
      state.loading = true;
    },
    sendFlInvitationSuccess: (state, { payload }) => {
      state.loading = false;
      NotificationManager.success("Invitation sent successfully");
    },
    sendFlInvitationFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getFantasyTeamProfile: (state, { payload }) => {
      state.loading = true;
    },
    getFantasyTeamProfileSuccess: (state, { payload }) => {
      state.loading = false;
      state.teamProfile = {
        teamData: payload.teamMemberData,
      };
    },
    getFantasyTeamProfileFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    editFantasyTeamProfile: (state, { payload }) => {
      state.loading = true;
    },
    editFantasyTeamProfileSuccess: (state, { payload }) => {
      state.loading = false;
      state.profile = payload.fantasyLeagueData;
      NotificationManager.success("Name updated successfully");
    },
    editFantasyTeamProfileFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getTeamPlayersList: (state, { payload }) => {
      state.loading = true;
    },
    getTeamPlayersListSuccess: (state, { payload }) => {
      state.loading = false;
      state.playersList = payload.playersData;
    },
    getTeamPlayersListFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getTeamPlayersList: (state, { payload }) => {
      state.loading = true;
    },
    getTeamPlayersListSuccess: (state, { payload }) => {
      state.loading = false;
      state.playersList = payload.playersData;
    },
    getTeamPlayersListFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    addPlayerToFL: (state, { payload }) => {
      state.loading = true;
    },
    addPlayerToFLSuccess: (state, { payload }) => {
      state.loading = false;
    },
    addPlayerToFLFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    updatePlayerToFL: (state, { payload }) => {
      state.loading = true;
    },
    updatePlayerToFLSuccess: (state, { payload }) => {
      state.loading = false;
    },
    updatePlayerToFLFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getFlSchedule: (state, { payload }) => {
      state.loading = true;
    },
    getFlScheduleSuccess: (state, { payload }) => {
      state.loading = false;
      state.leagueScheduleData.data = payload.leagueScheduleData;
    },
    getFlScheduleFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getFlLeaderboard: (state) => {
      state.loading = true;
    },
    getFlLeaderboardSuccess: (state, { payload }) => {
      state.loading = false;
      state.leagueLeaderboardData = payload.leaderboardData;
    },
    getFlLeaderboardFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getFlStats: (state) => {
      state.loading = true;
    },
    getFlStatsSuccess: (state, { payload }) => {
      state.loading = false;
      state.leagueStatsData = payload.flStatsData;
    },
    getFlStatsFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getScheduleMatchProfile: (state) => {
      state.loading = true;
    },
    getScheduleMatchProfileSuccess: (state, { payload }) => {
      state.loading = false;
      state.scheduleMatchProfData = {
        teamOne: payload.teamOne,
        teamTwo: payload.teamTwo,
      };
    },
    getScheduleMatchProfileFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  getFlProfile,
  getFlProfileSuccess,
  getFlProfileFailed,
  joinFL,
  joinFLSuccess,
  joinFLFailed,
  sendFlInvitation,
  sendFlInvitationSuccess,
  sendFlInvitationFailed,
  getFantasyTeamProfile,
  getFantasyTeamProfileSuccess,
  getFantasyTeamProfileFailed,
  editFantasyTeamProfile,
  editFantasyTeamProfileSuccess,
  editFantasyTeamProfileFailed,
  getTeamPlayersList,
  getTeamPlayersListSuccess,
  getTeamPlayersListFailed,
  addPlayerToFL,
  addPlayerToFLSuccess,
  addPlayerToFLFailed,
  updatePlayerToFL,
  updatePlayerToFLSuccess,
  updatePlayerToFLFailed,
  getFlSchedule,
  getFlScheduleSuccess,
  getFlScheduleFailed,
  getFlLeaderboard,
  getFlLeaderboardSuccess,
  getFlLeaderboardFailed,
  getFlStats,
  getFlStatsSuccess,
  getFlStatsFailed,
  getScheduleMatchProfile,
  getScheduleMatchProfileSuccess,
  getScheduleMatchProfileFailed,
} = slice.actions;

export default slice.reducer;
