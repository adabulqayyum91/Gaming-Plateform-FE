import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  getLadders,
  getLaddersSuccess,
  getLaddersFailed,
  createLadder,
  createLadderSuccess,
  createLadderFailed,
  deleteLadder,
  deleteLadderSuccess,
  deleteLadderFailed,
  updateLadder,
  updateLadderSuccess,
  updateLadderFailed,
  exportData,
  exportDataSuccess,
  exportDataFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getLaddersSaga({ payload }) {
  let action;
  let url = "/api/admin/ladder";
  try {
    if ("query" in payload) {
      url += `?query=${payload["query"]}`;
    }
    if (payload["pageNo"]) {
      url += `&pageNo=${payload["pageNo"]}`;
    }
    const response = yield call(request, "GET", url);
    action = getLaddersSuccess(response);
  } catch (e) {
    action = getLaddersFailed(e);
  }
  yield put(action);
}

function* createLadderSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "POST", "/api/admin/ladder", payload);
    action = createLadderSuccess(response);
  } catch (e) {
    action = createLadderFailed(e);
  }
  yield put(action);
}

function* updateLadderSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "PUT", `/api/admin/ladder`, payload);
    action = updateLadderSuccess(response);
  } catch (e) {
    action = updateLadderFailed(e);
  }
  yield put(action);
}

function* deleteLadderSaga({ payload }) {
  let action;

  try {
    const response = yield call(request, "PATCH", "/api/admin/ladder", payload);
    action = deleteLadderSuccess(response);
  } catch (e) {
    action = deleteLadderFailed(e);
  }
  yield put(action);
}
function* exportDataSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/admin/exportLadderData",
      payload
    );
    action = exportDataSuccess(response);
  } catch (e) {
    action = exportDataFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getLadders, getLaddersSaga);
  yield takeLatest(createLadder, createLadderSaga);
  yield takeLatest(updateLadder, updateLadderSaga);
  yield takeLatest(deleteLadder, deleteLadderSaga);
  yield takeLatest(exportData, exportDataSaga);
}
