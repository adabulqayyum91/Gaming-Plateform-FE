import { takeLatest, call, put } from "redux-saga/effects";

import {
  getUsers,
  getUsersSuccess,
  getUsersFailed,
  createUser,
  createUserSuccess,
  createUserFailed,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailed,
  updateUser,
  updateUserSuccess,
  updateUserFailed,
  exportData,
  exportDataSuccess,
  exportDataFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getUsersSaga({ payload }) {
  let action;
  let url = "/api/admin/usersList";
  try {
    if ("query" in payload) {
      url += `?query=${payload["query"]}`;
    }
    if (payload["pageNo"]) {
      url += `&pageNo=${payload["pageNo"]}`;
    }
    const response = yield call(request, "GET", url);
    action = getUsersSuccess(response);
  } catch (e) {
    action = getUsersFailed(e);
  }
  yield put(action);
}

function* createUserSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/admin/createUserByAdmin",
      payload
    );
    action = createUserSuccess(response);
  } catch (e) {
    action = createUserFailed(e);
  }
  yield put(action);
}

function* updateUserSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      `/api/admin/editUserByAdmin`,
      payload
    );
    action = updateUserSuccess(response);
  } catch (e) {
    action = updateUserFailed(e);
  }
  yield put(action);
}

function* deleteUserSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/admin/deleteUsersByAdmin",
      payload
    );
    action = deleteUserSuccess(response);
  } catch (e) {
    action = deleteUserFailed(e);
  }
  yield put(action);
}
function* exportDataSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/admin/exportUserData",
      payload
    );
    action = exportDataSuccess(response);
  } catch (e) {
    action = exportDataFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getUsers, getUsersSaga);
  yield takeLatest(createUser, createUserSaga);
  yield takeLatest(updateUser, updateUserSaga);
  yield takeLatest(deleteUser, deleteUserSaga);
  yield takeLatest(exportData, exportDataSaga);
}
