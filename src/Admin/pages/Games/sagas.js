import { takeLatest, call, put } from "redux-saga/effects";
import {
  getGames,
  getGamesSuccess,
  getGamesFailed,
  createGame,
  createGameSuccess,
  createGameFailed,
  deleteGame,
  deleteGameSuccess,
  deleteGameFailed,
  updateGame,
  updateGameSuccess,
  updateGameFailed,
  getUserSideGames,
  getUserSideGamesSuccess,
  getUserSideGamesFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getGamesSaga({ payload }) {
  let action;
  let url = "/api/admin/game";
  try {
    if ("query" in payload) {
      url += `?query=${payload["query"]}`;
    }
    if (payload["pageNo"]) {
      url += `&pageNo=${payload["pageNo"]}`;
    }
    const response = yield call(request, "GET", url);
    action = getGamesSuccess(response);
  } catch (e) {
    action = getGamesFailed(e);
  }
  yield put(action);
}
function* getUserSideGamesSaga({ payload }) {
  let action;
  let url = "/api/game/game";
  try {
    if (payload["query"]) {
      url += `?query=${payload["query"]}`;
    }
    const response = yield call(request, "GET", url);
    action = getUserSideGamesSuccess(response);
  } catch (e) {
    action = getUserSideGamesFailed(e);
  }
  yield put(action);
}

function* createGameSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "POST", "/api/game/game", payload);
    action = createGameSuccess(response);
  } catch (e) {
    action = createGameFailed(e);
  }
  yield put(action);
}

function* updateGameSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "PUT", `/api/game/game`, payload);
    action = updateGameSuccess(response);
  } catch (e) {
    action = updateGameFailed(e);
  }
  yield put(action);
}

function* deleteGameSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/game/deleteGame",
      payload
    );
    action = deleteGameSuccess(response);
  } catch (e) {
    action = deleteGameFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getGames, getGamesSaga);
  yield takeLatest(getUserSideGames, getUserSideGamesSaga);
  yield takeLatest(createGame, createGameSaga);
  yield takeLatest(updateGame, updateGameSaga);
  yield takeLatest(deleteGame, deleteGameSaga);
}
