import { takeLatest, call, put } from "redux-saga/effects";
import {
  getMatches,
  getMatchesSuccess,
  getMatchesFailed,
  createMatche,
  createMatcheSuccess,
  createMatcheFailed,
  getMyTournaments,
  getMyTournamentsSuccess,
  getMyTournamentsFailed,
  getMyLadders,
  getMyLaddersSuccess,
  getMyLaddersFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getMatchesSaga() {
  let action;
  try {
    const response = yield call(request, "GET", "/api/user/match");
    action = getMatchesSuccess(response);
  } catch (e) {
    action = getMatchesFailed(e);
  }
  yield put(action);
}
function* createMatcheSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "POST", "/api/user/match", payload);
    action = createMatcheSuccess(response);
  } catch (e) {
    action = createMatcheFailed(e);
  }
  yield put(action);
}
function* getMyTournamentsSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/user/myTournaments",
      payload
    );
    action = getMyTournamentsSuccess(response);
  } catch (e) {
    action = getMyTournamentsFailed(e);
  }
  yield put(action);
}
function* getMyLaddersSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "GET", "/api/user/myLadders", payload);
    action = getMyLaddersSuccess(response);
  } catch (e) {
    action = getMyLaddersFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getMatches, getMatchesSaga);
  yield takeLatest(createMatche, createMatcheSaga);
  yield takeLatest(getMyTournaments, getMyTournamentsSaga);
  yield takeLatest(getMyLadders, getMyLaddersSaga);
}
