import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

const DEFAULT_LEAGUE_SCHEDULE_RESULTS = {
  data: [],
  limit: 0,
  total: 0,
  page: 1,
};

const slice = createSlice({
  name: "userFranchiseLeagueProfile",
  initialState: {
    loading: false,
    league: {},
    error: "",
    teams: [],
    leagueScheduleData: DEFAULT_LEAGUE_SCHEDULE_RESULTS,
    leagueStandings: [],
    leagueStats: [],
    isDeleted: false,
  },
  reducers: {
    setIsDeleted: (state, { payload }) => {
      state.isDeleted = payload;
    },
    getFranchiseLeague: (state) => {
      state.loading = true;
    },
    getFranchiseLeagueSuccess: (state, { payload }) => {
      state.loading = false;
      state.league = payload.leagueData;
    },
    getFranchiseLeagueFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getTeams: (state) => {
      state.loading = true;
    },
    getTeamsSuccess: (state, { payload }) => {
      state.loading = false;
      state.teams = payload.teamData;
    },
    getTeamsFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    joinLeague: (state) => {
      state.loading = true;
    },
    joinLeagueSuccess: (state, { payload }) => {
      state.loading = false;
      let leagueCpy = { ...state.league };
      leagueCpy = payload.leagueData;
      state.league = leagueCpy;
      NotificationManager.success("Joined Successfully");
    },
    joinLeagueFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    addResult: (state) => {
      state.loading = true;
    },
    addResultSuccess: (state) => {
      state.loading = false;
      NotificationManager.success("Result Added Successfully");
    },
    addResultFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },

    getFranchiseLeagueSchedule: (state) => {
      state.loading = true;
    },
    getFranchiseLeagueScheduleSuccess: (state, { payload }) => {
      state.loading = false;
      state.leagueScheduleData.data = payload.leagueScheduleData;
    },
    getFranchiseLeagueScheduleFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getFranchiseLeagueStandings: (state) => {
      state.loading = true;
    },
    getFranchiseLeagueStandingsSuccess: (state, { payload }) => {
      state.loading = false;
      state.leagueStandings = payload.standingData;
    },
    getFranchiseLeagueStandingsFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
    getFranchiseLeagueStats: (state) => {
      state.loading = true;
    },
    getFranchiseLeagueStatsSuccess: (state, { payload }) => {
      state.loading = false;
      state.leagueStats = payload.statsData;
    },
    getFranchiseLeagueStatsFailed: (state, { payload }) => {
      state.loading = false;
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  setIsDeleted,
  getFranchiseLeague,
  getFranchiseLeagueSuccess,
  getFranchiseLeagueFailed,
  getTeams,
  getTeamsSuccess,
  getTeamsFailed,
  joinLeague,
  joinLeagueSuccess,
  joinLeagueFailed,
  addResult,
  addResultSuccess,
  addResultFailed,
  getFranchiseLeagueSchedule,
  getFranchiseLeagueScheduleSuccess,
  getFranchiseLeagueScheduleFailed,
  getFranchiseLeagueStandings,
  getFranchiseLeagueStandingsSuccess,
  getFranchiseLeagueStandingsFailed,
  getFranchiseLeagueStats,
  getFranchiseLeagueStatsSuccess,
  getFranchiseLeagueStatsFailed,
} = slice.actions;

export default slice.reducer;
