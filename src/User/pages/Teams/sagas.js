import { takeLatest, call, put } from "redux-saga/effects";
import {
  getTeams,
  getTeamsSuccess,
  getTeamsFailed,
  createTeam,
  createTeamSuccess,
  createTeamFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getTeamsSaga() {
  let action;
  try {
    const response = yield call(request, "GET", "/api/team/team");
    action = getTeamsSuccess(response);
  } catch (e) {
    action = getTeamsFailed(e);
  }
  yield put(action);
}
function* createTeamSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "POST", "/api/team/team", payload);
    action = createTeamSuccess(response);
  } catch (e) {
    action = createTeamFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getTeams, getTeamsSaga);
  yield takeLatest(createTeam, createTeamSaga);
}
