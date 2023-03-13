import { takeLatest, call, put } from "redux-saga/effects";
import {
  getMatch,
  getMatchSuccess,
  getMatchFailed,
  addResult,
  addResultSuccess,
  addResultFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getMatchSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/user/matchById?id=" + payload.id
    );
    action = getMatchSuccess(response);
  } catch (e) {
    action = getMatchFailed(e);
  }
  yield put(action);
}
function* addResultSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/user/matchResult",
      payload
    );
    action = addResultSuccess(response);
  } catch (e) {
    action = addResultFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getMatch, getMatchSaga);
  yield takeLatest(addResult, addResultSaga);
}
