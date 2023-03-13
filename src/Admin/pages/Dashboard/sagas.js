import { takeLatest, call, put } from "redux-saga/effects";
import { getStats, getStatsSuccess, getStatsFailed } from "./reducers";

import request from "../../../utils/apisauce";

function* getStatsSaga({ payload }) {
  let action;
  let url = "/api/admin/dashboard";
  try {
    const response = yield call(request, "GET", url);
    action = getStatsSuccess(response);
  } catch (e) {
    action = getStatsFailed(e);
  }
  yield put(action);
}
export default function* saga() {
  yield takeLatest(getStats, getStatsSaga);
}
