import { takeLatest, call, put } from "redux-saga/effects";
import {
  getUsers,
  getUsersSuccess,
  getUsersFailed,
  logout,
  logoutSuccess,
  logoutFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getUsersSaga({ payload }) {
  let action;
  let query = payload.query ? payload.query : "";
  try {
    const response = yield call(
      request,
      "GET",
      "/api/user/search?query=" + query
    );
    action = getUsersSuccess(response);
  } catch (e) {
    action = getUsersFailed(e);
  }
  yield put(action);
}
function* logoutSaga() {
  let action;
  try {
    const response = yield call(request, "POST", "/api/auth/logout");
    action = logoutSuccess(response);
  } catch (e) {
    action = logoutFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getUsers, getUsersSaga);
  yield takeLatest(logout, logoutSaga);
}
