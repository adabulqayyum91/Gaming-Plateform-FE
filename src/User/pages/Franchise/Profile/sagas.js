import { takeLatest, call, put } from "redux-saga/effects";
import {
  getFranchise,
  getFranchiseSuccess,
  getFranchiseFailed,
  createFranchise,
  createFranchiseSuccess,
  createFranchiseFailed,
  createFranchiseTeam,
  createFranchiseTeamSuccess,
  createFranchiseTeamFailed,
  getFranchises,
  getFranchisesSuccess,
  getFranchisesFailed,
  updateFranchiseAbout,
  updateFranchiseAboutSuccess,
  updateFranchiseAboutFailed,
  removeFranchiseTeam,
  removeFranchiseTeamSuccess,
  removeFranchiseTeamFailed,
} from "./reducers";

import request from "../../../../utils/apisauce";

let url = "/api/user/franchise";

function* getFranchiseSaga({ payload }) {
  let action;
  try {
    if (payload && payload["franchiseId"]) {
      url = `/api/user/franchise?franchiseId=${payload.franchiseId}`;
    }
    const response = yield call(request, "GET", url);
    console.log("cating in success");

    action = getFranchiseSuccess(response);
  } catch (e) {
    console.log("cating in error");

    action = getFranchiseFailed(e);
  }
  yield put(action);
}
function* getFranchisesSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/user/allFranchise?franchiseStatus=" + payload.franchiseStatus
    );
    action = getFranchisesSuccess(response);
  } catch (e) {
    action = getFranchisesFailed(e);
  }
  yield put(action);
}
function* createFranchiseSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/user/franchise",
      payload
    );
    action = createFranchiseSuccess(response);
  } catch (e) {
    action = createFranchiseFailed(e);
  }
  yield put(action);
}
function* createFranchiseTeamSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/team/franchiseTeam",
      payload
    );
    action = createFranchiseTeamSuccess(response);
  } catch (e) {
    action = createFranchiseTeamFailed(e);
  }
  yield put(action);
}
function* removeFranchiseTeamSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "DELETE",
      "api/team/franchiseTeam?teamId=" + payload.teamId
    );
    action = removeFranchiseTeamSuccess(response);
  } catch (e) {
    action = removeFranchiseTeamFailed(e);
  }
  yield put(action);
}
function* updateFranchiseAboutSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PATCH",
      "api/user/franchise",
      payload
    );
    action = updateFranchiseAboutSuccess(response);
  } catch (e) {
    action = updateFranchiseAboutFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getFranchise, getFranchiseSaga);
  yield takeLatest(getFranchises, getFranchisesSaga);
  yield takeLatest(createFranchise, createFranchiseSaga);
  yield takeLatest(createFranchiseTeam, createFranchiseTeamSaga);
  yield takeLatest(removeFranchiseTeam, removeFranchiseTeamSaga);
  yield takeLatest(updateFranchiseAbout, updateFranchiseAboutSaga);
}
