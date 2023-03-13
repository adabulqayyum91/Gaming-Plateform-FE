import { takeLatest, call, put } from "redux-saga/effects";
import {
  getFlTeamProfile,
  getFlTeamProfileSuccess,
  getFlTeamProfileFailed,
  trademoveFlTeam,
  trademoveFlTeamSuccess,
  trademoveFlTeamFailed,
  dropPlayerFlTeam,
  dropPlayerFlTeamSuccess,
  dropPlayerFlTeamFailed,
  getPlayerForTradePerposal,
  getPlayerForTradePerposalSuccess,
  getPlayerForTradePerposalFailed,
  sendTradePerposal,
  sendTradePerposalSuccess,
  sendTradePerposalFailed,
  getTradeMoveRequests,
  getTradeMoveRequestsSuccess,
  getTradeMoveRequestsFailed,
  getTradeMoveRequestsDetail,
  getTradeMoveRequestsDetailSuccess,
  getTradeMoveRequestsDetailFailed,
  getTradeMoveRequestUpdate,
  getTradeMoveRequestUpdateSuccess,
  getTradeMoveRequestUpdateFailed,
} from "./reducers";

import request from "../../../../utils/apisauce";

function* getFlTeamProfileSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/user/tradeMoveTeamById?flTeamId=" + payload.id
    );
    action = getFlTeamProfileSuccess(response);
  } catch (e) {
    action = getFlTeamProfileFailed(e);
  }
  yield put(action);
}
function* trademoveFlTeamSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PATCH",
      "/api/user/tradeMoveTeamById",
      payload
    );
    action = trademoveFlTeamSuccess(response);
  } catch (e) {
    action = trademoveFlTeamFailed(e);
  }
  yield put(action);
}
function* dropPlayerFlTeamSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PUT",
      "/api/user/tradeMoveTeamById",
      payload
    );
    action = dropPlayerFlTeamSuccess(response);
  } catch (e) {
    action = dropPlayerFlTeamFailed(e);
  }
  yield put(action);
}
function* getPlayerForTradePerposalSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      `/api/user/tradeMove?takePlayerId=${payload.playerId}&fantasyLeagueId=${payload.flId}&takePlayerFlTeamId=${payload.flTeamId}`
    );
    action = getPlayerForTradePerposalSuccess(response);
  } catch (e) {
    action = getPlayerForTradePerposalFailed(e);
  }
  yield put(action);
}
function* sendTradePerposalSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      `/api/user/tradeMove`,
      payload
    );
    action = sendTradePerposalSuccess(response);
  } catch (e) {
    action = sendTradePerposalFailed(e);
  }
  yield put(action);
}
function* getTradeMoveRequestsSaga() {
  let action;
  try {
    const response = yield call(request, "GET", "/api/user/tradeMoveRequest");
    action = getTradeMoveRequestsSuccess(response);
  } catch (e) {
    action = getTradeMoveRequestsFailed(e);
  }
  yield put(action);
}
function* getTradeMoveRequestsDetailSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "GET",
      "/api/user/tradeMoveRequestDetail?recordId=" + payload.id
    );
    action = getTradeMoveRequestsDetailSuccess(response);
  } catch (e) {
    action = getTradeMoveRequestsDetailFailed(e);
  }
  yield put(action);
}
function* getTradeMoveRequestUpdateSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PATCH",
      "/api/user/tradeMoveRequest",
      payload
    );
    action = getTradeMoveRequestUpdateSuccess(response);
  } catch (e) {
    action = getTradeMoveRequestUpdateFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getFlTeamProfile, getFlTeamProfileSaga);
  yield takeLatest(trademoveFlTeam, trademoveFlTeamSaga);
  yield takeLatest(dropPlayerFlTeam, dropPlayerFlTeamSaga);
  yield takeLatest(getPlayerForTradePerposal, getPlayerForTradePerposalSaga);
  yield takeLatest(sendTradePerposal, sendTradePerposalSaga);
  yield takeLatest(getTradeMoveRequests, getTradeMoveRequestsSaga);
  yield takeLatest(getTradeMoveRequestsDetail, getTradeMoveRequestsDetailSaga);
  yield takeLatest(getTradeMoveRequestUpdate, getTradeMoveRequestUpdateSaga);
}
