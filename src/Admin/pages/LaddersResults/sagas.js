import { takeLatest, call, put } from "redux-saga/effects";
import {
  getLaddersResults,
  getLaddersResultsSuccess,
  getLaddersResultsFailed,
  deleteLaddersResult,
  deleteLaddersResultSuccess,
  deleteLaddersResultFailed,
  submitResult,
  submitResultSuccess,
  submitResultFailed,
  exportData,
  exportDataSuccess,
  exportDataFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getLaddersResultsSaga({ payload }) {
  let action;
  let url = "/api/admin/ladderResult";
  try {
    if ("query" in payload) {
      url += `?query=${payload["query"]}`;
    }
    if (payload["pageNo"]) {
      url += `&pageNo=${payload["pageNo"]}`;
    }
    const response = yield call(request, "GET", url);
    action = getLaddersResultsSuccess(response);
  } catch (e) {
    action = getLaddersResultsFailed(e);
  }
  yield put(action);
}

function* submitResultSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/admin/ladderResult",
      payload
    );
    action = submitResultSuccess(response);
  } catch (e) {
    action = submitResultFailed(e);
  }
  yield put(action);
}

function* deleteLaddersResultSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/admin/deleteLadderResult",
      payload
    );
    action = deleteLaddersResultSuccess(response);
  } catch (e) {
    action = deleteLaddersResultFailed(e);
  }
  yield put(action);
}
function* exportDataSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/admin/exportLadderResultData",
      payload
    );
    action = exportDataSuccess(response);
  } catch (e) {
    action = exportDataFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getLaddersResults, getLaddersResultsSaga);
  yield takeLatest(submitResult, submitResultSaga);
  yield takeLatest(deleteLaddersResult, deleteLaddersResultSaga);
  yield takeLatest(exportData, exportDataSaga);
}
