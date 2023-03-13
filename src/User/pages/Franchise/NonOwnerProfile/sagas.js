import { takeLatest, call, put } from "redux-saga/effects";
import {
  getFranchise,
  getFranchiseSuccess,
  getFranchiseFailed,
  sendTryoutReq,
  sendTryoutReqSuccess,
  sendTryoutReqFailed,
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
function* sendTryoutReqSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "POST", "api/user/tryout", payload);
    action = sendTryoutReqSuccess(response);
  } catch (e) {
    action = sendTryoutReqFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getFranchise, getFranchiseSaga);
  yield takeLatest(sendTryoutReq, sendTryoutReqSaga);
}
