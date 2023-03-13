import { takeLatest, call, put } from "redux-saga/effects";
import {
  getFantasyLeagues,
  getFantasyLeaguesSuccess,
  getFantasyLeaguesFailed,
  createFantasyLeague,
  createFantasyLeagueSuccess,
  createFantasyLeagueFailed,
} from "./reducers";

import request from "../../../../utils/apisauce";

function* getFantasyLeaguesSaga({ payload }) {
  let action;
  let url = "/api/fantasyLeague/fantasyLeague";
  url += "?game=" + payload?.game;
  try {
    const response = yield call(request, "GET", url);
    action = getFantasyLeaguesSuccess(response);
  } catch (e) {
    action = getFantasyLeaguesFailed(e);
  }
  yield put(action);
}
function* createFantasyLeagueSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/fantasyLeague/fantasyLeague",
      payload
    );
    action = createFantasyLeagueSuccess(response);
  } catch (e) {
    action = createFantasyLeagueFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getFantasyLeagues, getFantasyLeaguesSaga);
  yield takeLatest(createFantasyLeague, createFantasyLeagueSaga);
}
