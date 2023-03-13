import { takeLatest, call, put } from "redux-saga/effects";
import { getGames, getGamesSuccess, getGamesFailed } from "./reducers";

import request from "../../../utils/apisauce";

function* getGamesSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/user/games?query=" + payload.query
    );
    action = getGamesSuccess(response);
  } catch (e) {
    action = getGamesFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getGames, getGamesSaga);
}
