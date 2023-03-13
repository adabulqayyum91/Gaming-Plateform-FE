import { takeLatest, call, put } from "redux-saga/effects";
import {
  getFranchiseTournament,
  getFranchiseTournamentSuccess,
  getFranchiseTournamentFailed,
  getTeams,
  getTeamsSuccess,
  getTeamsFailed,
  joinTournament,
  joinTournamentSuccess,
  joinTournamentFailed,
  addResult,
  addResultSuccess,
  addResultFailed,
  deleteFranchiseTournament,
  deleteFranchiseTournamentSuccess,
  deleteFranchiseTournamentFailed,
} from "./reducers";

import request from "../../../../utils/apisauce";

function* getFranchiseTournamentSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/user/tournamentById?id=" + payload.id
    );
    action = getFranchiseTournamentSuccess(response);
  } catch (e) {
    action = getFranchiseTournamentFailed(e);
  }
  yield put(action);
}
function* getTeamsSaga() {
  let action;
  try {
    const response = yield call(request, "GET", "/api/user/userFranchiseTeams");
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
      "/api/user/franchiseTournamentResult",
      payload
    );
    action = addResultSuccess(response);
  } catch (e) {
    action = addResultFailed(e);
  }
  yield put(action);
}
function* deleteFranchiseTournamentSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PATCH",
      "/api/admin/tournament",
      payload
    );
    action = deleteFranchiseTournamentSuccess(response);
  } catch (e) {
    action = deleteFranchiseTournamentFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getFranchiseTournament, getFranchiseTournamentSaga);
  yield takeLatest(getTeams, getTeamsSaga);
  yield takeLatest(joinTournament, joinTournamentSaga);
  yield takeLatest(addResult, addResultSaga);
  yield takeLatest(deleteFranchiseTournament, deleteFranchiseTournamentSaga);
}
