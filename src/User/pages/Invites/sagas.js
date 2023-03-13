import { takeLatest, call, put } from "redux-saga/effects";
import {
  getInvites,
  getInvitesSuccess,
  getInvitesFailed,
  handleFriendReq,
  handleFriendReqSuccess,
  handleFriendReqFailed,
  handleTeamInviteReq,
  handleTeamInviteReqSuccess,
  handleTeamInviteReqFailed,
  handleFranchiseTeamInviteReq,
  handleFranchiseTeamInviteReqSuccess,
  handleFranchiseTeamInviteReqFailed,
  handleMatchInviteReq,
  handleMatchInviteReqSuccess,
  handleMatchInviteReqFailed,
  handleFLInvite,
  handleFLInviteSuccess,
  handleFLInviteFailed,
} from "./reducers";

import request from "../../../utils/apisauce";

function* getInvitesSaga() {
  let action;
  try {
    const response = yield call(request, "GET", "/api/user/myRequest");
    action = getInvitesSuccess(response);
  } catch (e) {
    action = getInvitesFailed(e);
  }
  yield put(action);
}
function* handleFriendReqSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PATCH",
      "/api/user/friendRequest",
      payload
    );
    action = handleFriendReqSuccess(response);
  } catch (e) {
    action = handleFriendReqFailed(e);
  }
  yield put(action);
}
function* handleTeamInviteReqSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/team/teamInvitationResponse",
      payload
    );
    action = handleTeamInviteReqSuccess(response);
  } catch (e) {
    action = handleTeamInviteReqFailed(e);
  }
  yield put(action);
}
function* handleFranchiseTeamInviteReqSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "POST",
      "/api/team/franchiseTeamInvitationResponse",
      payload
    );
    action = handleFranchiseTeamInviteReqSuccess(response);
  } catch (e) {
    action = handleFranchiseTeamInviteReqFailed(e);
  }
  yield put(action);
}
function* handleMatchInviteReqSaga({ payload }) {
  let action;
  try {
    const response = yield call(request, "PATCH", "/api/user/match", payload);
    action = handleMatchInviteReqSuccess(response);
  } catch (e) {
    action = handleMatchInviteReqFailed(e);
  }
  yield put(action);
}
function* handleFLInviteSaga({ payload }) {
  let action;
  try {
    const response = yield call(
      request,
      "PATCH",
      "/api/user/flInvitation",
      payload
    );
    action = handleFLInviteSuccess(response);
  } catch (e) {
    action = handleFLInviteFailed(e);
  }
  yield put(action);
}

export default function* saga() {
  yield takeLatest(getInvites, getInvitesSaga);
  yield takeLatest(handleFriendReq, handleFriendReqSaga);
  yield takeLatest(handleTeamInviteReq, handleTeamInviteReqSaga);
  yield takeLatest(
    handleFranchiseTeamInviteReq,
    handleFranchiseTeamInviteReqSaga
  );
  yield takeLatest(handleMatchInviteReq, handleMatchInviteReqSaga);
  yield takeLatest(handleFLInvite, handleFLInviteSaga);
}
