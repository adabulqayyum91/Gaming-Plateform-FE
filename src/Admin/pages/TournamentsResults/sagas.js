import { takeLatest, call, put } from "redux-saga/effects";
import {
  getTournamentsResults,
  getTournamentsResultsSuccess,
  getTournamentsResultsFailed,
  deleteTournamentsResult,
  deleteTournamentsResultSuccess,
  deleteTournamentsResultFailed,
  submitResult,
  submitResultSuccess,
  submitResultFailed,
  exportData,
  exportDataSuccess,
  exportDataFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getTournamentsResultsSaga({ payload }) {
  let action;
  let url = "/api/admin/tournamentResult";
  try {
    if ("query" in payload) {
      url += `?query=${payload["query"]}`;
    }
    if (payload["pageNo"]) {
      url += `&pageNo=${payload["pageNo"]}`;
    }
    const response = yield call(request, "GET", url);
    action = getTournamentsResultsSuccess(response);
  } catch (e) {
    action = getTournamentsResultsFailed(e);
  }
  yield put(action);
}

function* submitResultSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/admin/tournamentResult",
      payload
    );
    action = submitResultSuccess(response);
  } catch (e) {
    action = submitResultFailed(e);
  }
  yield put(action);
}

function* deleteTournamentsResultSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PATCH",
      "/api/admin/tournamentResult",
      payload
    );
    action = deleteTournamentsResultSuccess(response);
  } catch (e) {
    action = deleteTournamentsResultFailed(e);
  }
  yield put(action);
}
function* exportDataSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/admin/exportTournamentResultData",
      payload
    );
    action = exportDataSuccess(response);
  } catch (e) {
    action = exportDataFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getTournamentsResults, getTournamentsResultsSaga);
  yield takeLatest(submitResult, submitResultSaga);
  yield takeLatest(deleteTournamentsResult, deleteTournamentsResultSaga);
  yield takeLatest(exportData, exportDataSaga);
}
