import { takeLatest, call, put } from "redux-saga/effects";
import {
  getLadder,
  getLadderSuccess,
  getLadderFailed,
  getTeams,
  getTeamsSuccess,
  getTeamsFailed,
  joinLadder,
  joinLadderSuccess,
  joinLadderFailed,
  addResult,
  addResultSuccess,
  addResultFailed,
  getTotalWarLadder,
  getTotalWarLadderSuccess,
  getTotalWarLadderFailed,
  addTotalWarLadderResult,
  addTotalWarLadderResultSuccess,
  addTotalWarLadderResultFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getLadderSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/user/ladderDetail?id=" + payload.id
    );
    action = getLadderSuccess(response);
  } catch (e) {
    action = getLadderFailed(e.message);
  }
  yield put(action);
}
function* getTeamsSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "GET", "/api/team/team");
    action = getTeamsSuccess(response);
  } catch (e) {
    action = getTeamsFailed(e.message);
  }
  yield put(action);
}
function* joinLadderSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "POST", "/api/user/ladders", payload);
    action = joinLadderSuccess(response);
  } catch (e) {
    action = joinLadderFailed(e);
  }
  yield put(action);
}
function* getTotalWarLadderSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/user/totalWarLadder?ladderId=" + payload.ladderId
    );
    action = getTotalWarLadderSuccess(response);
  } catch (e) {
    action = getTotalWarLadderFailed(e);
  }
  yield put(action);
}

function* addResultSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/user/ladderResult",
      payload
    );
    action = addResultSuccess(response);
  } catch (e) {
    action = addResultFailed(e);
  }
  yield put(action);
}
function* addTotalWarLadderResultSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/user/totalWarLadderResult",
      payload
    );
    action = addTotalWarLadderResultSuccess(response);
  } catch (e) {
    action = addTotalWarLadderResultFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getLadder, getLadderSaga);
  yield takeLatest(getTeams, getTeamsSaga);
  yield takeLatest(joinLadder, joinLadderSaga);
  yield takeLatest(getTotalWarLadder, getTotalWarLadderSaga);
  yield takeLatest(addResult, addResultSaga);
  yield takeLatest(addTotalWarLadderResult, addTotalWarLadderResultSaga);
}
