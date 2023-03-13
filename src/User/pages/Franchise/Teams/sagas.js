import { takeLatest, call, put } from "redux-saga/effects";
import {
  getFranchiseTryouts,
  getFranchiseTryoutsSuccess,
  getFranchiseTryoutsFailed,
  updateTryoutReq,
  updateTryoutReqSuccess,
  updateTryoutReqFailed,
  addUserToFrancTeam,
  addUserToFrancTeamSuccess,
  addUserToFrancTeamFailed,
} from "./reducers";

import request from "../../../../utils/apisauce";

let url = "/api/user/tryout";

function* getFranchiseTryoutsSaga({ payload }) {
  let action;
  try {
    if ("query" in payload) {
      url += `?query=${payload["query"]}`;
    }
    if (payload["pageNo"]) {
      url += `&pageNo=${payload["pageNo"]}`;
    }
    const response = yield call(request, "GET", url);
    action = getFranchiseTryoutsSuccess(response);
  } catch (e) {
    action = getFranchiseTryoutsFailed(e);
  }
  yield put(action);
}
function* updateTryoutReqSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "PATCH", url, payload);
    action = updateTryoutReqSuccess(response);
  } catch (e) {
    action = updateTryoutReqFailed(e);
  }
  yield put(action);
}
function* addUserToFrancTeamSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/user/addToFranchiseTeam",
      payload
    );
    action = addUserToFrancTeamSuccess(response);
  } catch (e) {
    action = addUserToFrancTeamFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getFranchiseTryouts, getFranchiseTryoutsSaga);
  yield takeLatest(updateTryoutReq, updateTryoutReqSaga);
  yield takeLatest(addUserToFrancTeam, addUserToFrancTeamSaga);
}
