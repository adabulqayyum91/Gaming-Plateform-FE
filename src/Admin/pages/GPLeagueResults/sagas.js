import { takeLatest, call, put } from "redux-saga/effects";
import {
  getFranchiseLeaguesResults,
  getFranchiseLeaguesResultsSuccess,
  getFranchiseLeaguesResultsFailed,
  deleteFranchiseLeaguesResult,
  deleteFranchiseLeaguesResultSuccess,
  deleteFranchiseLeaguesResultFailed,
  updateFranchiseLeaguesResult,
  updateFranchiseLeaguesResultSuccess,
  updateFranchiseLeaguesResultFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getFranchiseLeaguesResultsSaga({ payload }) {
  let action;
  let url = "/api/admin/leagueResult";
  try {
    if ("query" in payload) {
      url += `?query=${payload["query"]}`;
    }
    if (payload["pageNo"]) {
      url += `&pageNo=${payload["pageNo"]}`;
    }
    const response = yield call(request, "GET", url);
    action = getFranchiseLeaguesResultsSuccess(response);
  } catch (e) {
    action = getFranchiseLeaguesResultsFailed(e);
  }
  yield put(action);
}
function* deleteFranchiseLeaguesResultSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/admin/deleteLeagueResult",
      payload
    );
    action = deleteFranchiseLeaguesResultSuccess(response);
  } catch (e) {
    action = deleteFranchiseLeaguesResultFailed(e);
  }
  yield put(action);
}
function* updateFranchiseLeaguesResultSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PATCH",
      "/api/admin/leagueResult",
      payload
    );
    action = updateFranchiseLeaguesResultSuccess(response);
  } catch (e) {
    action = updateFranchiseLeaguesResultFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getFranchiseLeaguesResults, getFranchiseLeaguesResultsSaga);
  yield takeLatest(
    deleteFranchiseLeaguesResult,
    deleteFranchiseLeaguesResultSaga
  );
  yield takeLatest(
    updateFranchiseLeaguesResult,
    updateFranchiseLeaguesResultSaga
  );
}
