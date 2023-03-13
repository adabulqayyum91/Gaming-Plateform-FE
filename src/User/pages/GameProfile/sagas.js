import { takeLatest, call, put } from "redux-saga/effects";
import {
  getGame,
  getGameSuccess,
  getGameFailed,
  getTournaments,
  getTournamentsSuccess,
  getTournamentsFailed,
  getLadders,
  getLaddersSuccess,
  getLaddersFailed,
  getPublicMatches,
  getPublicMatchesSuccess,
  getPublicMatchesFailed,
  sendPublicMatchInvite,
  sendPublicMatchInviteSuccess,
  sendPublicMatchInviteFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getGameSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/user/gameById?id=" + payload.id
    );
    action = getGameSuccess(response);
  } catch (e) {
    action = getGameFailed(e);
  }
  yield put(action);
}
function* getTournamentsSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/user/tournamentByGame?game=" + payload.game
    );
    action = getTournamentsSuccess(response);
  } catch (e) {
    action = getTournamentsFailed(e);
  }
  yield put(action);
}
function* getLaddersSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/user/ladderByGame?game=" + payload.game
    );
    action = getLaddersSuccess(response);
  } catch (e) {
    action = getLaddersFailed(e);
  }
  yield put(action);
}
function* getPublicMatchesSaga({ payload }) {
  let action;
  let url = "/api/user/publicMatch";
  try {
    if ("game" in payload && payload["game"]) {
      url += "?game=" + payload["game"];
    }
    const response = yield call(request, "GET", url);
    action = getPublicMatchesSuccess(response);
  } catch (e) {
    action = getPublicMatchesFailed(e);
  }
  yield put(action);
}
function* sendPublicMatchInviteSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "PATCH", "/api/user/match", payload);
    action = sendPublicMatchInviteSuccess(response);
  } catch (e) {
    action = sendPublicMatchInviteFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getGame, getGameSaga);
  yield takeLatest(getTournaments, getTournamentsSaga);
  yield takeLatest(getLadders, getLaddersSaga);
  yield takeLatest(getPublicMatches, getPublicMatchesSaga);
  yield takeLatest(sendPublicMatchInvite, sendPublicMatchInviteSaga);
}
