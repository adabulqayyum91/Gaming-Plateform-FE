import { takeLatest, call, put } from "redux-saga/effects";
import {
  getUser,
  getUserSuccess,
  getUserFailed,
  updateUser,
  updateUserSuccess,
  updateUserFailed,
  updateProfileBg,
  updateProfileBgSuccess,
  updateProfileBgFailed,
  updateProfileImg,
  updateProfileImgSuccess,
  updateProfileImgFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getUserSaga({ payload }) {
  let action;
  // debugger;
  try {
    const response = yield call(request, "GET", "/api/user/showDetails");
    action = getUserSuccess(response);
  } catch (e) {
    action = getUserFailed(e);
  }
  yield put(action);
}

function* updateUserSaga({ payload }) {
  let action;

  try {
    const response = yield call(
      request,
      "PATCH",
      "/api/user/showDetails",
      payload
    );
    action = updateUserSuccess(response);
  } catch (e) {
    action = updateUserFailed(e);
  }
  yield put(action);
}

function* updateProfileBgSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/user/updateBackgroundImage",
      payload
    );
    action = updateProfileBgSuccess(response);
  } catch (e) {
    action = updateProfileBgFailed(e);
  }
  yield put(action);
}

function* updateProfileImgSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/user/updateProfileImage",
      payload
    );
    action = updateProfileImgSuccess(response);
  } catch (e) {
    action = updateProfileImgFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getUser, getUserSaga);
  yield takeLatest(updateUser, updateUserSaga);
  yield takeLatest(updateProfileBg, updateProfileBgSaga);
  yield takeLatest(updateProfileImg, updateProfileImgSaga);
}
