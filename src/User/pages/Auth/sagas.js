import { takeLatest, call, put } from "redux-saga/effects";
import {
  login,
  loginSuccess,
  loginFailed,
  signup,
  signupSuccess,
  signupFailed,
  resetPass,
  resetPassSuccess,
  resetPassFailed,
  forgotPass,
  forgotPassSuccess,
  forgotPassFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* loginSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "POST", "/api/auth/login", payload);
    action = loginSuccess(response);
  } catch (e) {
    action = loginFailed(e);
  }
  yield put(action);
}
function* signupSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/auth/createUser",
      payload
    );
    action = signupSuccess(response);
  } catch (e) {
    action = signupFailed(e);
  }
  yield put(action);
}
function* resetPassSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "POST", "/api/auth/reset", payload);
    action = resetPassSuccess(response);
  } catch (e) {
    action = resetPassFailed(e);
  }
  yield put(action);
}
function* forgotPassSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "POST", "/api/auth/forgot", payload);
    action = forgotPassSuccess(response);
  } catch (e) {
    action = forgotPassFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(login, loginSaga);
  yield takeLatest(signup, signupSaga);
  yield takeLatest(resetPass, resetPassSaga);
  yield takeLatest(forgotPass, forgotPassSaga);
}
