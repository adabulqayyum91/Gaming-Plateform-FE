import { takeLatest, call, put } from "redux-saga/effects";
import {
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
} from "./reducers";

import request from "../../../../utils/apisauce";

function* getFranchiseLeagueSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "api/league/league?leagueId=" + payload.id
    );
    action = getFranchiseLeagueSuccess(response);
  } catch (e) {
    action = getFranchiseLeagueFailed(e.message);
  }
  yield put(action);
}
function* getTeamsSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "GET", "/api/user/userFranchiseTeams");
    action = getTeamsSuccess(response);
  } catch (e) {
    action = getTeamsFailed(e.message);
  }
  yield put(action);
}
function* joinLeagueSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "POST", "/api/user/league", payload);
    action = joinLeagueSuccess(response);
  } catch (e) {
    action = joinLeagueFailed(e);
  }
  yield put(action);
}
function* addResultSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/user/leagueResult",
      payload
    );
    action = addResultSuccess(response);
  } catch (e) {
    action = addResultFailed(e);
  }
  yield put(action);
}
function* getFranchiseLeagueScheduleSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/league/schedule?leagueId=" + payload.leagueId
    );
    action = getFranchiseLeagueScheduleSuccess(response);
  } catch (e) {
    action = getFranchiseLeagueScheduleFailed(e);
  }
  yield put(action);
}
function* getFranchiseLeagueStandingsSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "api/league/standing?leagueId=" + payload.leagueId
    );
    action = getFranchiseLeagueStandingsSuccess(response);
  } catch (e) {
    action = getFranchiseLeagueStandingsFailed(e);
  }
  yield put(action);
}
function* getFranchiseLeagueStatsSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "api/league/stats?leagueId=" + payload.leagueId
    );
    action = getFranchiseLeagueStatsSuccess(response);
  } catch (e) {
    action = getFranchiseLeagueStatsFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getFranchiseLeague, getFranchiseLeagueSaga);
  yield takeLatest(getTeams, getTeamsSaga);
  yield takeLatest(joinLeague, joinLeagueSaga);
  yield takeLatest(addResult, addResultSaga);
  yield takeLatest(getFranchiseLeagueSchedule, getFranchiseLeagueScheduleSaga);
  yield takeLatest(
    getFranchiseLeagueStandings,
    getFranchiseLeagueStandingsSaga
  );
  yield takeLatest(getFranchiseLeagueStats, getFranchiseLeagueStatsSaga);
}
