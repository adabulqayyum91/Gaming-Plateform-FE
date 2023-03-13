import { takeLatest, call, put } from "redux-saga/effects";
import {
  getTournament,
  getTournamentSuccess,
  getTournamentFailed,
  getTeams,
  getTeamsSuccess,
  getTeamsFailed,
  joinTournament,
  joinTournamentSuccess,
  joinTournamentFailed,
  addResult,
  addResultSuccess,
  addResultFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getTournamentSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/user/tournamentById?id=" + payload.id
    );
    action = getTournamentSuccess(response);
  } catch (e) {
    action = getTournamentFailed(e);
  }
  yield put(action);
}
function* getTeamsSaga() {
  let action;
  try {
    const response = yield call(request, "GET", "/api/team/team");
    action = getTeamsSuccess(response);
  } catch (e) {
    action = getTeamsFailed(e);
  }
  yield put(action);
}
function* joinTournamentSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/user/tournament",
      payload
    );
    action = joinTournamentSuccess(response);
  } catch (e) {
    action = joinTournamentFailed(e);
  }
  yield put(action);
}

function* addResultSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/user/tournamentResult",
      payload
    );
    action = addResultSuccess(response);
  } catch (e) {
    action = addResultFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getTournament, getTournamentSaga);
  yield takeLatest(getTeams, getTeamsSaga);
  yield takeLatest(joinTournament, joinTournamentSaga);
  yield takeLatest(addResult, addResultSaga);
}
