import { takeLatest, call, put } from "redux-saga/effects";
import {
  getLeagues,
  getLeaguesSuccess,
  getLeaguesFailed,
  createFranchiseLeague,
  createFranchiseLeagueSuccess,
  createFranchiseLeagueFailed,
  updateLeague,
  updateLeagueSuccess,
  updateLeagueFailed,
  deleteFranchiseLeague,
  deleteFranchiseLeagueSuccess,
  deleteFranchiseLeagueFailed,
  exportData,
  exportDataSuccess,
  exportDataFailed,
} from "./reducers.js";

import request from "../../../utils/apisauce";

function* getLeaguesSaga({ payload }) {
  let action;
  let url = "/api/admin/league";
  try {
    if ("query" in payload) {
      url += `?query=${payload["query"]}`;
    }
    if (payload["pageNo"]) {
      url += `&pageNo=${payload["pageNo"]}`;
    }
    const response = yield call(request, "GET", url);
    action = getLeaguesSuccess(response);
  } catch (e) {
    action = getLeaguesFailed(e);
  }
  yield put(action);
}
function* createFranchiseLeagueSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "POST", "/api/admin/league", payload);
    action = createFranchiseLeagueSuccess(response);
  } catch (e) {
    action = createFranchiseLeagueFailed(e);
  }
  yield put(action);
}
function* updateLeagueSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "PATCH", `/api/admin/league`, payload);
    action = updateLeagueSuccess(response);
  } catch (e) {
    action = updateLeagueFailed(e.message);
  }
  yield put(action);
}
function* deleteFranchiseLeagueSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "PUT", "/api/admin/league", payload);
    action = deleteFranchiseLeagueSuccess(response);
  } catch (e) {
    action = deleteFranchiseLeagueFailed(e);
  }
  yield put(action);
}
function* exportDataSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/admin/exportGpLeagueData",
      payload
    );
    action = exportDataSuccess(response);
  } catch (e) {
    action = exportDataFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getLeagues, getLeaguesSaga);
  yield takeLatest(createFranchiseLeague, createFranchiseLeagueSaga);
  yield takeLatest(updateLeague, updateLeagueSaga);
  yield takeLatest(deleteFranchiseLeague, deleteFranchiseLeagueSaga);
  yield takeLatest(exportData, exportDataSaga);
}
