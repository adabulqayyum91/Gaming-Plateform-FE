import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  getTournaments,
  getTournamentsSuccess,
  getTournamentsFailed,
  createTournament,
  createTournamentSuccess,
  createTournamentFailed,
  deleteTournament,
  deleteTournamentSuccess,
  deleteTournamentFailed,
  updateTournament,
  updateTournamentSuccess,
  updateTournamentFailed,
  exportData,
  exportDataSuccess,
  exportDataFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getTournamentsSaga({ payload }) {
  let action;
  let url = "/api/admin/tournament";

  try {
    if ("query" in payload) {
      url += `?query=${payload["query"]}`;
    }
    if (payload["pageNo"]) {
      url += `&pageNo=${payload["pageNo"]}`;
    } else {
      url += `&pageNo=1`;
    }
    const response = yield call(request, "GET", url);
    action = getTournamentsSuccess(response);
  } catch (e) {
    action = getTournamentsFailed(e.message);
  }
  yield put(action);
}

function* createTournamentSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/admin/tournament",
      payload
    );
    action = createTournamentSuccess(response);
  } catch (e) {
    action = createTournamentFailed(e.message);
  }
  yield put(action);
}

function* updateTournamentSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PUT",
      `/api/admin/tournament`,
      payload
    );
    action = updateTournamentSuccess(response);
  } catch (e) {
    action = updateTournamentFailed(e.message);
  }
  yield put(action);
}

function* deleteTournamentSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PATCH",
      "/api/admin/tournament",
      payload
    );
    action = deleteTournamentSuccess(response);
  } catch (e) {
    action = deleteTournamentFailed(e.message);
  }
  yield put(action);
}
function* exportDataSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/admin/exportTournamentData",
      payload
    );
    action = exportDataSuccess(response);
  } catch (e) {
    action = exportDataFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getTournaments, getTournamentsSaga);
  yield takeLatest(createTournament, createTournamentSaga);
  yield takeLatest(updateTournament, updateTournamentSaga);
  yield takeLatest(deleteTournament, deleteTournamentSaga);
  yield takeLatest(exportData, exportDataSaga);
}
