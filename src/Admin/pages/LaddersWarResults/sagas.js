import { takeLatest, call, put } from "redux-saga/effects";
import {
  getTotalWarLaddersResults,
  getTotalWarLaddersResultsSuccess,
  getTotalWarLaddersResultsFailed,
  deleteResult,
  deleteResultSuccess,
  deleteResultFailed,
  submitResult,
  submitResultSuccess,
  submitResultFailed,
  exportData,
  exportDataSuccess,
  exportDataFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getTotalWarLaddersResultsSaga({ payload }) {
  let action;
  let url = "/api/admin/totalWarLadderResult";
  try {
    if ("query" in payload) {
      url += `?query=${payload["query"]}`;
    }
    if (payload["pageNo"]) {
      url += `&pageNo=${payload["pageNo"]}`;
    }
    const response = yield call(request, "GET", url);
    action = getTotalWarLaddersResultsSuccess(response);
  } catch (e) {
    action = getTotalWarLaddersResultsFailed(e);
  }
  yield put(action);
}
function* submitResultSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PUT",
      "/api/admin/totalWarLadderResult",
      payload
    );
    action = submitResultSuccess(response);
  } catch (e) {
    action = submitResultFailed(e);
  }
  yield put(action);
}
function* deleteResultSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PATCH",
      "/api/admin/totalWarLadderResult",
      payload
    );
    action = deleteResultSuccess(response);
  } catch (e) {
    action = deleteResultFailed(e);
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
  yield takeLatest(getTotalWarLaddersResults, getTotalWarLaddersResultsSaga);
  yield takeLatest(submitResult, submitResultSaga);
  yield takeLatest(deleteResult, deleteResultSaga);
  yield takeLatest(exportData, exportDataSaga);
}
