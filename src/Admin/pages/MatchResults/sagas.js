import { takeLatest, call, put } from "redux-saga/effects";
import {
  getMatchesResults,
  getMatchesResultsSuccess,
  getMatchesResultsFailed,
  deleteMatchesResult,
  deleteMatchesResultSuccess,
  deleteMatchesResultFailed,
  submitResult,
  submitResultSuccess,
  submitResultFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getMatchesResultsSaga({ payload }) {
  let action;
  let url = "/api/admin/matchResult";
  try {
    if (payload && payload["query"]) {
      url += `?query=${payload["query"]}`;
    }
    const response = yield call(request, "GET", url);
    action = getMatchesResultsSuccess(response);
  } catch (e) {
    action = getMatchesResultsFailed(e);
  }
  yield put(action);
}

function* submitResultSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/admin/matchResult",
      payload
    );
    action = submitResultSuccess(response);
  } catch (e) {
    action = submitResultFailed(e);
  }
  yield put(action);
}

function* deleteMatchesResultSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PATCH",
      "/api/admin/matchResult",
      payload
    );
    action = deleteMatchesResultSuccess(response);
  } catch (e) {
    action = deleteMatchesResultFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getMatchesResults, getMatchesResultsSaga);
  yield takeLatest(submitResult, submitResultSaga);
  yield takeLatest(deleteMatchesResult, deleteMatchesResultSaga);
}
