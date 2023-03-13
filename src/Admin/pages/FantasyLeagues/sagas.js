import { takeLatest, call, put } from "redux-saga/effects";
import {
  getFantasyLeagues,
  getFantasyLeaguesSuccess,
  getFantasyLeaguesFailed,
  createFantasyLeague,
  createFantasyLeagueSuccess,
  createFantasyLeagueFailed,
  updateFantasyLeague,
  updateFantasyLeagueSuccess,
  updateFantasyLeagueFailed,
  deleteFantasyLeague,
  deleteFantasyLeagueSuccess,
  deleteFantasyLeagueFailed,
  exportData,
  exportDataSuccess,
  exportDataFailed,
} from "./reducers.js";

import request from "../../../utils/apisauce";

function* getFantasyLeaguesSaga({ payload }) {
  let action;
  let url = "/api/admin/fantasyLeague";
  try {
    if ("query" in payload) {
      url += `?query=${payload["query"]}`;
    }
    if (payload["pageNo"]) {
      url += `&pageNo=${payload["pageNo"]}`;
    }
    const response = yield call(request, "GET", url);
    action = getFantasyLeaguesSuccess(response);
  } catch (e) {
    action = getFantasyLeaguesFailed(e);
  }
  yield put(action);
}
function* createFantasyLeagueSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/fantasyLeague/fantasyLeague",
      payload
    );
    action = createFantasyLeagueSuccess(response);
  } catch (e) {
    action = createFantasyLeagueFailed(e);
  }
  yield put(action);
}
function* updateFantasyLeagueSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PATCH",
      `/api/admin/fantasyLeague`,
      payload
    );
    action = updateFantasyLeagueSuccess(response);
  } catch (e) {
    action = updateFantasyLeagueFailed(e);
  }
  yield put(action);
}
function* deleteFantasyLeagueSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PUT",
      "/api/admin/fantasyLeague",
      payload
    );
    action = deleteFantasyLeagueSuccess(response);
  } catch (e) {
    action = deleteFantasyLeagueFailed(e);
  }
  yield put(action);
}
function* exportDataSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/admin/exportFantasyLeagueData",
      payload
    );
    action = exportDataSuccess(response);
  } catch (e) {
    action = exportDataFailed(e);
  }
  yield put(action);
}
export default function* saga() {
  yield takeLatest(getFantasyLeagues, getFantasyLeaguesSaga);
  yield takeLatest(createFantasyLeague, createFantasyLeagueSaga);
  yield takeLatest(updateFantasyLeague, updateFantasyLeagueSaga);
  yield takeLatest(deleteFantasyLeague, deleteFantasyLeagueSaga);
  yield takeLatest(exportData, exportDataSaga);
}
