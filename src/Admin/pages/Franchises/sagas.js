import { takeLatest, call, put } from "redux-saga/effects";
import {
  getFranchises,
  getFranchisesSuccess,
  getFranchisesFailed,
  franchiseApprovalAndBlock,
  franchiseApprovalAndBlockSuccess,
  franchiseApprovalAndBlockFailed,
  exportData,
  exportDataSuccess,
  exportDataFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getFranchisesSaga({ payload }) {
  let action;
  let url = "/api/admin/franchise";
  try {
    if ("query" in payload) {
      url += `?query=${payload["query"]}`;
    }
    if (payload["pageNo"]) {
      url += `&pageNo=${payload["pageNo"]}`;
    }
    const response = yield call(request, "GET", url);
    action = getFranchisesSuccess(response);
  } catch (e) {
    action = getFranchisesFailed(e);
  }
  yield put(action);
}

function* franchiseApprovalAndBlockSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PATCH",
      "/api/admin/franchise",
      payload
    );
    action = franchiseApprovalAndBlockSuccess(response);
  } catch (e) {
    action = franchiseApprovalAndBlockFailed(e);
  }
  yield put(action);
}
function* exportDataSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/admin/exportGrandPrixData",

      payload
    );
    action = exportDataSuccess(response);
  } catch (e) {
    action = exportDataFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getFranchises, getFranchisesSaga);
  yield takeLatest(franchiseApprovalAndBlock, franchiseApprovalAndBlockSaga);
  yield takeLatest(exportData, exportDataSaga);
}
