import { takeLatest, call, put } from "redux-saga/effects";
import {
  getFranchiseTournaments,
  getFranchiseTournamentsSuccess,
  getFranchiseTournamentsFailed,
  createFranchiseTournament,
  createFranchiseTournamentSuccess,
  createFranchiseTournamentFailed,
  deleteFranchiseTournamentsResult,
  deleteFranchiseTournamentsResultSuccess,
  deleteFranchiseTournamentsResultFailed,
  updateFranchiseTournamentResult,
  updateFranchiseTournamentResultSuccess,
  updateFranchiseTournamentResultFailed,
  getFranchiseTournamentResults,
  getFranchiseTournamentResultsSuccess,
  getFranchiseTournamentResultsFailed,
  getFranchiseGames,
  getFranchiseGamesSuccess,
  getFranchiseGamesFailed,
} from "./reducers";

import request from "../../../../utils/apisauce";

function* getFranchiseTournamentsSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      `/api/user/franchiseTournaments`
    );
    action = getFranchiseTournamentsSuccess(response);
  } catch (e) {
    action = getFranchiseTournamentsFailed(e);
  }
  yield put(action);
}
function* createFranchiseTournamentSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/user/franchiseTournament",
      payload
    );
    action = createFranchiseTournamentSuccess(response);
  } catch (e) {
    action = createFranchiseTournamentFailed(e);
  }
  yield put(action);
}
function* getFranchiseTournamentResultsSaga({ payload }) {
  let action;
  let url = "/api/user/franchiseTournamentResult";
  try {
    if ("query" in payload) {
      url += `?query=${payload["query"]}`;
    }
    if (payload["pageNo"]) {
      url += `&pageNo=${payload["pageNo"]}`;
    }
    const response = yield call(request, "GET", url);
    action = getFranchiseTournamentResultsSuccess(response);
  } catch (e) {
    action = getFranchiseTournamentResultsFailed(e);
  }
  yield put(action);
}
function* deleteFranchiseTournamentsResultSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/user/deleteFranchiseTournamentResult",
      payload
    );
    action = deleteFranchiseTournamentsResultSuccess(response);
  } catch (e) {
    action = deleteFranchiseTournamentsResultFailed(e);
  }
  yield put(action);
}
function* updateFranchiseTournamentResultSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PATCH",
      "/api/user/franchiseTournamentResult",
      payload
    );
    action = updateFranchiseTournamentResultSuccess(response);
  } catch (e) {
    action = updateFranchiseTournamentResultFailed(e);
  }
  yield put(action);
}
function* getFranchiseGamesSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "api/user/franchiseGameList",
      payload
    );
    action = getFranchiseGamesSuccess(response);
  } catch (e) {
    action = getFranchiseGamesFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getFranchiseTournaments, getFranchiseTournamentsSaga);
  yield takeLatest(createFranchiseTournament, createFranchiseTournamentSaga);
  yield takeLatest(
    getFranchiseTournamentResults,
    getFranchiseTournamentResultsSaga
  );
  yield takeLatest(
    deleteFranchiseTournamentsResult,
    deleteFranchiseTournamentsResultSaga
  );
  yield takeLatest(
    updateFranchiseTournamentResult,
    updateFranchiseTournamentResultSaga
  );
  yield takeLatest(getFranchiseGames, getFranchiseGamesSaga);
}
