import { takeLatest, call, put } from "redux-saga/effects";
import {
  getFranchiseLeagues,
  getFranchiseLeaguesSuccess,
  getFranchiseLeaguesFailed,
} from "./reducers";

import request from "../../../../utils/apisauce";

function* getFranchiseLeaguesSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "GET", "/api/user/league");
    action = getFranchiseLeaguesSuccess(response);
  } catch (e) {
    action = getFranchiseLeaguesFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getFranchiseLeagues, getFranchiseLeaguesSaga);
}
